---
title: Overview
---
PDFTron WebViewer is a cross-platform solution that offers a seamless and effective way to embed viewing of PDF and other document formats directly within your web app. There are three major components to this solution:
1. The client side viewer
2. The document conversion component (if necessary)
3. Your own server for document hosting and annotation handling

### Client side viewer
WebViewer delivers consistent and reliable document viewing across modern browsers using HTML5 technology. For document viewing only, the WebViewer does not require any server-side scripting. The document files can be served directly from any static Web server.

The provided viewer can be used as is or it can be customized using WebViewer's comprehensive API. You can check out the [samples](/webviewer/guides/run-samples) to see some examples of WebViewer customization.

### Document engines

WebViewer supports two document engines. The Universal engine supports viewing virtually all document types once they've been converted to a web optimized format. This conversion typically takes place on a server.

Alternatively, the PDFNetJS engine can view PDF and Office documents directly, without a conversion step. There are benefits to both approaches in different situations which are outlined below.

#### PDFNetJS
Using PDFNetJS as the document engine allows you to leverage the power of PDFNet rendering in the browser. When using this engine there is no server-side conversion of documents required. The trade off is that a limited set of filetypes can be viewed (currently .pdf, .docx, .xlsx, .pptx, .md, .png, and .jpeg) and PDFNetJS is only supported with IE10+ and the latest mobile browsers (Chrome 59+, iOS 11+) on mid to high end devices.

Viewing PDF or Office files when using PDFNetJS requires a license key to be specified when creating the viewer. Without a license, you will be prompted to register for a demo license key and a demo stamp will be applied to the document.

#### Universal
Using the Universal engine allows many different file formats to be viewed as long as they are converted to a web optimized [XPS](https://en.wikipedia.org/wiki/Open_XML_Paper_Specification) file called XOD. The XOD conversion step performs optimizations on the file which allows fast and accurate rendering on both desktop and mobile devices. Universal WebViewer supports IE9+ and all mobile devices.

For more information about Universal WebViewer and XOD document conversion [see here](/webviewer/guides/universal-webviewer).

### Your server component
In order to view your documents on the web, both WebViewer and your documents need to be hosted on a web server. Moreover, if you need access control over your documents or want to manage user-created annotations, you will need a server to handle this logic.

### Annotation handling
WebViewer provides support for rendering, creating and saving PDF annotations. See the [annotation saving and loading guide](/webviewer/guides/basics/annotations/saving-loading-annotations) for more information about persisting them on your server.

### Form fields
PDF form fields can be viewed, edited and saved. WebViewer also supports form actions and PDF embedded JavaScript on form fields. See the [forms guide](/webviewer/guides/advanced/forms) for more information.