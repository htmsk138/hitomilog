---
title: Adding Font To Windows Command-line Tools
date: 2021-01-10
tags:
  - command-line
  - font
  - windows
---

On Windows, by default, the only font that can display Japanese language on command-line tools is MS Gothic, which is very hard to look. Here is how to add your favourite font for command-line tools.

## Steps

This procedure applies for Windows 10. It works for Command Prompt, WSL distro's terminal and PowerShell.

1. Install a monospace font you'd like to use on consoles
2. Open run box by Windows key + R, type `regedit`
3. Navigate to `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont`
4. On right side panel, right click -> New -> String Value
5. Type unique value like '000' or '932.1', etc.
6. Click OK and restart system
7. Open Command Prompt (or start WSL distro), right click on title bar and choose Properties
8. In the Font tab, the font you registered should appear in the fonts list

## Some fonts are not supported

The font name wouldn't appear if it's not supported by the console usage for some reason. I failed with Noto Sans Mono CJK JP but succeeded with [Ricty Diminished](https://github.com/edihbrandon/RictyDiminished). Make sure to use a monospace font.

## References

- [How to add Custom Fonts to Command Prompt in Windows 10](https://www.thewindowsclub.com/add-custom-fonts-to-command-prompt#:~:text=Open%20Command%20Prompt%20and%20right,section%20and%20click%20on%20OK.)
- [コマンドプロンプト の フォント を Ricty Diminished に 変更する](https://blog.beachside.dev/entry/2017/11/16/192801)
