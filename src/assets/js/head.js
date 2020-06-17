/**
 * Redirect to Japanese page depending on browser language
 */
if (document.referrer.indexOf(window.location.hostname) < 0 &&
  '/' === window.location.pathname &&
  (navigator.language || navigator.userLanguage).indexOf('ja') > -1) {
    window.location.href = '/ja';
}

/**
 * Enable dark theme when preferred on system
 */
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
}
