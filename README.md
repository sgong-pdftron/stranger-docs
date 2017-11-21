# stranger-docs
---
## Style guide

Unless over rulled below, please use the [*Google Documentation Style Guide*](https://developers.google.com/style/) as a basis for writing.

The following are the main points to follow from the Google Style Guide
* [Be conversational and friendly](https://developers.google.com/style/tone) without being frivolous.
* [Use second person](https://developers.google.com/style/person): "you" rather than "we."
* [Use active voice](https://developers.google.com/style/voice): make clear who's performing the action.
* [Use standard American spelling](https://developers.google.com/style/spelling) and punctuation.

For more see [Highlights](https://developers.google.com/style/highlights) of Google Documentation Style Guide

## PDFTron specific rules

### File and folder names
* lower case, alphanumeric, ASCII characters only.
* No spaces in filenames.
* Instead use a hyphen "-" as a word delimiter. e.g. `doc-lock.md`

### Links
* For links to API, make sure to use code ticks inside the square brackets, for best formatting. For example.
`['ToolManager.setTool'](http://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/ToolManager.html#setTool(com.pdftron.pdf.tools.ToolManager.Tool))`

### General
* H1 headers might appear in side panel, so use sparingly (as sub-topics).
* **Use Headers** where every you think a **URL anchor** would be useful. This allows us to point a customer directly to the right part of the documentation.
* In other words, use H1 sparingly, but use H2 and H3 a lot.
* In general, nesting a lot might not work well. E.g. H4-H6 are probably never needed.
* Outside of code snippets, **all** Classes and Methods **shall** contain a link to the corresponding API.
* Prefer images over lots of text.

-![stranger docs](https://github.com/sgong-pdftron/stranger-docs/blob/master/stranger-docs.png "Stranger Docs")
