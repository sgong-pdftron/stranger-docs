---
title: Config files
---
To make customizations to WebViewer simple and clean you can define everything in an external JavaScript config file.

What's being referred to here as a "config file" is actually just an ordinary JavaScript file. What's special about it is that WebViewer will execute all of this code in the context of the [viewer's iframe window](/webviewer/guides/fundamentals/html-structure). This gives you easy access to the [Document](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.Document.html), [DocumentViewer](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.DocumentViewer.html) and [AnnotationManager](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.AnnotationManager.html) objects (among others) which can allow you to make more complicated customizations.

To instantiate WebViewer with a config file you just need to set the `config` option in the WebViewer constructor. For example:
```javascript
var myWebViewer = new PDFTron.WebViewer({
  initialDoc: "mydoc.pdf",
  config: "path/to/my/config/file.js"
}, viewerElement);
```

The config file path should be relative to your HTML file. For more examples of config file use you can take a look at any of the HTML5 samples in the samples folder.

Although you are able to modify ReaderControl.js and related files directly, it's preferred to contain your customizations within a config file as it makes upgrading to new WebViewer versions easier.

### Useful Events
When the config file is executed the `readerControl` variable won't be defined and the document won't be loaded yet so you can't immediately access these objects. You can listen for events on the HTML document object that will notify you at key points.

The first important one is the [`viewerLoaded`](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/ReaderControl.html#event:viewerLoaded__anchor) event. viewerLoaded will be fired after the ReaderControl object has been constructed, so you'll be able to access the `readerControl` variable along with DocumentViewer and AnnotationManager before the document has loaded. For example:
```javascript
$(document).on('viewerLoaded', function() {
  var docViewer = readerControl.docViewer;
  docViewer.setMargin(20);
  docViewer.on('fitModeUpdated', function(e, fitMode) {
    console.log('fit mode changed');
  });
});
```

Another important event is [`documentLoaded`](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/ReaderControl.html#event:documentLoaded__anchor). Once documentLoaded has fired you can access Document as well as functions related to the page number on ReaderControl, DocumentViewer and AnnotationManager. For example:
```javascript
$(document).on('documentLoaded', function() {
  var docViewer = readerControl.docViewer;
  var doc = docViewer.getDocument();
  doc.loadThumbnailAsync(0, function(thumb) {
    $('#myThumbnailDiv').append(thumb);
  });

  var annotManager = docViewer.getAnnotationManager();
  var rectangle = new Annotations.RectangleAnnotation();
  rectangle.PageNumber = 2;
  rectangle.X = 100;
  rectangle.Y = 100;
  rectangle.Width = 250;
  rectangle.Height = 250;
  rectangle.Author = annotManager.getCurrentUser();
  annotManager.addAnnotation(rectangle);

  docViewer.displayLastPage();
});
```

### Passing custom data
Sometimes you might want to send custom data from the "outer" page (with the PDFTron.WebViewer constructor) to the "inner" page (your config file). To do this you can use the `custom` option in the WebViewer constructor. The property expects a string value. So for example to pass an object:
```javascript
var myObj = {
  startPage: 10
};

var myWebViewer = new PDFTron.WebViewer({
  custom: JSON.stringify(myObj)
}, viewerElement);
```

Then inside the config file you access this data as follows:

```javascript
var custom = JSON.parse(window.ControlUtils.getCustomData());
console.log(custom.startPage) // outputs 10

$(document).on('documentLoaded', function() {
  var docViewer = readerControl.docViewer;
  docViewer.setCurrentPage(custom.startPage);
});
```

### Modifying the UI
By the time the config file is executed the DOM will have been loaded so you can safely access elements immediately. This example code hides the previous button if the user is on the first page and the next button if the user is on the last page.
```javascript
var docViewer;
var $prevPage = $('#prevPage');
var $nextPage = $('#nextPage');

function updatePageButtons(pageNumber) {
  if (pageNumber === 1) {
    $prevPage.css('visibility', 'hidden');
  } else {
    $prevPage.css('visibility', 'visible');
  }

  if (pageNumber === docViewer.getPageCount()) {
    $nextPage.css('visibility', 'hidden');
  } else {
    $nextPage.css('visibility', 'visible');
  }
}

$(document).on('viewerLoaded', function() {
  docViewer = readerControl.docViewer;

  docViewer.on('pageNumberUpdated', function(e, pageNumber) {
    updatePageButtons(pageNumber);
  });
});

$(document).on('documentLoaded', function() {
  updatePageButtons(1);
});
```

Check out the WebViewer [samples](/webviewer/guides/run-samples) for more examples that use config files.