---
title: WordPressで、特定の投稿タイプに使われているタームのリストを取得する
date: 2020-08-15
tags:
  - post
  - php
  - wordpress
---

WordPressの `get_terms()` 関数は、デフォルトでは指定されたタクソノミーに属するすべてのタームを返します。タクソノミーを1種類の投稿タイプでしか使っていないときはそれで十分なのですが、1つのタクソノミーを複数の投稿タイプで共用している場合に、特定の投稿タイプに使われているタームのみのリストを取得したいことがあります。

## 方法1： `object_ids` 引数を使う

```php
// 投稿タイプのすべての公開済み投稿のIDリストを取得
$post_ids = get_posts( array(
    'post_type' => 'some_post_type',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'fields' => 'ids'
) );

// 上記IDのオブジェクトに使われているタームのみを取得
$terms_for_type = get_terms( array(
    'taxonomy' => 'some_taxonomy',
    'object_ids' => $post_ids
) );
```

`some_post_type` と `some_taxonomy` の部分を、それぞれ投稿タイプとタクソノミーのスラッグに置き換えてください。

この方法では、指定した投稿タイプの記事数が極端に多い場合の負荷が気になるところです。そこで、もう1つの方法をご紹介します。


## 方法2： `get_terms()` 関数にフィルタを追加する

`get_terms()` に `post_type` 引数があるといいなと思っていたところ、フィルタを作成して使えるようにしてしまう方法を見つけました。

[こちらのサイト](https://dfactory.eu/wp-how-to-get-terms-post-type/)で紹介されているコードを、テーマの functions.php 等に追加します。「Edit:
A new, updated approach...」の後に記載されているほうのコードを使ってください。

上記コードの処理内容としては、ターム取得時のSQL文を書き換えて、指定された投稿タイプで絞り込みできるようにしたものです。 `post_type` は、 `string` での単数指定と `array` での複数指定の両方に対応しています。

これで、下記のように投稿タイプを指定することができるようになります。

```php
// 投稿タイプを1つ指定
$terms_for_type = get_terms( array(
    'taxonomy' => 'some_taxonomy',
    'post_type' => 'some_post_type'
) );

// 投稿タイプを複数指定
$terms_for_types = get_terms( array(
    'taxonomy' => 'some_taxonomy',
    'post_type' => array( 
      'some_post_type1',
      'some_post_type2'
    )
) );
```

注意点として、 `get_terms()` 呼び出し時に `fields` 引数をデフォルトの `all` 以外に設定してしまうと、正しいカウント数（返り値オブジェクトの `count` プロパティ）が得られないそうです。

SQLに介入するのはベストプラクティスとは言えないかもしれませんが、方法1で不都合があるときは参考にしてみてください。


## 参考リンク

- [関数リファレンス/get terms](https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/get_terms)
- [WP_Term_Query::__construct](https://developer.wordpress.org/reference/classes/wp_term_query/__construct/)
- [WordPress: How to get_terms for post type](https://dfactory.eu/wp-how-to-get-terms-post-type/)