---
title: Changing Git Commit Date
date: 2021-01-10
tags:
  - git
---

Note: changing Git history could be dangerous. Please proceed on your own responsibility.

## Author date and commit date

Some StackOverflow threads told me to use this command to change last commit's date.

```
git commit --amend --no-edit --date="2020-10-31T00:00+09:00"
```

This tells Git to change last commit's date to 31st October, 2020 at 0:00 in Japan Standard Time (GTM+9:00), without editing commit message.

`git log` after this shows the modified date, but after pushing to remote, a GitHub repository in my case, I realised the date shown on GitHub and my local log don't match.

It turned out [there are two different date records](https://github.community/t/commit-timestamps-in-github-dont-match-repo/127766) for Git history: author date and commit date. Above command only modifies the author date but not commit date. So I had to run below command to make both dates match.

```
git filter-branch --env-filter 'export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"'
git push -f
```

## The right way

To avoid this confusion, what I had to run in the first place was this.

```
GIT_COMMITTER_DATE="2020-10-31T00:00+09:00" git commit --amend --no-edit --date "2020-10-31T00:00+09:00"
```

## References

- [Commit timestamps in GitHub don’t match repo (GitHub Support Community)](https://github.community/t/commit-timestamps-in-github-dont-match-repo/127766)
- [Change the date of a git commit (Hacker Noon)](https://hackernoon.com/change-the-date-of-a-git-commit-eeed8d2c5b9b)
