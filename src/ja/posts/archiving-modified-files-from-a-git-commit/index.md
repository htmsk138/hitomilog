---
title: Git のコミットで変更されたファイルのみのアーカイブファイルを作成する
date: 2021-01-10
tags:
  - git
---

Git でコミットした内容から、そのコミットで更新・追加されたファイルのみをまとめてZIPなどのアーカイブにする方法です。

以下の例はすべて、1つ前に行なったコミットを対象にしたコマンドですが、 `HEAD^` の部分を2つのコミットIDに変更し、そのコミット間の差分から抽出することもできます。

## Git 経由

```
git archive --format=zip HEAD `git diff --name-only HEAD^` > archive.zip
```

## Zip 経由

```
zip archive.zip $(git diff --name-only HEAD^)
```

## Tar 経由

```
tar -czvf archive.tgz $(git diff --name-only HEAD^)
```
