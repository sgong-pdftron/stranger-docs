---
title: Advanced Annotation Loading
---
For more advanced control over the annotation loading process you can use the [`setInternalAnnotationsTransform`](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.DocumentViewer.html#setInternalAnnotationsTransform__anchor) function on DocumentViewer. As mentioned in the getting started tutorial, WebViewer will load the internal XFDF data from each XOD file and this function allows you to transform that data before it gets loaded into the viewer.

You can use the function like this:
```javascript
$(document).on('viewerLoaded', function() {
  var docViewer = readerControl.docViewer;
  docViewer.setInternalAnnotationsTransform(function(xfdfData, callback) {
    // make modifications here
    // ...
    callback(newXfdfData);
  });
});
```

setInternalAnnotationsTransform is actually used by default in BaseReaderControl to be able to replace the original annotation data inside the document with the data from your server. When modifying the data it is easiest to first parse it into DOM elements, perform your modifications and then serialize back to a string.

An example of something you might want to do is remove all clickable links:
```javascript
docViewer.setInternalAnnotationsTransform(function(xfdfData, callback) {
  var parser = new DOMParser();
  var xfdfElements = parser.parseFromString(xfdfData, 'text/xml');
  [].forEach.call(xfdfElements.querySelectorAll('link'), function(e) {
    e.parentNode.removeChild(e);
  });

  var serializer = new XMLSerializer();
  callback(serializer.serializeToString(xfdfElements));
});
```

Here's another example of changing the color attribute of every annotation to blue:

```javascript
docViewer.setInternalAnnotationsTransform(function(xfdfData, callback) {
  var parser = new DOMParser();
  var xfdfElements = parser.parseFromString(xfdfData, 'text/xml');
  var annotations = xfdfElements.querySelector('annots').children;
  [].forEach.call(annotations, function(annotElement) {
    annotElement.setAttribute('color', '#0000FF');
  });

  var serializer = new XMLSerializer();
  callback(serializer.serializeToString(xfdfElements));
});
```

With setInternalAnnotationsTransform you have very fine control over all of the annotation data and can modify it exactly as you like.