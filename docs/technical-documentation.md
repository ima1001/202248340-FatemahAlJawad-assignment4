# Technical Documentation

**Course:** Web Development
**Assignment:** Assignment 3 — Advanced Functionality
**Student:** Fatemah Al Jawad

---

## Project Overview

This is a static personal portfolio website built with HTML, CSS, and JavaScript. Assignment 3 extends the Assignment 2 foundation with external API integration, advanced JavaScript features, persistent state management, and performance optimizations. No build tools or frameworks are required — the project runs directly in the browser.

---

## File Structure

```
id-name-assignment3/
├── index.html                    # Main HTML file
├── css/
│   └── styles.css                # All custom styles including light mode
├── js/
│   ├── script.js                 # All JavaScript features
│   ├── config.js                 # API key (excluded from git)
│   └── config.example.js         # API key template (committed)
├── src/
│   └── assets/
│       └── images/               # Project screenshots, logos, icons
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── .gitignore
└── README.md
```

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure and content |
| CSS3 | — | Styling, layout, theming, animations |
| JavaScript (ES6+) | — | API calls, DOM manipulation, state management |
| Bootstrap | 5.3.3 | Navbar, grid utilities, base styles |
| Google Fonts | — | Inter font family |
| OpenWeatherMap API | 2.5 | Live weather data |

All external libraries are loaded via CDN — no local installation needed.

---

## New Features in Assignment 3

### 1. Weather API Integration

**Endpoint used:**
```
GET https://api.openweathermap.org/data/2.5/weather?q=Dhahran&appid={key}&units=metric
```

**Implementation:** The `loadWeather()` async function fetches current conditions for Dhahran, SA on page load. It manages three UI states — loading, success, and error — by toggling a `hidden` CSS class on the relevant elements.

**Weather condition mapping:** OpenWeatherMap returns a numeric condition ID. A `getWeatherEmoji()` function maps ID ranges to emojis:

```javascript
function getWeatherEmoji(id) {
    if (id >= 200 && id < 300) return '⛈';  // Thunderstorm
    if (id >= 300 && id < 400) return '🌦';  // Drizzle
    if (id >= 500 && id < 600) return '🌧';  // Rain
    if (id >= 600 && id < 700) return '❄️';  // Snow
    if (id >= 700 && id < 800) return '🌫';  // Atmosphere
    if (id === 800)             return '☀️';  // Clear
    if (id === 801)             return '🌤';  // Few clouds
    if (id <= 804)              return '☁️';  // Cloudy
    return '🌡';
}
```

**Error handling:** If the fetch fails or returns a non-OK status, the error div is shown and the content div is hidden. The loading state is always dismissed regardless of outcome.

**API key handling:** The key is stored in `js/config.js` which is excluded from version control via `.gitignore`. A `config.example.js` template is committed instead. See README for setup instructions.

---

### 2. Graduation Countdown Timer

A live countdown to graduation (May 15, 2027) displayed in the hero section. Updates every second using `setInterval`.

**Calculation logic:**
```javascript
const diff = graduationDate - new Date();  // milliseconds remaining

const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);
```

Each unit is extracted by dividing the relevant millisecond range and taking the remainder (modulo) to avoid double-counting. Numbers are zero-padded to two digits using `String.padStart(2, '0')`.

---

### 3. Dark / Light Mode Toggle

A theme toggle button in the navbar switches between dark (default) and a cool blue-gray light mode. The preference persists across sessions using `localStorage`.

**State management flow:**
1. On page load, check `localStorage.getItem('theme')`
2. If `'light'`, add `light-mode` class to `<body>` and set icon to 🌙
3. On toggle click, use `classList.toggle('light-mode')` and save new state

**CSS theming approach:** All light mode overrides are scoped under `body.light-mode`. This means the entire theme can be toggled with a single class on the body — no inline style manipulation needed.

**Color palette:**

