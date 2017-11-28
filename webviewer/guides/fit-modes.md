---
title: Fit Modes
---

## List of fit modes

Fit mode | Description
---|---
FitWidth | Zoom level is constrained such that current page's width fills the available space
FitPage | Zoom level is constrained such that current page's width or height will exactly fill the available space
Zoom | Zoom level is not constrained

## Changing fit mode through UI

![Fit modes UI](../../../static/webviewer-fit-modes-ui.png)

- The fit modes UI is found on top tool bar
- Each button refers to FitWidth and FitPage mode from left to right

## Changing fit mode programatically

### Outside the iframe

```js
var currentFitMode = myWebViewer.getFitMode();
myWebViewer.setFitMode(CoreControls.DocumentViewer.FitMode.FitWidth);
```

### Inside the iframe (config.js)

```js
var currentLayoutMode = readerControl.getFitMode();
readerControl.setFitMode(CoreControls.DocumentViewer.FitMode.FitWidth);
```

Enumeration for each fit mode is listed in [CoreControls.DocumentViewer.FitMode](https://www.pdftron.com/webviewer/demo/lib/html5/doc/CoreControls.DocumentViewer.html#.FitMode__anchor).

## Related events

### Outside the iframe

```js
viewerElement.on('fitModeChanged', function(event, fitMode) {
  ...
});
```

### Inside the iframe (config.js)

```js
$(document).on('fitModeChanged', function(event, fitMode) {
  ...
});

// or

readerControl.docViewer.on('fitModeUpdated', function(event, fitMode) {
  ...
});
```