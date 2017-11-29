---
title: Page Navigation
---

## Navigating pages through UI
  
![Page navigation UI](./img/page-navigation-ui.png)
  
- The page navigation UI is found on top tool bar
- Left/right buttons navigate to previous/next pages respectively
- You can also specify the page number you want to navigate by clicking and typing in the text field

## Navigating pages programatically

### Outside the iframe

```js
var currentPage = myWebViewer.getCurrentPageNumber();
myWebViewer.setCurrentPageNumber(currentPage + 1);
```

### Inside the iframe (config.js)

```js
var currentPage = readerControl.getCurrentPageNumber();
readerControl.setCurrentPageNumber(currentPage + 1);
```

## Related events

### Outside the iframe

```js
viewerElement.on('pageChanged', function(event, pageNumber) {
  ...
});
```

### Inside the iframe (config.js)

```js
$(document).on('pageChanged', function(event, pageNumber) {
  ...
});

// or

readerControl.docViewer.on('pageNumberUpdated', function(event, pageNumber) {
  ...
});
```