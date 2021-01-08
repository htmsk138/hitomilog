---
title: Archiving Modified Files From A Git Commit
date: 2021-01-10
tags:
  - git
---

This article shows how to extract and archive only files modified or added in a Git commit.

All the examples below are to extract files from the previous commit, but if you change the `HEAD^` part to two commit hashes separated by a space, then it will extract changes between those commits.

## Using Git

```
git archive --format=zip HEAD `git diff --name-only HEAD^` > archive.zip
```

## Using Zip

```
zip archive.zip $(git diff --name-only HEAD^)
```

## Using Tar

```
tar -czvf archive.tgz $(git diff --name-only HEAD^)
```
