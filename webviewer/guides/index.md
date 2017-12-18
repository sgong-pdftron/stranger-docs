---
title: Integrate to your project
---

## Download WebViewer

First download the [latest WebViewer](http://www.pdftron.com/webviewer/download.html).

## Add it to your project

Copy the WebViewer `lib` folder to your project, and add the dependencies to the `<head>` of your HTML page.

```html
<!-- jQuery must be added before WebViewer.js -->
<script src="lib/html5/external/jquery-3.2.1.min.js"></script>
<script src="lib/WebViewer.min.js"></script>
```

## Create the viewer + load the document
Add the following code to the HTML `<body>`. The `initialDoc` option should be the path to one of your documents.

```html
<div id="viewer" style="width: 1024px; height: 600px;"></div>
<script>
  var viewerElement = document.getElementById("viewer");
  var myWebViewer = new PDFTron.WebViewer({
    path: "lib",
    initialDoc: "docs/GettingStarted.pdf",
  }, viewerElement);
</script>
```

At this point you should see the document loaded on your page. If you're running into problems try looking through the [troubleshooting page](/webviewer/guides/basics/troubleshooting-document-loading).