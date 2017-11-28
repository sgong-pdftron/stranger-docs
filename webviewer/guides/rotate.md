---
title: Rotate
---

## Rotating through UI

![Rotate UI](../../../static/webviewer-layout-modes-and-rotate-ui.png)

- The rotate UI is shown when you hover the layout button, found on top tool bar
- Clockwise/Counter-clockwise buttons refer to rotating documents 90 degrees in corresponding direction

## Rotating programatically

### Outside the iframe

```js
myWebViewer.rotateClockwise();
myWebViewer.rotateCounterClockwise();
```

### Inside the iframe (config.js)

```js
readerControl.rotateClockwise();
readerControl.rotateCounterClockwise();
```

## Related events

### Outside the iframe

N/A

### Inside the iframe (config.js)

```js
readerControl.docViewer.on('rotationUpdated', function(event, rotation) {
  ...
});
```