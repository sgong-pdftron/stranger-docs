---
title: Saving and Loading Annotations
---
### Getting started
WebViewer provides a fully functional annotation framework in HTML5 that is compatible with PDF annotations through the XFDF format. While WebViewer is provided as a pure client application, it also has built-in support for communicating with a back-end server.

If an annotation server path is specified in the WebViewer, it will issue AJAX requests to fetch and save the annotations. Since the server-side handling of annotations is heavily linked with the application logic, it is up to you to implement this saving and loading on your server. WebViewer provides sample implementations of PHP, ASP.NET and node.js annotation handlers that you can use as a starting point for your implementation.

### Loading annotations
WebViewer loads annotation data from the XFDF format. During the PDF conversion process to XOD, an XFDF file is embedded into the XOD document which stores all the existing annotations, links and form data of the PDF document. When a XOD document is first loaded into WebViewer it will look into the internal XFDF and load all of this information.

Note that `enableAnnotations: true` must be passed as an option to the WebViewer constructor:
```javascript
var myWebViewer = new PDFTron.WebViewer({
  initialDoc: "mydoc.xod",
  enableAnnotations: true
}, viewerElement);
```
WebViewer is also able to load annotations from external locations. To load annotations from your server you should set the `serverUrl` option when creating your WebViewer object. WebViewer will make a GET request to this URL with the document Id as a query parameter and expects to have the XFDF data returned with Content-Type text/xml.

So for example here is your WebViewer constructor:
```javascript
var myWebViewer = new PDFTron.WebViewer({
  initialDoc: "mydoc.xod",
  serverUrl: "http://myserver.com/myAnnotationHandler.php",
  documentId: "unique-id-for-this-document",
  enableAnnotations: true,
}, viewerElement);
```
WebViewer will then automatically make a GET request to `http://myserver.com/myAnnotationHandler.php` with a query parameter named `did` that has a value of `unique-id-for-this-document`. See annotationHandler.php, annotationHandler.js or AnnotationController.cs in the lib/html5 folder for a basic example of how to handle this.

Note that when loading external annotations like this, the annotations inside of the document will be ignored. This works well when the first time the document is loaded annotations are loaded from the inside the document and later saved to your server. Subsequent times all of the annotations can be loaded from your server.

### Saving annotations
The basic case of saving annotations for a single user is fairly straightforward. By default there is a button to save annotations in the desktop and mobile HTML5 viewers. When the button is pressed WebViewer will make a POST request to the same server URL and with the `did` query parameter as described above. Again, you can see an example of how this is handled by taking a look at annotationHandler.php.

Of course the trigger for saving annotations can be customized to occur without pressing that button. For example they could be saved at some interval or after every time an annotation changes, however that is outside the scope of this tutorial.