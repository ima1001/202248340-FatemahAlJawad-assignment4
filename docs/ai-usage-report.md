# AI Usage Report

**Course:** Web Development
**Assignment:** Assignment 3 — Advanced Functionality
**Student:** Fatemah Al Jawad

---

## Overview

This report documents how AI tools were used during the development of Assignment 3, which extends the portfolio website from Assignment 2 with API integration, advanced JavaScript features, state management, and performance improvements.

Two AI tools were used: **Claude (claude.ai)** and **GitHub Copilot**. All output was reviewed, understood, and adapted before being included in the project.

---

## Tools Used

| Tool | Provider | Primary Use |
|---|---|---|
| Claude (claude.ai) | Anthropic | Architecture decisions, debugging, code generation, explanations |
| GitHub Copilot | GitHub / Microsoft | In-editor code completion, repetitive code patterns |

---

## Claude (claude.ai)

### How it was used

Claude was used conversationally throughout the project. I shared my actual code files, described problems I encountered, and iterated based on Claude's suggestions. I did not copy output directly — I adapted suggestions to fit my design and asked follow-up questions to understand the reasoning.

---

### 1. Weather API Integration

**What I asked:** How to integrate the OpenWeatherMap API into my existing portfolio without breaking the layout.

**What Claude suggested:** Using the `/data/2.5/weather` endpoint with a `fetch()` call inside an `async` function, mapping weather condition IDs to emojis, and handling loading/error/success states with CSS class toggling.

**What ended up in my code:**
```javascript
async function loadWeather() {
    const apiKey = CONFIG.WEATHER_API_KEY;
    const city   = 'Dhahran';
    const url    = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        document.getElementById('weather-emoji').textContent = getWeatherEmoji(data.weather[0].id);
        document.getElementById('weather-temp').textContent  = `${Math.round(data.main.temp)}°C`;
        // ...

        loading.classList.add('hidden');
        error.classList.add('hidden');
        content.classList.remove('hidden');

    } catch (err) {
        loading.classList.add('hidden');
        error.classList.remove('hidden');
    }
}
```

**What I learned:** How `async/await` works with `fetch()`, how to handle HTTP error codes with `res.ok`, and how to structure loading/error/success UI states cleanly.

---

### 2. API Key Handling

**What I asked:** How to avoid hardcoding my API key in the source code before committing to a public GitHub repo.

**What Claude explained:** Frontend-only projects cannot truly hide API keys since everything runs in the browser. Claude walked me through the realistic options: restricting the key by domain in the OpenWeatherMap dashboard, separating it into a `config.js` file excluded via `.gitignore`, and including a `config.example.js` as a template for anyone cloning the repo.

**What ended up in my project:**
```
js/
├── config.js          ← in .gitignore, contains real key
└── config.example.js  ← committed, contains placeholder
```

```
// .gitignore
js/config.js
```

**What I learned:** Why `.env` files don't work in browser-only projects (no build step), and the standard professional approach to this limitation at the frontend level.

---

### 3. Graduation Countdown Timer

**What I asked:** How to build a live countdown timer that updates every second.

**What Claude suggested:** Using `setInterval` with a 1000ms interval, calculating the difference between the target date and `new Date()`, and using `Math.floor` with modulo arithmetic to extract days, hours, minutes, and seconds.

**What ended up in my code:**
```javascript
const graduationDate = new Date('2027-05-15T00:00:00');

function updateCountdown() {
    const diff = graduationDate - new Date();
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
```

**What I learned:** How JavaScript `Date` arithmetic works, how `setInterval` creates recurring execution, and how `padStart` formats numbers with leading zeros.

---

### 4. Dark / Light Mode with localStorage

**What I asked:** How to implement a theme toggle that remembers the user's preference across page reloads.

**What Claude suggested:** Toggling a `light-mode` class on `document.body`, storing the preference with `localStorage.setItem`, and restoring it on load with `localStorage.getItem`.

**What ended up in my code:**
```javascript
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
```

**What I learned:** How `localStorage` persists data between browser sessions, and how to design a full theme system using a single body class with CSS overrides.

---

### 5. Debugging — Null classList Error

**What I asked:** Why I was getting `Cannot read properties of null (reading 'classList')` in loadWeather.

**What Claude identified:** The weather `<footer>` HTML was accidentally placed after the closing `</body>` tag due to messy nesting in the contact section. When `loadWeather()` ran, the DOM elements didn't exist yet — not because of a JS timing issue, but because the HTML itself was outside `<body>` and therefore never parsed into the DOM.

