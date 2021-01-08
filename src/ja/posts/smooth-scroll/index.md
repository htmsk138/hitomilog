---
title: スムーススクロールの実装
date: 2020-06-21
updated: 2020-11-08
tags:
  - accessibility
  - css
  - javascript
  - jquery
---

## スムーススクロールとは

スムーススクロール（スムーズスクロール）は、ページ内リンクをクリックしたときに目的のセクションまで画面をスクロールさせる演出です。次のようなメリットがあります。

- 遷移後もURLが変更されない
- 違うページに移動したかのような錯覚を起こさない

## 懸念点

デメリットとしては、

- セクションのURLがわからなくなる
- 画面が激しく動くことで、酔う人がいる
- アクセシビリティ上問題が多い

があります。

### セクションのURLがわからなくなる

これは、メリットの1つとして挙げた「遷移後もURLが変更されない」と引き換えに発生する問題です。

本来、ページ内リンクをクリックすると、次のようなURLに移動することになります。

`https://website.com#section1`

`#section1` というハッシュが移動先のセクションを指しており、このURLに直接アクセスすると目的のセクションまでスクロールされた状態でブラウザに表示されます。コピペしてそのセクションのみを参照したいときなどに便利ですが、スムーススクロールの実装時に無効化してしまうと、利用できなくなります。

実装方法によっては、スクロール後も従来のハッシュ付きURLを残すこともできます。どちらを選ぶかはサイトの設計次第ではありますが、無効にするのはユーザーの選択肢を減らす形になるので、デメリットと考えています。

### 画面が激しく動くことで、酔う人がいる

パソコンやスマホのOSには、動きによる視覚効果を減らす設定項目があります。下記はMac OSの設定画面です。

これは、視差効果によって具合の悪くなってしまう体質だったり、単に苦手な人が存在するためです。そのような人たちにとっては、スムーススクロールはサイトの使い心地を下げることになります。

### アクセシビリティ上問題が多い

キーボードだけでサイトを操作してみると分かりますが、ページ内リンクをクリック後、移動した先を表示するだけではなく、内部フォーカスも移動させないと、そのセクション内をTabキーなどで移動することができません。これは、スクリーンリーダーにも影響します。フォーカスがクリックしたリンクのままになっていると、リンクの次の要素から読み上げが継続されるので、目的のセクションまで移動したことになりません。スムーススクロールを実装する際は、このフォーカス問題を考慮する必要があります。

1つ前に挙げた視差効果の問題も、アクセシビリティ問題といえます。

## 実装方法

### jQuery

jQueryでは、[こちら](https://css-tricks.com/snippets/jquery/smooth-scrolling/)で紹介されているコードを使わせてもらっています。少し長めのコードになりますが、上に挙げたフォーカス問題についてもクリアされています。

### jQuery以外の方法

jQueryを使わない場合、いくつか方法があります。

#### CSSを使用する

実は、シンプルなCSS定義で実装できます。

```css
html {
  scroll-behavior: smooth;
}

@media screen and (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

`@media screen and (prefers-reduced-motion: reduce)` によって、視差効果が無効化されている環境では適用されないようにしています。

残念なことに、[Safariなどのブラウザでサポートされていない](https://caniuse.com/#search=scroll-behavior)ため、出番がほとんどありません。[W3Schools](https://www.w3schools.com/howto/howto_css_smooth_scroll.asp)でも、「クロスブラウザを考慮するのであれば」と、結局JavaScriptでの実装例が紹介されています。

#### `scrollIntoView()` メソッドを使う

JavaScriptの[Element.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)メソッドを使う方法です。

CSSの `scroll-behavior` と同じくサポート外のブラウザがあるのですが、[ポリフィル](https://github.com/iamdustan/smoothscroll)と併用することで解決できます。

欠点として、スクロール速度の設定ができないため、ブラウザによってスクロール速度が異なってしまいます。基本的にどの環境でも同じように動作させたいことが多いので、やはりほとんど出番がありません。

#### ライブラリを使う

今のところの結論としては、[こちらのライブラリ](https://github.com/cferdinandi/smooth-scroll)を使うのが確実です。CSSの `scroll-behavior` が出たことを理由にメンテナンスは終了していますが、問題なく動作し、細かいオプション指定も可能です。

オプションの `updateURL` で、遷移後のハッシュ付きURLを有効にするかどうかを選べます。

## 固定ヘッダー対応

ヘッダーが固定表示されていると、アンカーリンクでジャンプした先の上部がヘッダーに隠れてしまうことがあるので、次のCSSで対策します。

```css
:target::before {
  content: '';
  display: block;
  height: 200px;
  margin-top: -200px;
}
```

`:target` はリンク先の要素を指すので、クラスがなくても自動的に適用されます。 `height` の値をヘッダーの高さに応じて変更してください。 `margin-top` は `height` の値をマイナスにしたものを指定します。

## 参考リンク

- [CSS Tricks: Smooth Scrolling and Accessibility](https://css-tricks.com/smooth-scrolling-accessibility/)
- [W3Schools: How TO - Smooth Scroll](https://www.w3schools.com/howto/howto_css_smooth_scroll.asp)
- [MDN: Element.scrollIntoView()](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
- [StackOverflow: Fixed page header overlaps in-page anchors](https://stackoverflow.com/a/28824157)
