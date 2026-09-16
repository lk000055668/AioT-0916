# Personal Space Dashboard (AIoT-0916)

A sleek, glassmorphic personal dashboard webpage featuring a real-time live clock, dynamic greeting, day progress tracker, and GitHub repository integration.

- 🌐 **Live Website (GitHub Pages)**: [https://lk000055668.github.io/AioT-0916/](https://lk000055668.github.io/AioT-0916/)
- 🔗 **GitHub Repository**: [https://github.com/lk000055668/AioT-0916](https://github.com/lk000055668/AioT-0916)

## Features

- 🕒 **Live Accurate Clock**: Real-time 12-hour digital clock with blinking colons, AM/PM, weekday, and date.
- 🌅 **Dynamic Greeting**: Time-aware greetings (morning, afternoon, evening, night).
- 📊 **Day Progress Indicator**: Visual progress bar tracking percentage of the day completed.
- 🎨 **Ambient Glassmorphism & Themes**: Includes Aurora Glow, Cyber Neon, and Midnight Slate modes.
- ✍️ **Editable Name**: Click to customize display name with persistence via `localStorage`.
- 🐙 **GitHub Repository Integration**: Linked directly to `lk000055668/AioT-0916` with live repo status.

## Project Structure

```
├── index.html       # Semantic HTML5 layout & GitHub integration card
├── style.css        # Responsive glassmorphism CSS & design system
├── app.js           # Real-time clock & dashboard interactivity
└── README.md        # Project documentation
```

## Running Locally

Simply open `index.html` in any modern web browser, or serve with any static web server:

```bash
# Optional: serve with python or vs code live server
python -m http.server 3000
```

## Syncing & Deploying to GitHub

1. **Push your code to GitHub**:
   ```bash
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to [Repository Settings](https://github.com/lk000055668/AioT-0916/settings/pages).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select Branch: `main` and Folder: `/(root)`.
   - Click **Save**. Your site will be published at [https://lk000055668.github.io/AioT-0916/](https://lk000055668.github.io/AioT-0916/).
