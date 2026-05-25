# 🚀 Zen Boost Hot Reload

A native **Zen Browser Mod** (for the [Sine Mod Engine](https://github.com/CosmoCreeper/Sine)) that enables **automatic, real-time hot-reloading** of your Boosts! 

Say goodbye to manually opening the Site Control Panel and repeatedly clicking "Import Boost" whenever you tweak your local boost file. Just edit your file, save it, and watch the target website live-update instantly!

---

## ✨ Features

- **⚡ Live Preview**: Instant hot-reloading of slider modifications, visual styles, colors, and custom CSS without page reloads.
- **📁 Dual File Support**: Automatically watches both `~/My Boost` and `~/my_boost.json` under your user home directory.
- **🧠 Zero-Conf Matching**: 
  1. **By Name**: Updates any active boost on any domain whose name matches the `boostName` in your JSON file (e.g. `"My Boost"`).
  2. **Active Tab Priority**: Automatically force-updates the active boost on your currently open tab's domain, making it incredibly convenient for quick prototyping!
- **🔔 Visual Confirmation**: Triggers the native Zen Browser toast notification to let you know the reload succeeded.
- **🍃 Light and Efficient**: Employs non-blocking, performance-oriented `IOUtils.stat` polling (every 500ms) with negligible CPU usage. It automatically coordinates globally so that only a single timer runs, even if you open dozens of browser windows.

---

## 🛠️ Installation

This mod is designed to be installed seamlessly using **Sine**, the leading mod and theme manager for Zen Browser.

### Easy 1-Click Install via Sine
1. Open your **Zen Browser Settings**.
2. Navigate to **Sine Mods** (or the corresponding mods manager tab).
3. Click on the **Settings/Menu icon** inside Sine and ensure that **"downloading JS from unofficial sources"** (or custom user scripts) is enabled.
4. Copy the URL of this repository:
   ```text
   https://github.com/UpayanChatterjee/zen-boost-hot-reload
   ```
5. Paste it into Sine's custom installation/URL bar and click **Install**.
6. **Restart Zen Browser** once to allow the startup caches to rebuild and register the mod.

---

## 🚀 How to Use

1. **Import/Apply Your Boost**:
   - Make sure you have applied a Boost named `"My Boost"` to a website (e.g., `github.com` or `chatgpt.com`).
2. **Launch Your Editor**:
   - Open `~/my_boost.json` or `~/My Boost` in your preferred editor (VS Code, Vim, Cursor, etc.).
3. **Save and Watch**:
   - Tweak some values (like `brightness`, `contrast`, add selectors to `zapSelectors`, or write custom CSS under `customCSS`).
   - Save the file.
   - **Voila!** The browser instantly grabs the new settings, applies them to the active webpage, and displays a success toast!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to share it, adapt it, and submit pull requests!
