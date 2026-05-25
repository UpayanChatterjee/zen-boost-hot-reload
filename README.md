# 🚀 Zen Boost Hot Reload

A native **Zen Browser Mod** (for the [Sine Mod Engine](https://github.com/CosmoCreeper/Sine)) that enables **automatic, real-time hot-reloading** of your Boosts! 

Say goodbye to manually opening the Site Control Panel and repeatedly clicking "Import Boost" whenever you tweak your local boost file. Just edit your file, save it, and watch the target website live-update instantly!

---

## ✨ Features

- **⚡ Live Preview**: Instant hot-reloading of slider modifications, visual styles, colors, and custom CSS without page reloads.
- **📁 Multi-File Directory Watching**: Automatically monitors **all** `.json` (and extensionless) boost files placed inside the `~/.config/zen-boosts/` directory.
- **🧠 Zero-Conf Smart Matching**: 
  - **By Name**: Modifying any file inside `~/.config/zen-boosts/` instantly reloads and applies the update only to the specific website utilizing the matching `boostName` (e.g. `github_boost.json` containing `"boostName": "GitHub Dark"` will reload `github.com`).
  - **Active Tab Priority**: For the custom watch file path or default files, automatically force-updates the active boost on your currently open tab, making it incredibly convenient for quick style prototyping!
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

## 🔧 Configuration & Multi-File Management

By default, the mod automatically creates and watches the directory:
📂 `~/.config/zen-boosts/`

### 📁 Multi-File Management (Recommended)
You can store separate boost `.json` files for different websites inside `~/.config/zen-boosts/` (e.g., `github_boost.json`, `youtube_style.json`, `chatgpt.json`). 
- Simply name the file anything you want and ensure the `"boostName"` inside the file matches the name of the active boost applied in your browser for that website.
- The mod will automatically detect, read, and watch all files in this directory. 
- Editing and saving `github_boost.json` will only reload your GitHub styles, leaving YouTube unaffected!

### 🔧 Custom Watch Path (Single File Override)
If you prefer to watch a single specific file anywhere else on your system, you can set an override directly in the **Sine Mods Settings UI**:

1. Go to **Zen Browser Settings > Sine Mods**.
2. Find **Zen Boost Hot Reload** in your installed mods list and click on its settings.
3. In the **Custom Watch File Path** text input, enter the absolute path to your JSON boost file (e.g., `/home/tony/projects/styles/boost.json`).
4. **No browser restart required!** Any change to this path is applied dynamically on the very next 500ms check, instantly watching your new file path.
5. If you ever want to revert to the default directory paths, simply clear the input field and save.

---

## 🚀 How to Use

1. **Import/Apply Your Boost**:
   - Make sure you have applied a Boost named `"My Boost"` to a website (e.g., `github.com` or `chatgpt.com`).
2. **Launch Your Editor**:
   - Open your watched boost file (either the default `~/my_boost.json` or your custom watch path) in your preferred editor (VS Code, Vim, Cursor, etc.).
3. **Save and Watch**:
   - Tweak some values (like `brightness`, `contrast`, add selectors to `zapSelectors`, or write custom CSS under `customCSS`).
   - Save the file.
   - **Voila!** The browser instantly grabs the new settings, applies them to the active webpage, and displays a success toast!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to share it, adapt it, and submit pull requests!
