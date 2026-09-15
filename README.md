# 🔄 Auto Refresh Plus

![Version](https://img.shields.io/badge/Version-1.2.0-7c3aed?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-brightgreen?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Public-blue?style=for-the-badge)

A lightweight, highly reliable Google Chrome extension to automatically refresh web pages at customized intervals. 

## 📖 The Backstory (Why I Built This in 2020)

Back in **2020-2021**, during the peak of my freelancing journey on **Fiverr**, one of the biggest challenges was maintaining the "Online" status. Buyers on Fiverr heavily prefer messaging sellers who are currently active. If a tab goes idle, the online status drops, potentially losing critical client leads.

Instead of constantly clicking the refresh button manually or relying on bloated third-party extensions that consumed too much RAM or tracked data, I decided to build my own lightweight solution. 

I wrote **Auto Refresh Plus** specifically to keep my Fiverr dashboard active in the background. It worked flawlessly, helping me secure continuous orders and grow my profile. 

For years, this repository sat as a **Private** tool on my GitHub. Now, as I transition more into complex Software Engineering and AI research, I have decided to make this nostalgic and highly useful tool **Open Source (Public)** for anyone who might need it!

## ✨ Features

- **Custom Intervals:** Set exact refresh times (in minutes) down to the millisecond.
- **Zero Bloat:** Pure vanilla JavaScript, using Chrome's native `chrome.alarms` API for extreme battery efficiency.
- **Background Service Worker:** Won't aggressively drain your laptop battery like other refreshers. It runs quietly in the background.
- **Privacy First:** Requires absolutely minimal permissions. No data tracking, no external server calls.

## 🚀 How to Install (Developer Mode)

1. Clone this repository: `git clone https://github.com/almuzahidseyam/auto-refresh-plus.git`
2. Open Google Chrome and go to `chrome://extensions/`
3. Enable **"Developer mode"** in the top right corner.
4. Click **"Load unpacked"** and select the cloned folder.
5. Pin the extension to your toolbar and start refreshing!

## 👨‍💻 Tech Stack
- **HTML/CSS:** Clean, minimal popup UI.
- **JavaScript:** Chrome Extension APIs (`chrome.tabs`, `chrome.alarms`, `chrome.storage`).
