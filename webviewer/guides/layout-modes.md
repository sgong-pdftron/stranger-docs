---
title: Layout Modes
author: Justin Jung
---

## List of layout modes

Layout mode | Description
---|---
Single | One page at a time
Continuous | All pages in one continuous, scrollable column
Facing | Two pages at a time
Facing continuous | All pages in two continuous, scrollable column
Cover | Two pages at a time, but the first page starts on the right column
Cover continuous | All pages in two continuous, scrollable column, but the first page starts on the right column

## Changing layout mode through UI

![Layout modes UI](../img/layout-modes-and-rotate-ui.png)

- The layout modes UI is shown when you hover the layout button, found on top tool bar
- Each button refers to Single, Continuous, Facing, Facing continuous, Cover, Cover continuous mode from left to right

## Changing layout mode programatically

### Outside the iframe

```js
var currentLayoutMode = myWebViewer.getLayoutMode();
myWebViewer.setLayoutMode(CoreControls.DisplayModes.Single);
```

### Inside the iframe (config.js)

```js
var currentLayoutMode = readerControl.getLayoutMode();
readerControl.setLayoutMode(CoreControls.DisplayModes.Single);
```

Enumeration for each layout mode is listed in [CoreControls.DisplayModes](#)