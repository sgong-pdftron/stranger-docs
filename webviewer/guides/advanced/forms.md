---
title: Forms
---
WebViewer provides support for interactive forms which are a collection of fields for gathering information interactively from the user.

Here are the major features of WebViewer form support:
- Rendering of the form field widgets as from the original PDF document
- Dynamic data entry into form field widgets
- Loading and saving of form field data
- Support for a number of form actions, including embedded JavaScript
- Programmatic access to form field data, values and child widgets via the [Annotations.Forms.FieldManager](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/Annotations.Forms.FieldManager.html) class

### Importing/Exporting
All of the form field data (field values and widget appearances) is included inside XFDF, for example when calling [annotManager.exportAnnotations](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#exportAnnotations__anchor).

This means that when using the [serverUrl option](/webviewer/guides/basics/annotations/saving-loading-annotations) the field data will automatically be sent to your server with the annotation data and retrieved when loading a document.