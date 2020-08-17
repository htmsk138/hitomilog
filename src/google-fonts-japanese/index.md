---
title: Japanese Google Fonts
tags:
  - post
  - font
---

## Web and Japanese typefaces

When building a Japanese website, `font-family` property in CSS tends to be long like this:

```css
font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Arial, "メイリオ", Meiryo, sans-serif;
```

This is because there is no common typeface across operating systems. To be precise, Mac and Windows implemented a common font some years ago, but somehow they decided to call it by slightly different names internally. See the names 'Yu Gothic' and 'YuGothic' in the above example? And the font doesn't display beautifully on Windows browsers anyway.

## Problem with using web fonts

You might think, why not use a web font? Yes, you could do it, only if you can prepare a font file with decent file size. Japanese language has, like other east Asian languages, a huge number of characters. You don't want to load another few megabytes to shorten a CSS definition.

## Google Fonts changed the situation

Recently (in 2019?) Google Fonts started listing [Japanese fonts](https://fonts.google.com/?subset=japanese) and this is changing the situation. Now you can use [Noto Sans JP](https://fonts.google.com/specimen/Noto+Sans+JP) simply like this:

```css
font-family: 'Noto Sans JP', sans-serif;
```

What it differs from normal web font solution is, Google Fonts generates subsets of the specified font automatically by detecting the characters used on the page. Thanks to this feature, Japanese websites now can display the same typeface across platforms without loading significantly large data.

I have the impression Noto font is being accepted broadly in Japan due to its beautiful yet simple design. If you ever need to build a Japanese website and are not sure which font to use, consider using one of [these fonts](https://fonts.google.com/?subset=japanese). Nothing is as awkward as Japanese language being displayed in a non-Japanese font.
