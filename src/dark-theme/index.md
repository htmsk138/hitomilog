---
title: How To Implement Dark Theme
date: 2020-08-23
tags:
  - post
  - css
  - javascript
---

This article introduces how to implement dark theme to a website.

## CSS definition

Define CSS as "darken the whole `<body>` element while `<html>` has `dark` class".

```css
@media not print {
  .dark body {
    background: #000;
    color: #fff;
  }
}
```

Feel free to customise the styling. This example defines background as black and text colour as white.

`@media not print` prevents the page to be printed in dark mode.

We are now ready to display the site in dark mode. Next we need the code to switch between dark and normal mode by toggling the `dark` class.

## Automatic way

Recent computers and smartphones often have the feature to apply dark mode to their OS's UI. Web pages can refer to that settings and change their display theme, too.

Add the following code right after `<head>`.

```html
<script>
  // Check if device is set to dark mode
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // Add 'dark' class to <html>
    document.documentElement.classList.add("dark");
  }
</script>
```

Normally, JavaScript codes go right before `</body>` closing tag, but in this case, by placing the code right after `<head>` minimises the risk of the page flashing non-dark mode before switching to dark mode.

[Sample](https://codepen.io/htmsk138/pen/MWyeGQv)

## Manual way

This method lets users choose the site theme.

Even users who prefer dark mode on their OS, they don't necessarily feel comfortable with dark mode on every website, and vice versa. For that, you could say it is more user-friendly way than the other, but users who always prefer dark mode might find it annoying.

In addition to toggling `dark` class, it also requires to remember user's choice across pages, so we use [localStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage) for this purpose.

### Switching by checkbox

This method enables dark theme only while the checkbox is on.

Implement a checkbox like below.

```html
<label for="darkmode">
  <input type="checkbox" id="darkmode" onchange="toggleTheme(this.checked)" /> Dark mode
</label>
```

Add the following JavaScript code. This time it doesn't have to be right after `<head>`. It needs to be executed after the page contents are loaded in order to control the checkbox state.

```javascript
/**
 * After page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get local settings (false if not exists)
  var isDark = localStorage.isDark === 'true';

  // Change checkbox state and site theme based on the existing settings
  document.getElementById('darkmode').checked = isDark;
  toggleTheme(isDark);
});

/**
 * Switch site theme.
 * @param  {Boolean} isDark true = dark mode, false = normal mode.
 */
function toggleTheme(isDark) {
  // Add or remove 'dark' class
  document.documentElement.classList.toggle('dark', isDark);

  // Save settings locally
  localStorage.isDark = isDark;
}
```

[Sample](https://codepen.io/htmsk138/pen/LYNZVPw)

### Switching by button

A button also can be used.

Implement the button.

```html
<button id="darkmode" onclick="toggleTheme()">Change theme</button>
```

Add the following code right after `<head>`.

```html
<script>
  // Check if dark mode setting exists
  if ('true' === localStorage.isDark) {
    // Add 'dark' class
    document.documentElement.classList.add("dark");
  }
</script>
```

Add following JavaScript code.

```javascript
/**
 * Switch site theme to the opposite of current.
 */
function toggleTheme() {
  // Add or remove 'dark' class
  document.documentElement.classList.toggle('dark');

  // Save settings locally
  localStorage.isDark = ('true' !== localStorage.isDark);
}
```

[Sample](https://codepen.io/htmsk138/pen/QWNEwXq)

## Mix automatic and manual methods

This method uses the device settings as default and enables user switching at the same time. It can inherit benefits from both automatic and manual ways.

Make the code inside `<script>` tag right after `<head>` or the page load event, as below.

```javascript
if ('true' === localStorage.isDark || // Check if dark mode setting exists
  (undefined === localStorage.isDark && window.matchMedia("(prefers-color-scheme: dark)").matches)) { // If no setting exists, follow device setting
  // Add 'dark' class
  document.documentElement.classList.add("dark");

  // Save settings locally
  localStorage.isDark = true;

  // This is required only when using checkbox
  document.getElementById('darkmode').checked = true;
}
```

The rest of the codes are same as introduced earlier in this article.

[Sample](https://codepen.io/htmsk138/pen/LYNZmOX)
