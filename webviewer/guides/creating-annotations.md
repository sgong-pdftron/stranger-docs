---
title: Creating Annotations
---
### Creating annotations through the UI
The annotation tools can be found on the WebViewer top toolbar. You can click on a tool to switch to it or click on the downward pointing arrow to see all of the other annotation tools.
![Annotation tools](../img/annotation-ui.png)

Another way to switch tools is to right-click on the document which will bring up a context menu. From this menu you can select an annotation tool to switch to.
![Annotation tools](../img/context-menu.png)

Once you've switched to an annotation tool then it varies a bit depending on which tool you're using but you'll be able to click or click + drag to create the annotation.

### Creating annotations programmatically
Most of the time your users will create annotations using the built in tools but it's also possible to create them programmatically. Here is an example of creating a rectangle annotation, but creating other types of annotations is similar. Note that this code should be run inside a WebViewer config file. You can find the properties and functions that are available on each type of annotation in the [annotation documentation](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/Annotations.html).

```javascript
var annotManager = readerControl.docViewer.getAnnotationManager();

var rectangleAnnot = new Annotations.RectangleAnnotation();
rectangleAnnot.PageNumber = 1;
// values are in page coordinates with (0, 0) in the top left
rectangleAnnot.X = 100;
rectangleAnnot.Y = 150;
rectangleAnnot.Width = 200;
rectangleAnnot.Height = 50;
rectangleAnnot.Author = annotManager.getCurrentUser();

annotManager.addAnnotation(rectangleAnnot);
// need to draw the annotation otherwise it won't show up until the page is refreshed
annotManager.redrawAnnotation(rectangleAnnot);
```