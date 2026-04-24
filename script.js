```javascript
let headerTime = 30;
let middleTime = 30;
let footerTime = 30;

let destinationUrl = '';
let safeLinkUrl = '';
let activeToken = '';

let headerInterval = null;
let middleInterval = null;
let footerInterval = null;

const elements = {
  heroSection: document.getElementById('hero'),

  headerTimerSection: document.getElementById('header-timer'),
  middleTimerSection: document.getElementById('middle-timer'),
  destinationSection: document.getElementById('destination-section'),

  headerTimerCount: document.getElementById('header-timer-count'),
  middleTimerCount: document.getElementById('middle-timer-count'),
  footerTimerCount: document.getElementById('footer-timer-count'),

  headerTimerText: document.getElementById('header-timer-text'),
  middleTimerText: document.getElementById('middle-timer-text'),
  footerTimerText: document.getElementById('footer-timer-text'),

  headerSpinner: document.getElementById('header-spinner'),
  middleSpinner: document.getElementById('middle-spinner'),
  footerSpinner: document.getElementById('footer-spinner'),

  robotButton: document.getElementById('robot-button'),
  verifyButton: document.getElementById('verify-button'),
  readyButton: document.getElementById('ready-button'),

  destinationLink: document.getElementById('destination-link'),

  safelinkOutput: document.getElementById('safelink-output'),
  safelinkText: document.getElementById('safelink-text'),
  copyButton: document.getElementById('copy-button'),
  shareToggle: document.getElementById('share-toggle'),

  errorMessage: document.getElementById('error-message'),
  toast: document.getElementById('toast'),
  socialShare: document.getElementById('social-share'),

  urlInput: document.getElementById('destination-url')
};

// ===== Helper =====
function hideAllSections() {
  elements.heroSection.style.display = 'none';
  elements.headerTimerSection.style.display = 'none';
  elements.middleTimerSection.style.display = 'none';
  elements.destinationSection.style.display = 'none';
}

// ===== Core =====
function generateToken() {
  return Math.random().toString(36).substr(2, 10) + Date.now().toString(36);
}

function validateUrl(url) {
  url = url.trim();
  const regex = /^(https?:\/\/)((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)/;
  return regex.test(url);
}

function showToast(message, type = 'success') {
  elements.toast.textContent = message;
  elements.toast.style.background = type === 'error' ? '#dc2626' : '#1e40af';
  elements.toast.classList.add('visible');
  setTimeout(() => elements.toast.classList.remove('visible'), 1800);
}

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.classList.add('visible');
  setTimeout(() => elements.errorMessage.classList.remove('visible'), 2000);
}

function encodeUrl(url) {
  return btoa(url);
}

function decodeUrl(url) {
  return atob(url);
}

function updateQueryParams(stage) {
  const params = new URLSearchParams({
    utm_token: activeToken,
    url: encodeUrl(destinationUrl),
    duration: headerTime,
    stage
  });

  safeLinkUrl = `/safelink/?${params.toString()}`;
  window.history.replaceState({}, '', safeLinkUrl);

  elements.safelinkText.value = `https://safe731.github.io${safeLinkUrl}`;
}

// ===== Generate =====
function generateSafeLink() {
  const url = elements.urlInput.value.trim();
  const timerDuration = parseInt(document.getElementById('timer-duration').value);

  if (!validateUrl(url)) {
    showError('Enter a valid URL');
    return;
  }

  destinationUrl = url;
  activeToken = generateToken();

  headerTime = timerDuration;
  middleTime = timerDuration;
  footerTime = timerDuration;

  updateQueryParams('header');

  elements.safelinkOutput.style.display = 'block';
  elements.copyButton.style.display = 'block';
  elements.shareToggle.style.display = 'block';

  hideAllSections();
  elements.headerTimerSection.style.display = 'block';

  showToast('SafeLink created');
}

// ===== Timers =====
function startHeaderTimer() {
  elements.robotButton.style.display = 'none';
  elements.headerSpinner.style.display = 'block';

  headerInterval = setInterval(() => {
    if (headerTime > 0) {
      headerTime--;
      elements.headerTimerCount.textContent = headerTime;
    } else {
      clearInterval(headerInterval);

      hideAllSections();
      elements.middleTimerSection.style.display = 'block';

      updateQueryParams('middle');
    }
  }, 1000);
}

function startMiddleTimer() {
  elements.verifyButton.style.display = 'none';
  elements.middleSpinner.style.display = 'block';

  middleInterval = setInterval(() => {
    if (middleTime > 0) {
      middleTime--;
      elements.middleTimerCount.textContent = middleTime;
    } else {
      clearInterval(middleInterval);

      hideAllSections();
      elements.destinationSection.style.display = 'block';

      updateQueryParams('footer');
    }
  }, 1000);
}

function startFooterTimer() {
  elements.readyButton.style.display = 'none';
  elements.footerSpinner.style.display = 'block';

  footerInterval = setInterval(() => {
    if (footerTime > 0) {
      footerTime--;
      elements.footerTimerCount.textContent = footerTime;
    } else {
      clearInterval(footerInterval);

      elements.destinationLink.href = destinationUrl;
      elements.destinationLink.classList.add('visible');

      showToast('Ready to visit');
    }
  }, 1000);
}

// ===== Events =====
elements.robotButton.addEventListener('click', startHeaderTimer);
elements.verifyButton.addEventListener('click', startMiddleTimer);
elements.readyButton.addEventListener('click', startFooterTimer);

// ===== Load =====
window.addEventListener('load', () => {
  hideAllSections();
  elements.heroSection.style.display = 'block';
});
```
