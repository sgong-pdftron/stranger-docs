# Intercept handling annotation events in a Tool

The [`BasicAnnotationListener.onInterceptAnnotationHandling(Annot, int)`]() is called in [ToolManager]() when it is going to handling the touch event on the annotation by corresponding tool. If [`BasicAnnotationListener.onInterceptAnnotationHandling(Annot, int)`]() returns true, the annotation hadnling event is intercepted, meaning it is not passed to default handling event.

For example, [`PDFViewCtrlTabFragment`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/PdfViewCtrlTabFragment.html) implements [`BasicAnnotationListener`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.BasicAnnotationListener.html), the following snippet is how [`PDFViewCtrlTabFragment`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/PdfViewCtrlTabFragment.html) overrides [`BasicAnnotationListener.onInterceptAnnotationHandling(Annot, int)`]() when the [LinkAction](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html) tool going to handling link annotation click event.

```java
@Override
public boolean onInterceptAnnotationHandling(Annot annot, int pageNum){
  try {
      if (annot.getType() == Annot.e_Link) {
          mInternalLinkClicked = true;
          // update current page indicator
          updateCurrentPageInfo();
      }
  } catch (PDFNetException e) {
      e.printStackTrace();
  }
  // return false so LinkAction can continue working on clicking link annotation.
  return false;
}
```