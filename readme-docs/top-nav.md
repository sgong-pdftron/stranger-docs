---
title: Top nav
---

## File

* YAML file (.yaml)
* Always name it `top-nav.yaml`.

## Location

* Store them anywhere under `/pages` folder.
* File location would be directly converted to url.
* The url and its child urls will contain the top nav, overriding top nav from its parent url.

### Example 1

```
/pages
      /top-nav.yaml         // used in '/' and its child urls
      /webviewer
            /top-nav.yaml   // used in '/webviewer' and its child urls (overrules top nav from '/')
```

## Structure

* Each node (`-`) contains `title` and `link` keys.
* They will be used to create a link `[title](link)` in the top nav.

### Example 2

```
- title: WebViewer
  link: /webviewer          // becomes [WebViewer](/webviewer)
- title: Guides
  link: /webviewer/guides   // becomes [Guides](/webviewer/guides)
```