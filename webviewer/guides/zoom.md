---
title: Zoom
author: Justin Jung
---

## Zooming through UI

![Zoom UI](../img/zoom-ui.png)

- The zoom UI is found on top tool bar
- Minus/plus buttons zoom out/in the document respectively
- You can also specify the zoom level you want by clicking and typing in the text field

## Zooming programatically

### Outside the iframe

```js
var currentZoom = myWebViewer.getZoomLevel();
myWebViewer.setZoomLevel(currentZoom * 0.8);
```

### Inside the iframe (config.js)

```js
var currentZoom = readerControl.getZoomLevel();
readerControl.setZoomLevel(currentZoom * 0.8);
```