---
title: Document Loading
---
The easiest way to load a document in WebViewer is by specifying the initialDoc option but what if you want to do something a bit different? For example loading multiple documents in sequence or preloading WebViewer without a document and then loading the document later.

### Loading WebViewer without a document
If you want to instantiate the viewer without loading any document (maybe you're getting the document URL asynchronously) then you can simply not set the initialDoc option. The viewer UI will be loaded and you can call the [loadDocument](https://www.pdftron.com/webviewer/demo/doc/PDFTron.WebViewer.html#loadDocument__anchor) function when you're ready to load a document.

### Preloading WebViewer
If your website doesn't need to display the viewer immediately you can improve performance by preloading WebViewer so that it's immediately ready when you want to display a document. To do this you can load WebViewer without a document and hide the viewer ([make sure not to use display: none](/webviewer/guides/troubleshooting-document-loading.md#getComputedStyle)). When it's time to display WebViewer you can simply unhide the element and call loadDocument.

The reason this is worthwhile is that when WebViewer is instantiated it needs to load a number of JavaScript and CSS files and initialize the viewer UI. Depending on the network connection this can take a non-trivial amount of time which happens in the background when preloading.

### Loading multiple documents with loadDocument
If you want to load multiple documents in your app you'll want to reuse WebViewer. This is better than removing the old iframe and creating a new instance of WebViewer because some browsers have trouble with this and may leak memory.

To reuse WebViewer just keep a reference to your WebViewer instance and call loadDocument with the new document URL.
```javascript
var myWebViewer = new PDFTron.WebViewer({
  initialDoc: 'mysite.com/myfirstdocument.pdf',
  documentId: 'id1'
}, viewerElement);

// later on
loadDocumentButton.on('click', function() {
  myWebViewer.loadDocument('mysite.com/myOtherDocument.pdf', { documentId: 'id2' });
});
```