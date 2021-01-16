---
title: Docker Compose を使った WordPress 環境の構築
date: 2021-01-17
tags:
  - docker
  - wordpress
---

わりと最近になってから [Docker](https://www.docker.com/) の存在を知り、ローカルの開発環境構築に欠かせない存在となりました。ここでは Docker インストール済みの環境に、実際に WordPress 環境を構築する方法について書いていきます。

Docker そのものについての詳しい解説は省略しています。[こちらのサイト](https://knowledge.sakura.ad.jp/13265/)などが分かりやすいと思います。

この記事で使用する設定ファイルは、[こちら](https://github.com/htmsk138/dockerwp-starter)で公開しています。テンプレートとしてご利用いただけます。

## 基本の手順

下記の手順で、新規の WordPress サイトを立ち上げることができます。

1. [Docker](https://www.docker.com/products/docker-desktop) をダウンロードし、インストールします
2. プロジェクト用のディレクトリを作成します。ここでは `dockerwp` という名前で想定します
3. `dockerwp` ディレクトリの直下に、下記の内容で `docker-compose.yml` というファイルを作成します
```
services:

  wordpress:
    image: wordpress
    container_name: dockerwp_wp
    ports:
      - 80:80
    environment:
      WORDPRESS_DB_HOST: dockerwp_db
      WORDPRESS_DB_USER: admin
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: dockerwp_dev
    volumes:
      - ./wp:/var/www/html
    depends_on:
      - db
    links:
      - db

  db:
    image: mysql:5.7
    container_name: dockerwp_db
    environment:
      MYSQL_DATABASE: dockerwp_dev
      MYSQL_USER: admin
      MYSQL_PASSWORD: wordpress
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - ./db:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: dockerwp_phpmyadmin
    depends_on:
      - db
    ports:
      - 992:80
    environment:
      PMA_HOST: dockerwp_db
      UPLOAD_LIMIT: 64M
```
4. Docker を起動します
5. `dockerwp` ディレクトリで、コマンド `docker-compose up -d` を実行します（ `-d` を省くと処理中のアウトプットが見れます）
6. しばらく待つと、 [http://localhost](http://localhost)から WordPress サイトの新規インストール画面が確認できます

サイトを停止するときは `docker-compose down` を実行します。

上記の手順を実施したあとに `dockerwp` の中を確認すると、 `wp` ディレクトリに WordPress の構成ファイルが、 `db` ディレクトリに MySQL の構成ファイルが入っているのが分かります。サイトに必要な情報がすべて `dockerwp` ディレクトリの中に揃っている状態なので、他の環境でも Docker がインストールされていれば、ディレクトリごと共有することで同じようにサイトを確認することができます。

## アレンジ

### データベース情報を変更する

必要に応じて、`docker-compose.yml` のデータベース情報を編集してください。

- `WORDPRESS_DB_USER` ... MySQL ユーザ名（ `MYSQL_USER` と同じ値）
- `WORDPRESS_DB_PASSWORD` ... MySQLパスワード（ `MYSQL_PASSWORD` と同じ値）
- `WORDPRESS_DB_NAME` ... データベース名（ `MYSQL_DATABASE` と同じ値）

`WORDPRESS_DB_HOST` には、 MySQL の `container_name` を指定します。

### アップロード容量上限を変更する

メディアファイルなどのアップロードサイズ上限は、通常であれば `.htaccess` や `php.ini` の編集で変更できるのですが、 Docker 環境ではうまくいかないようなので、次の手順で対応します。

1. `dockerwp` ディレクトリ内に下記の内容で `uploads.ini` を作成します。 `64M` の部分は任意の容量に変えてください
```
file_uploads = On
memory_limit = 64M
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 600
```
2. `docker-compose.yml` を編集し、 `wordpress:` の `volumes:` セクションに下記の行を追加します
```
- ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
```

phpMyAdmin画面からのアップロード上限は、 `docker-compose.yml` の末尾にある `UPLOAD_LIMIT` にて設定します。

### 既存のサイトを複製する

公開済みのサイトをローカルにコピーしたい場合などは、下記の方法で可能です。

1. `dockerwp` ディレクトリに WordPress 構成ファイル用のフォルダ（ `wp` とします）を作成し、その中に元のサイトのサーバーにアップされているファイルをコピーします
2. 元のサイトのデータベースをエクスポートし、 `dockerwp` ディレクトリに置きます（ `export.sql` とします）
3. `docker-compose.yml` を編集し、 `db:` の `volumes:` セクションに下記の行を追加します
```
- ./export.sql:/docker-entrypoint-initdb.d/export.sql
```
4. `docker-compose up -d` でサイトを立ち上げます

上記は、新規サイト用のファイルが `wp` に自動生成される代わりに手順1のファイルを使用し、初回の立ち上げのみ `export.sql` をデータベースにインポートする、という設定になります。

サイトURLをローカル用に変える手順は、[通常の手順](https://ja.wordpress.org/support/article/changing-the-site-url/)と変わりません。上記の手順2で、 `export.sql` を編集してあらかじめ `siteurl` と `home` の値をローカル用のURLに変えておくと楽かもしれません。

`wp/wp-config.php` に記載のデータベース情報は `docker-compose.yml` の内容で上書きされるので、元のサイトとは異なるログイン情報やデータベース名を `docker-compose.yml` で設定しておくことをおすすめします。

## 参考リンク

- [さくらのナレッジ　Docker入門](https://knowledge.sakura.ad.jp/13265/)
- [Docker ドキュメント日本語化プロジェクト](https://docs.docker.jp/)
- [サイトURLの変更（WordPress）](https://ja.wordpress.org/support/article/changing-the-site-url/)
