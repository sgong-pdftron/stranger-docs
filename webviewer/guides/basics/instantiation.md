---
title: WebViewer Instantiation Options
---

Instantiating WebViewer can be as simple as using the `initialDoc` option but there are many other options available to you that can be useful. This guide describes a few of the more common options. The full list of options can be found in the [WebViewer documentation](https://www.pdftron.com/webviewer/demo/doc/PDFTron.WebViewer.html#Options__anchor).

### annotationAdmin, annotationUser and enableReadOnlyMode
WebViewer has support for permissions on annotations, restricting which users are allowed to edit which annotations. Specifiying the user is an annotationAdmin means they can edit any annotation regardless of whether they created it. The annotationUser option is the name of the current user and the current user will only be able to edit annotations that they have created. To force the document into a readonly state you can set enableReadOnlyMode to true so that no one can create or edit annotations, regardless of who created them.

### azureWorkaround
If you store your documents with Microsoft Azure then you should enable this option. Azure doesn't properly implement all parts of the range request specification so this workaround adds an extra HTTP round trip when initially loading the document. If you have a mix of documents in different locations for some reason this option won't cause any problems, it will just add the extra HTTP request.

### config
The config option allows you to specify a JavaScript file that will be executed inside the WebViewer iframe. It's the easiest way to keep your WebViewer customizations decoupled from the default viewer code.

### custom
Pass custom data that can be accessed from inside your config file. This option should be a string, so you can pass non-strings by stringifying them (e.g. JSON.stringify).

### documentId
A unique identifier for the document that is used for saving and loading annotations. The id is passed as a query parameter to your server so that it can identify which document to return the annotations for.

### documentType
By default WebViewer will look at the extension of the file that initialDoc is sent to but sometimes document URLs on your server won't have a file extension. If this is the case then you'll need to explicitly pass "xod" or "pdf" depending on which file you are loading.

### mobileRedirect
By default if WebViewer detects that it's running on a mobile device it will redirect the page so that WebViewer is not displayed inside an iframe. Mobile browsers can sometimes be finicky when displaying iframes which is why WebViewer redirects by default. If you want to override this behavior you can pass set mobileRedirect to false.

### path
This is the path to the folder that contains the html5 folder and the WebViewer.min.js file. By default WebViewer assumes that your html file will be in the same folder as the WebViewer files but if not you can set this option. For example if your file structure looks like this:


### serverUrl
A URL on your server that handles the saving and loading of annotations. WebViewer will make calls to this URL when it wants to load or save annotations. You can handle this saving and loading manually but the serverUrl is the simplest option.