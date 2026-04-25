# 202248340-FatemahAlJawad-assignment4

A personal portfolio website built as part of a web development course. This assignment extends Assignment 2 with API integration, advanced JavaScript features, state management, and performance improvements.

---

## What's New in Assignment 3

- **Weather API** — live weather widget (Dhahran, SA) powered by OpenWeatherMap
- **Graduation Countdown** — live countdown timer to graduation (May 2027)
- **Dark / Light Mode Toggle** — theme preference saved across sessions via `localStorage`
- **Performance improvements** — optimized images, cleaned up unused CSS, Lighthouse tested

---

## Features

- Smooth scroll-snap navigation between sections
- Hero section with dot-grid background and live graduation countdown
- Education timeline with school logos
- Project gallery with category filter (Java, Database, Hardware, AI, Web)
- Skills section with color-coded badges
- Contact form with input validation and feedback messages
- Dark/light mode toggle with persistent preference
- Live weather widget in the footer (OpenWeatherMap API)
- GitHub and LinkedIn links

---

## How to Use the Site

### Navigating the page
The site uses **scroll-snap navigation** — scroll down normally and the page will snap to each section. You can also click any link in the top navbar to jump directly to a section.

On mobile, tap the **☰ menu icon** in the top right to open the navigation links.

### Switching themes
Click the **☀️ / 🌙 icon** in the top-right corner of the navbar to toggle between dark and light mode. Your preference is automatically saved and restored the next time you visit.

### Filtering projects
1. Go to the **Projects** section by scrolling or clicking "Projects" in the navbar
2. Click any filter button (All / Java / Database / Hardware / AI / Web Development) to show only projects in that category
3. Click **All** to show all projects again

### Using the contact form
1. Scroll to the **Contact** section or click "Contact" in the navbar
2. Fill in your **Username**, **Email**, and **Message** fields
3. Click **Submit**
4. If any field is empty or the email is invalid, an error message will appear in red below the form
5. On success, a green confirmation message will appear and the form will reset

> Note: The form simulates submission — no data is actually sent.

### Weather widget
The weather widget at the bottom of the page automatically fetches and displays current weather conditions for Dhahran, SA. It shows temperature, description, humidity, and wind speed. If the API is unavailable, a friendly error message is shown instead.

### Graduation countdown
The countdown in the hero section shows a live timer counting down to graduation in May 2027. It updates every second.

---

## Project Structure

```
id-name-assignment3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   └── config.js           ← not committed (see setup instructions)
├── src/
│   └── assets/
│       └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── .gitignore
└── README.md
```

---

## Setup Instructions

No installation or build tools required. This is a plain HTML/CSS/JS project.

### Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/ima1001/id-name-assignment3.git
   ```

2. Open the project folder:
   ```bash
   cd id-name-assignment3
   ```

3. Set up the API key:
   - Rename `js/config.example.js` to `js/config.js`
   - Sign up for a free API key at [openweathermap.org](https://openweathermap.org/api)
   - Replace `YOUR_API_KEY_HERE` in `config.js` with your key

4. Open `index.html` in your browser:
   - Double-click `index.html`, or
   - Use **Live Server** in VS Code for best results

> No npm, no build step, no dependencies to install. Everything loads via CDN.

### API Key Note

The OpenWeatherMap API key is stored in `js/config.js` which is excluded from version control via `.gitignore`. This is intentional — API keys should not be committed to public repositories. A `config.example.js` file is included as a template.

### Dependencies (loaded via CDN)

| Library | Purpose |
|---|---|
| Bootstrap 5.3.3 | Layout, navbar, utility classes |
| Google Fonts (Inter) | Typography |

---

## AI Use Summary

Two AI tools were used to assist with this project:

### Claude (claude.ai)
- Designing and implementing the weather API integration
- Building the graduation countdown timer
- Implementing dark/light mode with `localStorage` persistence
- Debugging JavaScript issues (null classList errors, nested event listeners)
- Advising on API key handling for frontend-only projects
- Reviewing and improving CSS layout issues (skills card overflow, hero section height)

### GitHub Copilot
- In-editor completions for repetitive HTML structures
- CSS property suggestions based on existing patterns in the file

All AI-generated code was reviewed, understood, and modified to fit the project. See [`docs/ai-usage-report.md`](docs/ai-usage-report.md) for the full detailed report.

---

## Live Deployment

> Deployed via GitHub Pages.

🔗 [Live Site](https://ima1001.github.io/202248340-FatemahAlJawad-assignment4/)

---

## Author

**Fatemah Al Jawad**
Computer Science Student — KFUPM
