---
title: Customizing Tools
---
WebViewer allows you to extend the behavior of tools by overriding certain functions on them. Common functions you might want to override include mouseLeftDown, mouseMove and mouseLeftUp among others.

As an example let's change the highlight tool so that when the user finishes highlighting, the highlight will turn cyan. To override a particular function on a tool we can set its value to a new function.

```javascript
// get a copy of the default mouse up function
var highlightMouseUp = Tools.TextHighlightCreateTool.prototype.mouseLeftUp;

// set it to our own function
Tools.TextHighlightCreateTool.prototype.mouseLeftUp = function() {
  // just call the original function for now, passing all the arguments
  highlightMouseUp.apply(this, arguments);
};
```

In the example code above we're just calling the original mouse up function that we saved as a variable. Just using that code there should be no visible change in the behavior of the highlight tool.

Let's change the color of the annotation now. All annotation tools have an "annotation" property which is the current annotation being created by the tool. It's created in mouseLeftDown, modified in mouseMove and removed from the tool in mouseLeftUp. This means we need to access it before the original mouseLeftUp function is called.

```javascript
var highlightMouseUp = Tools.TextHighlightCreateTool.prototype.mouseLeftUp;

Tools.TextHighlightCreateTool.prototype.mouseLeftUp = function() {
  if (this.annotation) {
    this.annotation.StrokeColor = new Annotations.Color(0, 255, 255);
  }
  highlightMouseUp.apply(this, arguments);
};
```

If you try this code you'll see that it almost works, however you need to click the page again for the annotation to be redrawn in the new color. To fix this we'll need to redraw the annotation inside the tool so that it's updated right away.

```javascript
var highlightMouseUp = Tools.TextHighlightCreateTool.prototype.mouseLeftUp;
Tools.TextHighlightCreateTool.prototype.mouseLeftUp = function() {
  if (this.annotation) {
    this.annotation.StrokeColor = new Annotations.Color(0, 255, 255);
    readerControl.docViewer.getAnnotationManager().redrawAnnotation(this.annotation);
  }
  highlightMouseUp.apply(this, arguments);
};
```

Now the highlight should change colors right after it's created. As mentioned earlier you can override several different functions on tools and it should work similarly to the example above.