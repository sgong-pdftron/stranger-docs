---
title: Integrate to your project
---

WebViewer is designed to view and interact with documents, regardless they are XOD, PDF or Office. It contains a viewer to visually 

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

Add the following code to the HTML `<body>`.

```html
<div id="viewer" style="width:100%;height:100%;min-height:300px;"></div>
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