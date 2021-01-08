---
title: ダークモードの実装
date: 2020-08-23
tags:
  - css
  - javascript
---

サイトをダークモードで表示できるようにする方法です。デバイスの設定に沿って自動的にモードを切り替える方法と、ユーザーが任意に切り替えできるようにする方法の2通りを紹介します。

## CSS定義

まず、サイトをダークモードで表示するためのCSSを定義します。 `<html>` に `dark` クラスを付与すると、 `<body>` 要素全体の色が反転するように定義しておきます。

```css
@media not print {
  .dark body {
    background: #000;
    color: #fff;
  }
}
```

具体的な定義は、自由にカスタマイズしてください。この例では単純に、背景を黒、文字色を白に指定しています。

また、 `@media not print` で囲むことで、印刷時にはダークモードが適用されないようにしています。

これで、サイトをダークモードで表示する準備ができました。次に、 `dark` クラスを付けたり外したりすることで、ダークモードと通常モードの切り替えをするための実装をしていきます。

## 自動で切り替える

最近のパソコンやスマホには、OSのUIそのものをダークモードに設定する機能が付いていることが多くなってきました。ウェブサイトでもその設定を参照し、それに沿って自動的に表示を切り替えることができます。

`<head>` 直後に、下記のJavaScriptコードを置きます。

```html
<script>
  // デバイスがダークモードに設定されているかどうか
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // <html>タグにdarkクラスを付与
    document.documentElement.classList.add("dark");
  }
</script>
```

基本的にJavaScriptは `</body>` 直前に置くことが多いですが、この場合は `<head>` 直後に置くことで、ページロードを開始後一番早いタイミングでダークモードを設定することができ、一瞬だけ通常モードでページが表示されてしまうリスクを最小限に抑えます。

[サンプル](https://codepen.io/htmsk138/pen/MWyeGQv)

## 手動で切り替える

デバイスの設定に関係なく、ユーザーが表示テーマを選択できるようにする方法です。

普段はダークモードを好んでいるユーザーでも、サイトによっては通常モードのほうが見やすいと感じることもあります。また、その逆もありえます。どんなニーズにも対応できるという意味ではユーザー寄りの実装といえる反面、常にダークモードを選択したいユーザーにとっては手間になるかもしれません。

`dark` クラスの切り替えに加えて、ページを遷移しても設定を維持する必要があるため、ブラウザの[localStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)を利用して設定を保存します。

### チェックボックスを使う方法

「ダークモード」のチェックをオンにしている間だけ、サイトをダークモードで表示する方法です。

HTMLで次のようなチェックボックスを設置します。

```html
<label for="darkmode">
  <input type="checkbox" id="darkmode" onchange="toggleTheme(this.checked)" /> ダークモード
</label>
```

下記のJavaScriptコードを追加します。今回は `<head>` 直後である必要はありません。チェックボックスを操作するため、ページコンテンツがロードされたあとに実行されるようにします。

```javascript
/**
 * ページロード完了後
 */
document.addEventListener('DOMContentLoaded', function() {
  // ローカル保存済みの設定の取得（未設定の場合もfalse）
  var isDark = localStorage.isDark === 'true';

  // 保存されていた設定に従い、チェックボックスの状態と、サイトのテーマを切り替える
  document.getElementById('darkmode').checked = isDark;
  toggleTheme(isDark);
});

/**
 * サイトテーマの切り替え
 * @param  {Boolean} isDark trueでダークモードへ、falseで通常モードへ切り替え
 */
function toggleTheme(isDark) {
  // <html>タグにdarkクラスを付与または削除
  document.documentElement.classList.toggle('dark', isDark);

  // ローカルに設定を保存
  localStorage.isDark = isDark;
}
```

[サンプル](https://codepen.io/htmsk138/pen/LYNZVPw)

### ボタンを使う方法

ボタンを押すたびに、ダークモードと通常モードを切り替える方法です。

HTMLでボタンを設置します。

```html
<button id="darkmode" onclick="toggleTheme()">テーマ切替</button>
```

`<head>` 直後に次のコードを追加します。

```html
<script>
  // ローカルにダークモード設定が保存されているか
  if ('true' === localStorage.isDark) {
    // <html>タグにdarkクラスを付与
    document.documentElement.classList.add("dark");
  }
</script>
```

次のJavaScriptコードを追加します。

```javascript
/**
 * サイトテーマの切り替え。現在と逆のテーマに切り替える。
 */
function toggleTheme() {
  // <html>タグにdarkクラスを付与または削除
  document.documentElement.classList.toggle('dark');

  // ローカルに設定を保存
  localStorage.isDark = ('true' !== localStorage.isDark);
}
```

[サンプル](https://codepen.io/htmsk138/pen/QWNEwXq)

## 自動と手動の方法を組み合わせる

初期値はデバイスの設定に従いつつ、ユーザーの操作でも切り替えができるようにします。自動と手動、双方のメリットが活かせる方法です。

`<head>` 直後の `<script>` タグ、またはページロード完了イベントに入れるコードを、次のようにします。

```javascript
if ('true' === localStorage.isDark || // ローカルにダークモード設定が保存されているか
  (undefined === localStorage.isDark && window.matchMedia("(prefers-color-scheme: dark)").matches)) { // ローカルに設定が保存されていなければ、デバイスの設定に従う
  // <html>タグにdarkクラスを付与
  document.documentElement.classList.add("dark");

  // ローカルに設定を保存
  localStorage.isDark = true;

  // 下記は、チェックボックス使用時のみ
  document.getElementById('darkmode').checked = true;
}
```

残りの実装は、先に紹介した手動切り替えの例と同じになります。

[サンプル](https://codepen.io/htmsk138/pen/LYNZmOX)
