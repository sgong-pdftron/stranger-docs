---
title: Integrate to your project
---

## Download WebViewer

You can download the [latest WebViewer](http://www.pdftron.com/webviewer/download.html). Its folder structure is as follows:

```
- lib
  - html5               // Folder that contains WebViewer dependencies and UI elements
  - WebViewer.js        // Defines PDFTron.WebViewer
  - WebViewer.min.js    // Minified version of WebViewer.js
```

## Add it to your project

Copy the `lib` folder to your project, and add the dependencies to `<head>` of an HTML page.

```html
<script src="lib/html5/external/jquery-3.2.1.min.js"></script> <!-- jQuery must be added before WebViewer.js -->
<script src="lib/WebViewer.min.js"></script>
```

`PDFTron.WebViewer` is now defined as a global variable.

## Create the viewer + load the document

Add the following style tag to the head:
```html
<style>
  html, body {
    height: 100%;
  }

  #viewer {
    height: 100%
    width: 100%
  }
</style>
```

Add the following code to the HTML `<body>`.

```html
<div id="viewer"></div>
<script>
  var viewerElement = document.getElementById("viewer");
  var myWebViewer = new PDFTron.WebViewer({
    path: "./lib",
    documentType: "xod",
    initialDoc: "docs/GettingStarted.xod",
    streaming: true
  }, viewerElement);
</script>
```

Voila! The viewer loading a document inside `<div id="viewer">` :D

## Example

We encourage you to check our [example](#) to see how we setup.