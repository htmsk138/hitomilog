---
title: Git コミットの日時を変更する
date: 2021-01-10
tags:
  - git
---

注意：この記事は Git の履歴を変更する方法を含んでいます。各自の責任で慎重に行うようにしてください。

## Git のコミットデータには2種類の日時情報がある

下記は、最後のコミットの日時を日本時間で2020年10月31日午前9時に変更するコマンドです。

```
git commit --amend --no-edit --date="2020-10-31T00:00+09:00"
```

`git log` で確認すると確かに上記で変更した日時になっているのですが、この変更したコミットを GitHub にプッシュしたところ、 GitHub 上では修正前の日時が表示されており、ローカルで表示される日時と噛み合わない状態でした。

調べてみると、 Git のコミット情報には author date と commit date という、2種類の日時データが記録されているらしく、上記のコマンドでは author date のみが変更されたということのようでした。

下記のコマンドを実行して author date と commit date を一致させ、プッシュし直しました。

```
git filter-branch --env-filter 'export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"'
git push -f
```

## 正しいコマンド

片方の日時だけを変更したいケースもあまり無いと思うので、初めから下記のコマンドを使えば、両方の日時データが更新されるようです。

```
GIT_COMMITTER_DATE="2020-10-31T00:00+09:00" git commit --amend --no-edit --date "2020-10-31T00:00+09:00"
```

## 参考リンク

- [Commit timestamps in GitHub don’t match repo (GitHub Support Community)](https://github.community/t/commit-timestamps-in-github-dont-match-repo/127766)
- [Change the date of a git commit (Hacker Noon)](https://hackernoon.com/change-the-date-of-a-git-commit-eeed8d2c5b9b)
