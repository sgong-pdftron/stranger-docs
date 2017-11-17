---
title: Troubleshooting Document Loading
---
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

### CORS Support
If the documents that you want to load are on a different server than your WebViewer files you'll need to enable CORS on your document server. [This site](https://enable-cors.org/server.html) contains more information about how to enable CORS on your server.

Here is an example configuation that works for Amazon S3:
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

### getComputedStyle(...) is null
You might get this error in Firefox if you intially have the element that contains WebViewer set to `display: none`. You can follow the Firefox bug tracking this issue here https://bugzilla.mozilla.org/show_bug.cgi?id=548397.

To work around this bug you can instead set the element to `visibility: hidden` or `height: 0; width: 0;`.
