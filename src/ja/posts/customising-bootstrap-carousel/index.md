---
title: Bootstrap カルーセルのカスタマイズ
date: 2021-01-10
tags:
  - bootstrap
  - javascript
  - jquery
---

最近 Bootstrap のカルーセルを使う機会があったのですが、意外と基本的なカスタマイズ機能がなく、自前で調整する必要がありました。そのときに使用したJSコードを紹介します。

この記事のコードの動作サンプルは[こちら](https://codepen.io/htmsk138/pen/XWjqLBZ)です。

## 各スライドの高さを揃える

カルーセル全体の高さは一番高さのあるスライドに合わせられるものの、それぞれのスライドを同じ高さにして表示することができないようでした。

```javascript
// カルーセルが複数あればそれぞれに対して実行
$('.carousel').each(function() {
  var maxHeight = 0;

  // スライドのリストを取得
  var items = $(this).find('.carousel-item');

  // 各スライドがコンテンツに合わせた高さになるようにする
  items.css('height', '');

  // スライドを順番に確認し、高さの最大値を控える
  items.each(function() {
    maxHeight = Math.max(maxHeight, $(this).height());
  });

  // 全てのスライド高さを最大値に指定
  items.css('height', maxHeight + 'px');
});
```

## 一番最初と最後のスライドを表示中は、矢印ボタンを隠す

カルーセルをループモードにしていないとき、端のスライドを表示中は片方の矢印ボタンを無効にすべきではないかと思うのですが、そういう仕様ではないようです。

```javascript
// カルーセルが複数あればそれぞれに対して実行
$('.carousel').each(function() {
  // ループモードオフの場合のみ実行
  if ($(this).data('wrap') === false) {
    var first = $(this).find('.carousel-item').first();
    var last = $(this).find('.carousel-item').last();
    var prev = $(this).find('.carousel-control-prev');
    var next = $(this).find('.carousel-control-next');

    // まず最初に、先頭のスライドが表示されていたら左矢印を非表示にする
    prev.toggle(!first.hasClass('active'));

    // スライド完了イベント（カルーセルがスライドされるたびに実行）
    $(this).on('slid.bs.carousel', function() {
      // 先頭のスライドが表示されていたら左矢印を非表示にする
      prev.toggle(!first.hasClass('active'));

      // 末尾のスライドが表示されていたら右矢印を非表示にする
      next.toggle(!last.hasClass('active'));
    });
  }
});
```
