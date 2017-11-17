---
title: Using the streaming option with WebViewer
---
By default WebViewer loads XOD documents by only downloading the parts of the file that are required to display the currently visible pages. This approach decreases load times and memory usage because the entire file doesn't have to be downloaded up front.

When creating a WebViewer object if the streaming option is not specified then this is the loading behavior that occurs. This is the same as if the streaming option had been passed with the value false.

```javascript
$(function() {
  var viewerElement = document.getElementById("viewer");
  var myWebViewer = new PDFTron.WebViewer({
    initialDoc: "GettingStarted.xod",
    streaming: false
  }, viewerElement);
});
```

### So what is streaming: true good for?
The streaming option should be set to true only if the **conversion** of the XOD file is being streamed/done on the fly. WebViewer will be able to load the file in chunks as the conversion is streamed, however it will have to take in the entire file at the beginning. For medium to large files (more noticeable on mobile devices) this can cause the viewer to appear sluggish when loading the document because it is processing and storing everything in memory at the same time!

### Recommended Usage
For best performance we recommend converting all documents to XOD ahead of time which allows WebViewer to load the file in parts. Note that your server should support HTTP range requests to take advantage of this and don't specify the steaming option (it defaults to false). If WebViewer detects that your server doesn't support range requests then it will automatically fall back to downloading the entire file.

Setting the streaming option to true may be useful if there are small, dynamically generated files uploaded to or created on your server. Since the files are small the download time and memory usage won't be very large. This also means that you won't have to store many documents on your server that are only viewed once. The PDFNet SDK download includes a WebViewerStreaming sample that can help you get started with this.