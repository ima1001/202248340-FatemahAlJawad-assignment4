document.addEventListener("DOMContentLoaded", function () {

    // ── Contact Form Validation ──────────────────────────
    const form = document.querySelector(".simple-form");
    const messageDisplay = document.getElementById("form-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email    = document.getElementById("email").value.trim();
        const message  = document.getElementById("message").value.trim();

        if (username === "" || email === "" || message === "") {
            messageDisplay.textContent = "Please fill in all fields.";
            messageDisplay.classList.remove("hidden", "success");
            messageDisplay.classList.add("fail");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            messageDisplay.textContent = "Please enter a valid email address.";
            messageDisplay.classList.remove("hidden", "success");
            messageDisplay.classList.add("fail");
            return;
        }

        messageDisplay.textContent = '✓ Message sent successfully!';
        messageDisplay.classList.remove("hidden", "fail");
        messageDisplay.classList.add("success");
        form.reset();
    });

    // ── Projects Filter ──────────────────────────────────
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selected = this.dataset.filter;

            projectCards.forEach(card => {
                if (selected === 'all' || card.dataset.category === selected) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    
    // ── Dark Mode Toggle ─────────────────────────────────
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

    // ── Graduation Countdown ─────────────────────────────
    const graduationDate = new Date('2027-05-15T00:00:00');

    function updateCountdown() {
        const now  = new Date();
        const diff = graduationDate - now;

        if (diff <= 0) {
            document.getElementById('cd-days').textContent    = '0';
            document.getElementById('cd-hours').textContent   = '0';
            document.getElementById('cd-minutes').textContent = '0';
            document.getElementById('cd-seconds').textContent = '0';
            return;
        }

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

    // ── Weather Widget ───────────────────────────────────
    async function loadWeather() {
        const apiKey = '24494aeba29c2073411418c1a91844c2';
        const city   = 'Dhahran';
        const url    = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const loading = document.getElementById('weather-loading');
        const content = document.getElementById('weather-content');
        const error   = document.getElementById('weather-error');

        function getWeatherEmoji(id) {
            if (id >= 200 && id < 300) return '⛈';
            if (id >= 300 && id < 400) return '🌦';
            if (id >= 500 && id < 600) return '🌧';
            if (id >= 600 && id < 700) return '❄️';
            if (id >= 700 && id < 800) return '🌫';
            if (id === 800)             return '☀️';
            if (id === 801)             return '🌤';
            if (id <= 804)              return '☁️';
            return '🌡';
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('API error');
            const data = await res.json();

            document.getElementById('weather-emoji').textContent    = getWeatherEmoji(data.weather[0].id);
            document.getElementById('weather-temp').textContent     = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').textContent     = data.weather[0].description;
            document.getElementById('weather-humidity').textContent = `💧 ${data.main.humidity}%`;
            document.getElementById('weather-wind').textContent     = `💨 ${Math.round(data.wind.speed * 3.6)} km/h`;

            loading.classList.add('hidden');
            content.classList.remove('hidden');
            error.classList.add('hidden');
            
        } catch (err) {
            loading.classList.add('hidden');
            content.classList.add('hidden');
            error.classList.remove('hidden');
        }
    }

    loadWeather();
});
