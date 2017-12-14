---
title: Annotation Events
---
There are a number of events related to annotations that can be useful to hook into. To do this you'll add a listener to the AnnotationManager in the viewerLoaded event. Note that you do **not** want to add the listener on documentLoaded otherwise you'll keep adding extra listeners every time a new document is loaded.
```javascript
$(document).on('viewerLoaded', function() {
  var annotManager = readerControl.docViewer.getAnnotationManager();
  annotManager.on('annotationChanged', function() {
    // ...
  });
});
```

### annotationChanged
The [annotationChanged](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#event:annotationChanged__anchor) event is fired every time an annotation is added, modified or deleted. The handler takes three parameters; the event object, an array of annotations that have changed and a string for the action (add, modify, delete).
```javascript
$(document).on('viewerLoaded', function() {
  var annotManager = readerControl.docViewer.getAnnotationManager();
  annotManager.on('annotationChanged', function(event, annotations, action) {
    if (action === 'add') {
      console.log('this is a change that added annotations');
    } else if (action === 'modify') {
      console.log('this change modified annotations');
    } else if (action === 'delete') {
      console.log('there were annotations deleted');
    }

    annotations.forEach(function(annot) {
      console.log('annotation page number', annot.PageNumber);
    });
  });
});
```

Note that the annotationChanged event will also be fired whenever annotations are imported from your server or inside the document i.e. they weren't created directly by a user. If you want to do something different in that case, maybe ignore those events, you can use the `imported` property of the event object. For example:
```javascript
annotManager.on('annotationChanged', function(event, annotations, action) {
  if (event.imported) {
    return;
  }
  // do event handling
});
```

### annotationSelected
The [annotationSelected](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#event:annotationSelected__anchor) event is fired any time an annotation is selected or deselected in the UI. The parameters are similar to annotationChanged; there is an event object, array of annotations and a string for the action (selected or deselected). If all annotations have been deselected then the annotations array will be null.
```javascript
annotManager.on('annotationSelected', function(event, annotations, action) {
  if (action === 'selected') {
    console.log('annotation selection');
  } else if (action === 'deselected') {
    console.log('annotation deselection');
  }

  console.log('annotation list', annotations);

  if (annotations === null && action === 'deselected') {
    console.log('all annotations deselected');
  }
});
```

Annotations can be selected from the UI by clicking on them and once selected there will be a dashed border drawn around them.
To programmatically select/deselect annotations you can use the selectAnnotation(s) and deselectAnnotation(s) functions. The getSelectedAnnotations will tell you which annotations are currently selected. For example, the following code deselects one of the currently selected annotations:
```javascript
var selectedAnnots = annotManager.getSelectedAnnotations();
if (selectedAnnots.length > 0) {
  var firstSelectedAnnot = selectedAnnots[0];
  annotManager.deselectAnnotation(firstSelectedAnnot);
}
```

There are several more [events on AnnotationManager](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#toc61__anchor) that may be useful to you.