---
title: CSS で蛍光ペンのような線を引く
date: 2021-01-10
tags:
  - css
---

テキストに蛍光ペンで線を引いたような装飾をします。

動作サンプルは[こちら](https://codepen.io/htmsk138/pen/oNzxOjo)です。以下、解説です。

## 基本

```html
<p>
  テキストを<span class="highlighted yellow">蛍光ペンで</span>マークします。<br>
  こちらは<span class="highlighted pink">ピンク色</span>の例です。
</p>
```

```css
.highlighted {
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.highlighted.yellow {
  background-image: linear-gradient(to top, yellow 60%, transparent 0);
}

.highlighted.pink {
  background-image: linear-gradient(to top, pink 60%, transparent 0);
}
```

`linear-gradient()` は本来、背景にグラデーション効果を出すための関数ですが、ここでは色の切り替わりを1点に集中させることで色を2分割させています。上記の定義は「下から上へ、起点から60%の位置で黄色（ピンク）から透明へ変化せよ」です。

`60%` としている箇所を変更すると、線の太さを調整できます。

`<p>` などのブロックレベル要素ではなく、 `<span>` などのインライン要素に使うようにすれば、複数行にわたるテキストにも線を引くことができます。

## アニメーション付き

アニメーション効果を付ける場合は、下記のCSSを追記します。

```css
.highlighted {
  transition: background-size .5s;
}

.highlighted.animating {
  background-size: 0 auto;
}
```

マークアップにも `animating` クラスを追加します。

```html
<p>
  <span class="highlighted yellow animating">アニメーション付きのマーカーです。</span>
</p>
```

JSなどで任意のタイミングで `animating` クラスを外せば、線が左から右へと伸びていきます。複数行のテキストにも使用できます。
