(function() {
  const { gZenBoostsManager } = ChromeUtils.importESModule(
    "resource:///modules/zen/boosts/ZenBoostsManager.sys.mjs"
  );

  if (gZenBoostsManager.__hotReloadWatcherInitialized) {
    return;
  }
  gZenBoostsManager.__hotReloadWatcherInitialized = true;

  const PREF_NAME = "extensions.zen-boost-hot-reload.watch-file-path";
  let lastModifiedTimes = new Map(); // path -> mtime

  function getPathsToWatch() {
    let customPath = "";
    try {
      if (Services.prefs.prefHasUserValue(PREF_NAME)) {
        customPath = Services.prefs.getStringPref(PREF_NAME).trim();
      }
    } catch (e) {
      // Preference doesn't exist yet or is invalid
    }

    if (customPath) {
      return [customPath];
    }

    const homeDir = Services.dirsvc.get("Home", Ci.nsIFile).path || Services.env.get("HOME");
    return [
      PathUtils.join(homeDir, "My Boost"),
      PathUtils.join(homeDir, "my_boost.json")
    ];
  }

  async function checkFile(path) {
    try {
      if (!(await IOUtils.exists(path))) {
        return;
      }
      const info = await IOUtils.stat(path);
      const mtime = info.lastModified;
      const prevMtime = lastModifiedTimes.get(path);

      if (prevMtime === undefined) {
        // Initialize mtime on startup or when path changes
        lastModifiedTimes.set(path, mtime);
        return;
      }

      if (mtime > prevMtime) {
        lastModifiedTimes.set(path, mtime);
        console.log(`[Boost Hot-Reload] Detected change in ${path}. Reloading...`);
        await reloadBoostFromFile(path);
      }
    } catch (e) {
      console.error(`[Boost Hot-Reload] Error checking file ${path}:`, e);
    }
  }

  async function reloadBoostFromFile(path) {
    try {
      const content = await IOUtils.readUTF8(path);
      const newBoostData = JSON.parse(content);
      if (!newBoostData || !newBoostData.boostName) {
        console.warn("[Boost Hot-Reload] Invalid boost data structure.");
        return;
      }

      console.log(`[Boost Hot-Reload] Loaded boost: "${newBoostData.boostName}"`);

      let updatedCount = 0;
      let domainsToNotify = new Set();

      // 1. Update boosts matching the name
      for (const [domain, domainEntry] of gZenBoostsManager.registeredDomains) {
        const activeId = domainEntry.activeBoostId;
        if (activeId && domainEntry.boostEntries.has(activeId)) {
          const boostEntry = domainEntry.boostEntries.get(activeId);
          if (boostEntry.boostData.boostName === newBoostData.boostName) {
            boostEntry.boostData = {
              ...boostEntry.boostData,
              ...newBoostData,
              changeWasMade: true
            };

            const boost = { id: activeId, domain, boostEntry };
            gZenBoostsManager.updateBoost(boost);
            gZenBoostsManager.saveBoostToStore(boost);
            updatedCount++;
            domainsToNotify.add(domain);
            console.log(`[Boost Hot-Reload] Updated boost for domain: ${domain}`);
          }
        }
      }

      // 2. Force-update the current tab's active domain if applicable
      const mostRecentWin = Services.wm.getMostRecentWindow("navigator:browser");
      if (mostRecentWin && mostRecentWin.gBrowser) {
        const activeTab = mostRecentWin.gBrowser.selectedTab;
        if (activeTab && activeTab.linkedBrowser) {
          const uri = activeTab.linkedBrowser.currentURI;
          if (uri && (uri.scheme === "http" || uri.scheme === "https")) {
            const domain = uri.host;
            if (domain) {
              const domainEntry = gZenBoostsManager.registeredDomains.get(domain);
              if (domainEntry && domainEntry.activeBoostId) {
                const activeId = domainEntry.activeBoostId;
                const boostEntry = domainEntry.boostEntries.get(activeId);
                if (boostEntry && !domainsToNotify.has(domain)) {
                  boostEntry.boostData = {
                    ...boostEntry.boostData,
                    ...newBoostData,
                    changeWasMade: true
                  };
                  const boost = { id: activeId, domain, boostEntry };
                  gZenBoostsManager.updateBoost(boost);
                  gZenBoostsManager.saveBoostToStore(boost);
                  updatedCount++;
                  domainsToNotify.add(domain);
                  console.log(`[Boost Hot-Reload] Force-updated boost on active domain: ${domain}`);
                }
              }
            }
          }
        }
      }

      if (updatedCount > 0) {
        console.log(`[Boost Hot-Reload] Successfully hot reloaded ${updatedCount} domains!`);
        if (mostRecentWin && mostRecentWin.gZenUIManager && mostRecentWin.gZenUIManager.showToast) {
          try {
            mostRecentWin.gZenUIManager.showToast("zen-panel-ui-boosts-exported-message");
          } catch(err) {
            console.error(err);
          }
        }
      }
    } catch (e) {
      console.error("[Boost Hot-Reload] Failed to reload boost:", e);
    }
  }

  async function tick() {
    const currentPaths = getPathsToWatch();

    // Clean up cached mtimes for paths that are no longer being watched
    for (const cachedPath of lastModifiedTimes.keys()) {
      if (!currentPaths.includes(cachedPath)) {
        lastModifiedTimes.delete(cachedPath);
      }
    }

    for (const path of currentPaths) {
      await checkFile(path);
    }
  }

  // Poll every 500ms
  setInterval(tick, 500);
  console.log("[Boost Hot-Reload] Watcher successfully initialized with dynamic preference support.");
})();