| Role | Dark Mode | Light Mode |
|---|---|---|
| Primary background | `#0d1117` | `#e8edf5` |
| Secondary background | `rgb(34,40,49)` | `#d4dae6` |
| Card background | `#161b27` / `#2d3441` | `#dde3ed` |
| Primary text | `whitesmoke` | `#1a2233` |
| Secondary text | `rgba(255,255,255,0.45)` | `rgba(26,34,51,0.5)` |

---

## Page Sections

| Section | Class | Height Behavior |
|---|---|---|
| Hero `.name` | — | `min-height: 100vh`, `height: auto` |
| `#about` | `.panel.light` | `min-height: 60vh`, `height: auto` |
| `#education` | `.panel.dark` | `min-height: 100vh`, `height: auto` |
| `#projects` | `.panel.light` | `height: auto`, `min-height: 100vh` |
| `#skills` | `.panel.dark` | `height: auto`, `min-height: 100vh` |
| `#contact-panel` | `.panel.light` | `height: auto`, `min-height: 100vh` |
| `#weather-footer` | `<footer>` | natural height |

---

## Layout System

### Scroll Behavior

```css
body {
    scroll-snap-type: y proximity;
}
```

`proximity` (changed from `mandatory` in Assignment 2) allows more natural scrolling — the page only snaps if the user stops close to a section boundary, rather than forcibly locking every scroll event.

### Responsive Grid

Both the projects grid and skills grid use the same pattern:

```css
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
```

This is inherently responsive — 3 columns on wide screens, 2 on tablets, 1 on mobile, with no media queries needed for the grid itself.

---

## JavaScript Architecture

All JavaScript runs inside a single `DOMContentLoaded` listener:

```
DOMContentLoaded
├── Contact form validation
│   ├── Empty field check
│   ├── Email format check
│   └── Success state + reset
├── Project category filter
│   ├── Active button state
│   └── Show/hide cards by data-category
├── Dark/light mode toggle
│   ├── Restore from localStorage on load
│   └── Toggle + save on click
├── Graduation countdown
│   ├── Initial render
│   └── setInterval (1000ms)
└── Weather widget (async)
    ├── Fetch from OpenWeatherMap
    ├── Map condition ID to emoji
    ├── Render success state
    └── Render error state
```

---

## API Reference

### OpenWeatherMap — Current Weather

| Property | Value |
|---|---|
| Base URL | `https://api.openweathermap.org/data/2.5/weather` |
| Parameters | `q=Dhahran`, `appid={key}`, `units=metric` |
| Auth | API key via `appid` query parameter |
| Free tier limit | 60 calls/minute, 1,000,000 calls/month |

**Response fields used:**

```
data.weather[0].id          → condition ID for emoji mapping
data.weather[0].description → text description (e.g. "clear sky")
data.main.temp              → temperature in °C
data.main.humidity          → humidity percentage
data.wind.speed             → wind speed in m/s (converted to km/h × 3.6)
```

---

## Performance Notes

- Images are compressed and sized appropriately for their display dimensions
- No unused JavaScript libraries loaded
- CDN-loaded resources (Bootstrap, Google Fonts) are cached by the browser after first load
- `scroll-snap-type: y proximity` reduces forced repaints compared to `mandatory`
- Weather API is called once on load — not on every scroll or interaction

---

## Known Limitations

- The contact form does not send data — submission is simulated
- The API key in `config.js` is visible in browser DevTools network requests — this is unavoidable in a frontend-only project. The key is restricted by domain in the OpenWeatherMap dashboard
- The navbar hamburger menu button has a known styling issue on mobile in light mode (toggler icon visibility) — does not affect functionality

---

## Browser Compatibility

Tested and working on:
- Google Chrome (latest)
- Microsoft Edge (latest)
- Various screen sizes (desktop, tablet, mobile)

Notes:
- `backdrop-filter` (frosted glass navbar) not supported in older Firefox — navbar renders correctly but without the blur
- `localStorage` requires the page to be served over HTTP/HTTPS — does not work when opening `index.html` directly as a `file://` URL in some browsers. Use Live Server or deploy to GitHub Pages