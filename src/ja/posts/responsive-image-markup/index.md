---
title: 画像のレスポンシブ対応
date: 2020-05-24
tags:
  - css
  - html
  - responsive
---

ひと昔前まで、ウェブに画像を表示するにはこの一行で十分でした。

```html
<img src="image.jpg" alt="画像の説明が入ります">
```

それが、レスポンシブデザインや高解像度ディスプレイの普及に伴って、今や[ここまで複雑なことに](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/)なっているようです。

ここまで凝らなくても現実的には、パソコン版とスマホ版で画像を分けたり、Retinaなどの2倍の解像度ディスプレイ用の画像を用意するくらいで十分なことが多いのではないでしょうか。

## 現実的なマークアップ

私がよく使うのは、この書き方です。

```html
<picture>
  <source srcset="sp-image.jpg, sp-image@2x.jpg 2x" media="(max-width: 767px)">
  <img src="pc-image.jpg" srcset="pc-image@2x.jpg 2x" alt="画像の説明が入ります" class="image" />
</picture>
```

指定している画像はそれぞれ、

- `sp-image.jp` ... スマホ用画像（横幅767ピクセル以下の画面で使用）、普通の解像度用
- `sp-image@2x.jp` ... スマホ用画像、2倍の解像度用
- `pc-image.jp` ... パソコン用画像（横幅768ピクセル以上の画面で使用）、普通の解像度用
- `pc-image@2x.jpg` ... パソコン用画像、2倍の解像度用

の役割になっており、この記述で次のことが達成できます。

- スマホとパソコンで縦横比の違う画像を表示したい
- Retinaディスプレイでもぼやけないようにしたい
- 状況に応じて必要な画像1つだけをロードしたい
- 代替テキストは1箇所にまとめたい

`class` や `alt` などの属性は、 `<img>` タグの方に付けます。画像にリンクを張りたい場合は、 `<picture>` 要素全体を `<a>` タグで囲みます。

### 解像度対応を省略する場合

ぼやけてもそれほど気にならない画像など、解像度対応をしない場合は次のように書きます。

```html
<picture>
  <source srcset="sp-image.jpg" media="(max-width: 767px)">
  <img src="pc-image.jpg" alt="画像の説明が入ります" class="image" />
</picture>
```

### スマホとパソコンで同じ画像を使う場合

スマホとパソコンで画像を分ける必要がなければ、 `<img>` のみを使います。

```html
<img src="image.jpg" srcset="image@2x.jpg 2x" alt="画像の説明が入ります" class="image" />
```

## 参考リンク
- [MDN: レスポンシブ画像](https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [A Guide to the Responsive Images Syntax in HTML](https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html/)
