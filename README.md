# Dreame Launcher

Dreame Launcher is a custom Electron Minecraft launcher for Windows. It is built to feel smooth, clean, and simple while still supporting instances, Microsoft login, offline accounts, Modrinth browsing, skins, recent servers, and packaged `.exe` builds.

## ✨ Features

- 🔐 Microsoft Minecraft Java login with device-code flow
- 👤 Offline accounts for singleplayer, LAN, and offline-mode servers
- 📦 Instance manager with version downloads and launch logs
- 🔎 Modrinth Explore page for modpacks, mods, resource packs, data packs, shaders, and servers
- 🧩 Modpack installation with searchable version selection
- 📁 Mod/resource pack/shader/data pack install into compatible instances
- 🌐 Recent server cards with one-click launch and auto-join
- 🎨 Skin selector with saved skins, upload support, and 3D preview
- 💜 Custom launcher logo and Windows installer icon
- ☕ Portable Java setup when needed
- 🪟 Windows `.exe` installer build with shortcut support
- 🔄 GitHub Releases updater

## ✅ Requirements

- Windows 10/11
- A Microsoft account that owns Minecraft Java Edition for premium online play

Offline accounts can launch Minecraft, but they cannot join premium/authenticated servers.

## 🚀 Install

1. Go to the **[Releases](https://github.com/dreame123/DreameLauncher/releases/tag/DLauncher)** page.
2. Download the latest **Dreame Launcher Builder** or installer file.
3. Run the downloaded file.
4. Follow the setup window.
5. Open Dreame Launcher from your desktop or Start Menu shortcut.

The builder handles the setup for you, so you do not need to run npm commands manually.

## 🔄 Auto Updates

Dreame Launcher checks GitHub Releases for newer launcher builds.

To make updates work:

1. Open `package.json`.
2. Set `dreame.githubRepo` to your GitHub repo:

```json
"dreame": {
  "githubRepo": "your-username/dreamelauncher"
}
```

3. Build the launcher.
4. Create a GitHub Release with a higher version tag, like `v0.1.1`.
5. Upload the new `Dreame Launcher Setup ...exe` file to that release.

When users open the launcher, it checks the latest release and lets them download/install the new version.

## 💜 Logo And Icon

The launcher uses:

```text
renderer\assets\logo.png
```

When building, that PNG is converted into:

```text
build\icon.ico
```

That icon is used for the packaged app, installer, and Windows shortcuts.

## 📂 Project Structure

```text
main.js                 Electron main process, auth, launch, installs
preload.js              Safe IPC bridge for the renderer
renderer\index.html     App layout
renderer\app.js         UI logic
renderer\styles.css     Launcher styling
renderer\assets\        Logo and UI assets
scripts\                Build/helper scripts
build-exe.cmd           Windows build helper
```

## 📝 Notes

- Microsoft accounts must own Minecraft Java Edition to launch as a premium account.
- Offline accounts are supported for local play and offline-mode servers only.
- Modrinth installs depend on compatible Minecraft versions and loaders.
- Launcher data is saved locally in AppData.

## 📜 License

Add your license here before publishing publicly.
