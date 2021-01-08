---
title: Windowsのコマンドラインツールにフォントを追加する
date: 2021-01-10
tags:
  - command-line
  - font
  - windows
---

コマンドプロンプトなど、Windowsのコマンドラインツールで日本語を表示しようとすると、デフォルトではMSゴシックしか選べません。さすがに見づらいので、他のフォントを追加して使えるようにする方法を探しました。

## 手順

Windows10で確認した手順です。コマンドプロンプトの他、WSLのターミナルやPowerShellにも、同じ方法が使えます。

1. コマンドラインで使いたい等幅フォントを[インストール](https://support.microsoft.com/ja-jp/office/%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B-b7c5f17c-4426-4b53-967f-455339c564c1)する
2. Windowsキー＋Rで「ファイル名を指定して実行」を開き、 `regedit` と入力して実行
3. `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Console\TrueTypeFont` に移動
4. 右側のパネルの適当な場所でで右クリックをし -> New -> String Value
5. 「000」「932.1」など、既存の値と被らない値を設定
6. OKをクリックし、パソコンを再起動
7. コマンドプロンプトを起動し、タイトルバーで右クリック、「プロパティ」を選択
8. 「フォント」タブで目的のフォントを選択

## 使用できないフォントもある

上記手順の最後で、登録したフォントがリストに出てこない場合は、そのフォントが何らかの理由でコマンドラインツールで使えないということのようです。私が試した中でも、Noto Sans Mono CJK JPは使えず、[Ricty Diminished](https://github.com/edihbrandon/RictyDiminished)は大丈夫でした。使えるフォントは等幅フォントのみなので、その点は気をつけてください。

## 参考リンク

- [How to add Custom Fonts to Command Prompt in Windows 10](https://www.thewindowsclub.com/add-custom-fonts-to-command-prompt#:~:text=Open%20Command%20Prompt%20and%20right,section%20and%20click%20on%20OK.)
- [コマンドプロンプト の フォント を Ricty Diminished に 変更する](https://blog.beachside.dev/entry/2017/11/16/192801)