**What I fixed:** Cleaned up the broken closing tag structure in the contact section and moved the footer to the correct position inside `<body>`.

**What I learned:** How browser HTML parsing works — elements outside `<body>` are either ignored or moved unpredictably. Valid HTML structure is a prerequisite for reliable JavaScript.

---

### 6. CSS Layout Fixes

**What I asked:** Help fixing several visual bugs that appeared after adding new features.

**Issues Claude identified and helped fix:**

| Bug | Cause | Fix |
|---|---|---|
| Skills cards overflowing horizontally | `width: 25rem` inline style fighting CSS grid | Removed inline width, used CSS class instead |
| Hero content invisible | `.name` had `height: 100vh` with no padding, clipping content | Added `min-height`, `height: auto`, and padding |
| Theme toggle showing as dark blob | Base `button {}` rule not excluding `#theme-toggle` | Added `:not(#theme-toggle)` to the selector |
| Weather widget showing error alongside data | Error div not being explicitly hidden on success | Added `error.classList.add('hidden')` in the try block |
| About section visually merging with hero | No visual separator between sections | Added `border-top` to `#about` |

---

### 7. Light Mode Color Design

**What I asked:** Help designing a cohesive light mode color scheme — I rejected the first version (too white/flat) and asked for a cool blue-gray direction.

**What Claude generated:** A layered blue-gray palette using `#e8edf5`, `#d4dae6`, and `#dde3ed` as background layers, with `#1a2233` as the primary text color, producing a muted, cloudy-day feel that complements the dark mode aesthetic.

**What I modified:** Iterated on several specific components (skill cards, weather widget, section eyebrows) after seeing the result in the browser, providing feedback until each element looked right.

**What I learned:** How to design a complete theme system where every component needs an explicit override, and how layering slightly different background tones creates visual depth in a flat design.

---

## GitHub Copilot

### How it was used

GitHub Copilot was used inside VS Code for inline completions. It did not explain concepts — it suggested code as I typed, which I accepted, rejected, or modified.

### 1. Repetitive HTML Structures
After writing the first countdown unit (`<div class="countdown-unit">`), Copilot suggested the remaining three with correct IDs. I verified each one before accepting.

### 2. CSS Property Completion
When writing light mode overrides, Copilot suggested property values based on patterns already in the file — for example, suggesting `rgba(26,34,51,0.4)` for secondary text after seeing it used elsewhere.

---

## Benefits & Challenges

### Benefits
- Claude significantly reduced the time spent on boilerplate code for the API integration
- Having Claude explain *why* something fails (not just what to fix) helped me understand the underlying concepts rather than just applying patches
- The iterative back-and-forth with real code — rather than abstract examples — produced solutions that fit my project without requiring heavy adaptation

### Challenges
- The API key situation required multiple clarifications to understand why `.env` files don't apply to frontend-only projects
- Some Claude suggestions introduced bugs (e.g. the countdown code was initially suggested inside the wrong scope), requiring careful review before applying
- Light mode required several rounds of iteration — AI-generated color schemes need to be tested in a real browser, not just evaluated on paper

---

## Responsible Use & Modifications

All AI suggestions were:
1. **Read and understood** before being applied — not copy-pasted blindly
2. **Tested in the browser** to confirm they worked as described
3. **Modified where needed** to fit the actual project structure and design
4. **Caught and corrected** in several cases where the suggestion introduced a new bug

The code architecture, design decisions, content, and project direction are entirely my own. AI was used as a tool to accelerate implementation and explain concepts — not as a replacement for understanding.

---

## Learning Outcomes

- Understood how `async/await` and `fetch()` work in practice, including error handling
- Learned why API keys cannot be truly hidden in frontend-only projects and the professional workarounds
- Understood `localStorage` as a simple key-value store for persisting user preferences
- Strengthened debugging skills — particularly tracing null reference errors back to HTML structure problems
- Learned how to design a complete CSS theme system using a single class toggle on `<body>`

---

## Summary Table

| Feature | Claude | Copilot | Done Manually |
|---|---|---|---|
| Weather API integration | Architecture + code | — | Integration into existing layout |
| API key handling | Explained approach | — | Implementation and .gitignore setup |
| Graduation countdown | Pattern provided | — | Date choice, styling |
| Dark/light mode | Code generated | Property completion | Color palette iteration |
| Light mode colors | Generated, iterated | — | Final color decisions |
| Debugging (null error) | Root cause identified | — | HTML structure fix |
| CSS layout fixes | Identified + fixed | — | Testing and verification |
| Content (text, projects) | — | — | Entirely manual |s