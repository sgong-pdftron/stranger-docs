---
title: Pages
---

## File

* Markdown file (.md)
* Use lower case, alphanumeric, ASCII characters for file names.
* Use a hyphen "-" as a word delimiter. e.g. `doc-lock.md`.

## Location

* Store them anywhere under `/pages` folder.
* File location would be directly converted to url.

### Example 1

```
/pages
      /test.md          // creates '/test' page
      /webviewer
            /index.md   // creates '/webviewer' page
```

## Structure

* Must have a title written in the frontmatter (metadata) in the beginning of the document (the title will be rendered as `H1`).

### Example 2

```
---
title: Hello world      // frontmatter
---

And the content goes here ...
``` 