---
title: Understanding WebViewer HTML Structure
---
WebViewer can easily be [integrated into an existing HTML page](/webviewer/guides) by using the PDFTron.WebViewer constructor and linking it to an element on the page.

A basic JavaScript API is available that you can use from your HTML page, but if you want to do more advanced customizations it's important that you understand the HTML structure that WebViewer creates.

When you pass in `viewerElement` to the WebViewer constructor, WebViewer will create an iframe and place it in inside viewerElement. The iframe will load ReaderControl.html (or MobileReaderControl.html on mobile devices) which starts up the viewer and loads the document that you specified.

### Your HTML Page
On your HTML page you might have some JavaScript code that looks like this:
```javascript
var myWebViewer = new PDFTron.WebViewer({
  initialDoc: "mydoc.pdf"
}, viewerElement);
```

If you want to interact with WebViewer you can call functions on [`myWebViewer`](https://www.pdftron.com/webviewer/demo/doc/symbols/PDFTron.WebViewer.html) or listen to [events on `viewerElement`](https://www.pdftron.com/webviewer/demo/doc/symbols/PDFTron.WebViewer.html#toc49__anchor). For example:
```javascript
myWebViewer.setCurrentPageNumber(5);

$(viewerElement).on('ready', function() {
  ...
});
```

### The WebViewer iframe
It's important to remember that WebViewer's iframe is a completely separate window, isolated from your own HTML page.

Inside this window is where you can directly access the [`ReaderControl`](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/ReaderControl.html), [`DocumentViewer`](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.DocumentViewer.html) and [`AnnotationManager`](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html) objects (among others). The easiest way to interact with these objects is to use a [config file](/webviewer/guides/funadmental/config-files) which is executed in the context of the iframe window and allows you to access `window.readerControl` directly.

So when you call `myWebViewer.setCurrentPageNumber(5)` on your HTML page, behind the scenes it will be calling a function on DocumentViewer which is inside the iframe window.

The functions on myWebViewer and the events on viewerElement are just a convenient subset of the functions and events that can be used directly from the iframe window. They also abstract away the details of interacting with the iframe so you don't have to worry about it.

If you **did** want to worry about it, you would need to get a reference to the window object of the iframe. You can do that by calling:
```javascript
var iframeWindow = viewerElement.querySelector('iframe').contentWindow;
// equivalent to the code we called before on myWebViewer
iframeWindow.readerControl.docViewer.setCurrentPage(5);
```

Then anything that you could call in a config file without specifying the window you can also call from your HTML page by prefixing it with `iframeWindow`.

The PDFTron.WebViewer API also provides the [`getInstance`](https://www.pdftron.com/webviewer/demo/doc/symbols/PDFTron.WebViewer.html#getInstance__anchor) function which is the equivalent of `iframeWindow.readerControl`. So you could instead call `myWebViewer.getInstance().docViewer.setCurrentPage(5)`;

Similarly if you want to access the outer page from inside the iframe, e.g. from code in your config file, you can access the parent window using `window.parent`. So if you defined an API that's loaded on your HTML page, you could access it from inside the iframe like `window.parent.myApi.myFunction()`.

**Note:** If the WebViewer library is on a different domain from your HTML page you can use the window [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API to communicate between your page and the iframe.

### Troubleshooting
One gotcha is that if you want to select HTML elements inside the iframe from code on your HTML page you'll need to use jQuery (or the document object) from the iframe. For example:
```javascript
var iframeWindow = viewerElement.querySelector('iframe').contentWindow;
var printButton = iframeWindow.$('#printButton');
// the following won't work because it's not looking at elements inside the iframe
// var printButton = $('#printButton');
```

### Summary
There are a few different ways your code can interact with WebViewer and it helps to understand how WebViewer works behind the scenes so that you can use the ones that work best for your situation.