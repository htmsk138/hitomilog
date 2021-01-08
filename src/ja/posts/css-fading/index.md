---
title: CSSとJavaScriptによるフェード効果
date: 2020-06-14
tags:
  - css
  - javascript
---

jQueryを使わずに、CSSと素のJavaScriptで要素をフェードインやフェードアウトさせる方法です。

## 基本のコード

```html
<div class="fade hidden">フェードインするコンテンツ</div>
<div class="fade">フェードアウトするコンテンツ</div>
```

```css
.fade {
  transition: opacity .5s;
  opacity: 1;
}

.hidden {
  opacity: 0;
}
```
`transition: opacity .5s;` は、 「`opacity` の値が変更されたときは0.5秒かけて徐々に変化せよ」という意味になります。

`hidden` クラスをJavaScriptで付けたり外したりすることで、 `opacity` （不透明度）が1から0、0から1に切り替わります。それを瞬間で変化するのではなく0.5秒かけて変化させることで、フェード効果を出します。

`opacity: 1;` は、デフォルトが1のため、省略することもできます。

```javascript
// フェードイン
var fadeInElements = document.querySelectorAll('.fade.hidden');
for (var i = 0; i < fadeInElements.length; i++) {
  fadeInElements[i].classList.remove('hidden');
}

// フェードアウト
var fadeOutElements = document.querySelectorAll('.fade:not(.hidden)');
for (var i = 0; i < fadeOutElements.length; i++) {
  fadeOutElements[i].classList.add('hidden');
}
```

`toggle()` メソッドを使うと、 `hidden` クラスが付いていれば外し、付いていなければ加える、という切り替えができます。

```javascript
var fadeingElements = document.querySelectorAll('.fade');
for (var i = 0; i < fadeingElements.length; i++) {
  fadeingElements[i].classList.toggle('hidden');
}
```

## 使用例

以上のようなJSコードを、ページロードやクリックなどのイベントで呼び出すようにします。

### ページロード後にフェードインさせる

```javascript
document.addEventListener('DOMContentLoaded', function() {
  var fadeInElements = document.querySelectorAll('.fade.hidden');
  for (var i = 0; i < fadeInElements.length; i++) {
    fadeInElements[i].classList.remove('hidden');
  }
});
```

### ボタンクリックでフェードイン・フェードアウトを切り替える

ボタンをクリックすると、すぐ後の要素がフェードイン・フェードアウトする例です。

```html
<button onclick="toggleFade(this)">フェード切り替え</button>
<div class="fade">フェードするコンテンツ</div>
```

```javascript
function toggleFade(toggle) {
  var target = toggle.nextElementSibling;
  target.classList.toggle('hidden');
}
```

## opacityだけではうまくいかないケース

画面右下に固定表示される「ページトップに戻る」ボタンやスマホ向けのドロップダウンメニューなど、位置が固定された要素をフェードイン・フェードアウトで切り替える場合は、 `opacity` のみでの制御だけではうまくいきません。

### 問題点

例えば、画面右下に固定されている「ページトップに戻る」ボタンを `opacity: 0;` で非表示にすると、ボタン自体は透明になるだけで、本来の大きさでそこに残ります。外見上は存在しないボタンを誤ってクリックしてしまう可能性があります。

### 解決策

ボタンが非表示のときは幅をゼロにすることでボタンの面積をなくし、クリックできないようにする必要があります。

下記の例ではフェード対象の要素（ここではボタン）が `fade` クラスを持っていると想定し、フェードに関わるコードのみを記載します。

```css
.fade {
  opacity: 1;
  transition: opacity .5s, width 0s;
  width: 100px;
}

.fade.hidden {
  opacity: 0;
  transition: opacity .5s, width 0s .5s;
  width: 0;
}
```

先ほどの例と違う点は、

- `width` の指定
- `width` を含んだ `transition` の指定
- `transition` の定義が `hidden` とそうでないときとで異なる

です。一つずつ解説します。

#### `width` の指定

`hidden` 時に `0` にします。また、 `hidden` でないときの値も絶対値で指定する必要があります。この例では `width: 100px;` の部分です。使える単位は `px` `vw` `vh` 等で、 `%` や `auto` は使えません。

`opacity: 1;` を省略できたのは、 `opacity` に関してはデフォルトである1が絶対値なので、指定しなくても問題がないためです。 `width` や `height` はデフォルトが `auto` のため、明確に指定する必要があります。

幅ではなく高さを使ってもいいのですが、 `height` は `transition` が効かないので、代わりに `max-height` を使うことになります。

#### `width` を含んだ `transition` の指定

`opacity .5s, width 0s;` は、「`opacity` は0.5秒かけて、 `width` は0秒かけて変化せよ」です。

`opacity .5s, width 0s .5s` は、「`opacity` は0.5秒かけて、 `width` は0.5秒待ってから0秒かけて変化せよ」です。

`width` が伸び縮みするアニメーションはここでは必要ないので、0秒を指定しています。であれば `transition` 指定は要らないのでは？と思いがちですが、「0.5秒待ってから」を指定するために含めています。

#### `transition` の定義が `hidden` とそうでないときとで異なる

`hidden` のときだけ `width` の変化が「0.5秒待ってから」なのは、 `opacity` によるフェードアウトが終わるのを待つためです。幅をゼロにした時点で要素は見えなくなるので、見えなくなった要素をフェードアウトしても意味がなくなってしまいます。

逆に、フェードインするときは先に幅を戻しておかないと、フェード効果が見えなくなります。そのため `hidden` なしのほうは遅延の指定をしていません。

## その他の方法との比較

[Velocity JS](http://velocityjs.org/)などのライブラリを使えばjQueryなしでも簡単にアニメーション効果を実装することができますが、[Google](https://developers.google.com/web/fundamentals/design-and-ux/animations/css-vs-javascript)や[Mozilla](https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance)によれば、パフォーマンス面ではシンプルなものであればCSSを使うことが推奨されているようです。

フェードはよく使われる効果なので、他にアニメーションの実装がなくても必要になることが多いです。すでにjQueryを使っているサイトでは[フェード系のメソッド](https://api.jquery.com/category/effects/fading/)を使い、それ以外ではCSSを使うようにしています。
