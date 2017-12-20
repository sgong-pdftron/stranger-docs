---
title: Integrating with native apps
---
While the HTML5 WebViewer was designed for web browsers, it can also be embedded directly in native mobile applications. Viewing documents directly from the file system without an Internet connection can be achieved this way.

For Android, iOS and WinRT, WebViewer can be embedded in a WebView or UIWebView control. In all cases, WebViewer will be able access documents directly on the device's file system.

You can find sample project for each platform in the samples folder of the WebViewer download package.

### Android
A sample of Android integration is included in the WebViewer package. It features a custom ContentProvider (LocalFileContentProvider) that reads local XOD documents and delivers the required parts to the WebViewer. Essentially, it simulates a web server's byte range request capabilities to provide content to the viewer only when it is needed.

On the WebViewer side, there is a part retriever (AndroidContentPartRetriever) that will handle making the requests to the ContentProvider.

### iOS & WinRT
The iOS and WinRT integration samples use special part retrievers which communicate with the app's UIWebView/WebView. Similar to Android they simulate a byte range request and the requested range is passed to the app. The apps read the bytes directly from the file and base64 encode the data before passing it back to JavaScript through a callback.

### Cordova
WebViewer can be embedded inside a Cordova app to load external files in much the same way as a regular web app. You can follow the steps in the Cordova sample readme for detailed instructions.

To load files from the local file system inside a Cordova app you can use the [LocalPartRetriever](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/PartRetrievers.LocalPartRetriever.html) along with [cordova-plugin-file](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/).