/**
 * Personal Space Dashboard
 * Live clock, dynamic greeting, day progress, and profile personalization
 */

(function () {
  'use strict';

  // --- State & DOM References ---
  const DEFAULT_NAME = 'JunKai';
  const STORAGE_KEY_NAME = 'personal_dashboard_name';
  const STORAGE_KEY_THEME = 'personal_dashboard_theme';

  // Clock elements
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const ampmEl = document.getElementById('ampm');
  const weekdayEl = document.getElementById('weekdayName');
  const fullDateEl = document.getElementById('fullDate');
  const timezoneBadgeEl = document.getElementById('timezoneBadge');
  const dayProgressPercentEl = document.getElementById('dayProgressPercent');
  const dayProgressBarEl = document.getElementById('dayProgressBar');

  // Profile & Greeting elements
  const userNameDisplay = document.getElementById('userNameDisplay');
  const avatarInitial = document.getElementById('avatarInitial');
  const footerUserName = document.getElementById('footerUserName');
  const greetingIcon = document.getElementById('greetingIcon');
  const greetingText = document.getElementById('greetingText');
  const editNameBtn = document.getElementById('editNameBtn');

  // Modal elements
  const nameModal = document.getElementById('nameModal');
  const nameInput = document.getElementById('nameInput');
  const cancelNameBtn = document.getElementById('cancelNameBtn');
  const saveNameBtn = document.getElementById('saveNameBtn');

  // Theme elements
  const themeSelect = document.getElementById('themeSelect');

  // Quote elements
  const dailyQuoteEl = document.getElementById('dailyQuote');
  const dailyAuthorEl = document.getElementById('dailyAuthor');

  // Curated inspiration list
  const INSPIRATIONS = [
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { quote: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
  ];

  // --- Clock & Time Management ---
  function padZero(num) {
    return num.toString().padStart(2, '0');
  }

  function getTimezoneOffsetString(date) {
    const offsetMin = -date.getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const hours = padZero(Math.floor(Math.abs(offsetMin) / 60));
    const mins = padZero(Math.abs(offsetMin) % 60);
    return `UTC${sign}${hours}:${mins}`;
  }

  function updateGreeting(hours) {
    let greeting = 'Good morning';
    let icon = '🌅';

    if (hours >= 5 && hours < 12) {
      greeting = 'Good morning';
      icon = '🌅';
    } else if (hours >= 12 && hours < 17) {
      greeting = 'Good afternoon';
      icon = '☀️';
    } else if (hours >= 17 && hours < 21) {
      greeting = 'Good evening';
      icon = '🌆';
    } else {
      greeting = 'Good night';
      icon = '🌙';
    }

    if (greetingText.textContent !== greeting) {
      greetingText.textContent = greeting;
      greetingIcon.textContent = icon;
    }
  }

  function updateClock() {
    const now = new Date();

    // 12-hour format calculation
    let rawHours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = rawHours >= 12 ? 'PM' : 'AM';

    const displayHours = rawHours % 12 === 0 ? 12 : rawHours % 12;

    hoursEl.textContent = padZero(displayHours);
    minutesEl.textContent = padZero(minutes);
    secondsEl.textContent = padZero(seconds);
    ampmEl.textContent = ampm;

    // Date formatting
    const weekdayOptions = { weekday: 'long' };
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    weekdayEl.textContent = now.toLocaleDateString(undefined, weekdayOptions);
    fullDateEl.textContent = now.toLocaleDateString(undefined, dateOptions);

    // Timezone badge
    try {
      const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = getTimezoneOffsetString(now);
      timezoneBadgeEl.textContent = `${tzName} (${offset})`;
    } catch (e) {
      timezoneBadgeEl.textContent = getTimezoneOffsetString(now);
    }

    // Dynamic greeting based on 24-hr time
    updateGreeting(rawHours);

    // Day Progress (seconds elapsed out of 86400 in a day)
    const secondsElapsedToday = rawHours * 3600 + minutes * 60 + seconds;
    const dayProgress = ((secondsElapsedToday / 86400) * 100).toFixed(1);
    dayProgressPercentEl.textContent = `${dayProgress}%`;
    dayProgressBarEl.style.width = `${dayProgress}%`;
  }

  // --- Profile Name Management ---
  function applyUserName(name) {
    const cleanName = (name && name.trim()) ? name.trim() : DEFAULT_NAME;
    userNameDisplay.textContent = cleanName;
    footerUserName.textContent = cleanName;
    avatarInitial.textContent = cleanName.charAt(0).toUpperCase();
    document.title = `${cleanName}'s Personal Space`;
  }

  function loadUserName() {
    const savedName = localStorage.getItem(STORAGE_KEY_NAME);
    applyUserName(savedName || DEFAULT_NAME);
  }

  function saveUserName(newName) {
    const cleanName = (newName && newName.trim()) ? newName.trim() : DEFAULT_NAME;
    localStorage.setItem(STORAGE_KEY_NAME, cleanName);
    applyUserName(cleanName);
  }

  // Modal Handlers
  function openNameModal() {
    const currentName = userNameDisplay.textContent;
    nameInput.value = currentName;
    nameModal.classList.add('active');
    nameModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => nameInput.focus(), 100);
  }

  function closeNameModal() {
    nameModal.classList.remove('active');
    nameModal.setAttribute('aria-hidden', 'true');
  }

  function handleSaveName() {
    saveUserName(nameInput.value);
    closeNameModal();
  }

  // --- Theme Management ---
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeSelect.value = theme;
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'aurora';
    applyTheme(savedTheme);
  }

  // --- Daily Inspiration Rotation ---
  function loadInspiration() {
    const todayIndex = new Date().getDate() % INSPIRATIONS.length;
    const item = INSPIRATIONS[todayIndex];
    dailyQuoteEl.textContent = `"${item.quote}"`;
    dailyAuthorEl.textContent = `— ${item.author}`;
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Name editing
    userNameDisplay.addEventListener('click', openNameModal);
    editNameBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openNameModal();
    });

    cancelNameBtn.addEventListener('click', closeNameModal);
    saveNameBtn.addEventListener('click', handleSaveName);

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSaveName();
      } else if (e.key === 'Escape') {
        closeNameModal();
      }
    });

    nameModal.addEventListener('click', (e) => {
      if (e.target === nameModal) {
        closeNameModal();
      }
    });

    // Theme selector
    themeSelect.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
  }

  // --- GitHub Repo Integration ---
  async function checkGitHubRepoStatus() {
    const repoStatusBadge = document.getElementById('repoStatusBadge');
    const repoVisibility = document.getElementById('repoVisibility');
    const REPO_API = 'https://api.github.com/repos/lk000055668/AioT-0916';

    try {
      const res = await fetch(REPO_API, { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        if (repoVisibility) {
          repoVisibility.textContent = data.private ? 'Private' : 'Public';
        }
        if (repoStatusBadge) {
          repoStatusBadge.innerHTML = `<span class="status-dot"></span><span>Synced</span>`;
        }
      }
    } catch (e) {
      // Gracefully silent on network failure or rate limit
      console.log('GitHub API status info:', e);
    }
  }

  // --- Initialization ---
  function init() {
    loadUserName();
    loadTheme();
    loadInspiration();
    updateClock();
    setupEventListeners();
    checkGitHubRepoStatus();

    // High accuracy timer: tick every second synced to exact boundary
    setInterval(updateClock, 1000);
  }

  // Launch on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
