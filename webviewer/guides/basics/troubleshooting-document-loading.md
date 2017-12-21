---
title: Troubleshooting Document Loading
---
### Loading works but it seems slow
If you application allows it you should [preload WebViewer](/webviewer/guides/basics/document-loading#preloading-webviewer) so that when your users want to view a document, WebViewer's JavaScript, HTML and CSS will already be loaded.

#### Universal WebViewer
It's important that your server supports HTTP range requests properly so that WebViewer can load XOD documents incrementally instead of having to download the entire file up front.

If you're serving your files statically from your server usually range requests will just work, however if you have your own endpoint for the file there are libraries that can handle range requests for you, or you could [implement support yourself](https://tools.ietf.org/html/rfc7233#section-2.1).

#### PDF WebViewer
Ideally your PDF files are linearized which means that the contents of the file are arranged efficiently so that WebViewer can download the contents for specific pages.

You can linearize files using a PDF library like PDFNet on your server. Once files are linearized you'll also need to make sure that your server supports range requests.

### Mime Types
If you see a 404 for files on your server but you're very sure that the files are there then you may need to set mime types for certain file extensions used by WebViewer. With IIS you will generally need to do this and the process may vary slightly depending on your server.

If you're using XOD files you'll need to add `xod` with a mime type of `application/octet-stream` or `application/vnd.ms-xpsdocument`

For PDF files you'll need to add the following:

|Extension|Mime Type|
|---|---|
|res|application/octet-stream|
|pexe|application/x-pnacl|
|nmf|application/octet-stream|
|mem|application/octet-stream|

Regardless of the documents that you're loading you'll need to add the mime type for json files (application/json) so that the UI text is loaded. If you see buttons or labels in the UI with names like `controlbar.fullScreen` then that means the json file wasn't loaded successfully.

### Invalid XOD file: Zip end header data is wrong size!
This error usually means that your server does not support HTTP range requests properly. Instead of downloading a small part of the file it is downloading the entire file.

If you're serving your files statically from your server usually range requests will just work, however if you have your own endpoint for the file there are libraries that can handle range requests for you, or you could [implement it support yourself](https://tools.ietf.org/html/rfc7233#section-2.1).

As a last resort you can set the streaming option in the WebViewer constructor to true. This is intended for streaming of the XOD conversion but can be used as a workaround for servers that don't support range requests at the cost of reduced performance and increased memory usage. See [this guide](/webviewer/guides/fundamentals/streaming-option) for more information.

### getComputedStyle(...) is null
You might get this error in Firefox if you intially have the element that contains WebViewer set to `display: none`. You can follow the Firefox bug tracking this issue here https://bugzilla.mozilla.org/show_bug.cgi?id=548397.

To work around this bug you can instead set the element to `visibility: hidden` or `height: 0; width: 0;`.

### CORS Support
If the documents that you want to load are on a different server than your WebViewer files you'll need to enable CORS on your document server. [This site](https://enable-cors.org/server.html) contains more information about how to enable CORS on your server.

Here is an example configuration that works for Amazon S3:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

If you're using Google Cloud Storage you can refer to Google's documentation on how to set up CORS on a bucket https://cloud.google.com/storage/docs/cross-origin.
They describe a few different ways you can upload the CORS configuration to Cloud Storage.

The cors-json-file.json that you can use is:
```json
[
    {
      "origin": ["*"],
      "responseHeader": ["*"],
      "method": ["*"],
      "maxAgeSeconds": 3600
    }
]
```