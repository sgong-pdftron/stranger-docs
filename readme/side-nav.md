---
title: Side nav
---

## File

* YAML file (.yaml)
* Always name it `side-nav.yaml`.

## Location

* Store them anywhere under `/pages` folder.
* File location would be directly converted to url.
* The url and its child urls will contain the side nav, overriding side nav from its parent url.

### Example 1

```
/pages
      /side-nav.yaml         // used in '/' and its child urls
      /webviewer
            /side-nav.yaml   // used in '/webviewer' and its child urls (overrules side nav from '/')
```

## Structure

* Each node (`-`) contains either `header`, or `title` and `link` keys.
* They will be used to create either a link `[title](link)`, or a bold header `**header**` in the side nav.

### Example 2

```
- header: Getting started    // becomes **Getting started**
- title: Run sample
  link: /android/guides      // becomes [Run sample](/android/guides)
```