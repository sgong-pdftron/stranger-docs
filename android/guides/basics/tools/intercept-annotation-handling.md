# Intercept handling annotation events in a Tool

The [`BasicAnnotationListener.onInterceptAnnotationHandling(Annot, Bundle, int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.BasicAnnotationListener.html#onInterceptAnnotationHandling(Annot,%20android.os.Bundle,%20com.pdftron.pdf.tools.ToolManager.ToolMode)) is called in [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) when a user is about to interact with or modify an annotation, for example by selecting it, moving it or changing a property. If [`BasicAnnotationListener.onInterceptAnnotationHandling(Annot, Bundle, int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.BasicAnnotationListener.html#onInterceptAnnotationHandling(Annot,%20android.os.Bundle,%20com.pdftron.pdf.tools.ToolManager.ToolMode)) returns true, the annotation hadndling event is intercepted, meaning it is not passed to default handling event.

In addition, parameter `Bundle` has information of which method is handling annotation by getting String value of key [`Tool.METHOD_FROM`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#METHOD_FROM), and other information key in String Array value of key [`Tool.KEYS`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#KEYS)

```java
@Override
public boolean onInterceptAnnotationHandling(Annot annot, Bundle extra, int toolMode){

    // Get which method is handling annotation
    if (extra != null && extra.containsKey(Tool.METHOD_FROM)) {
        String methodCalling = extra.getString(Tool.METHOD_FROM);
        Log.d("TAG", "method calling: " + methodCalling);
    }

    // get other information extra bundle contains
    if (extra != null && extra.containsKey(Tool.KEYS)) {
        String[] paramKeys = extra.getStringArray(Tool.KEYS);
        for (String key : paramKeys) {
            Object param = extra.get(key);
            Log.d("TAG", "param: " + param.toString());
        }
    }

    // intercept FormFill tool from handling annotation
    if(toolMode == ToolManager.e_form_fill) {
        return true;
    }

    try {
        if (annot.getType() == Annot.e_Link) {
            Log.d("TAG", "handled annotation is a Link");
        }
    } catch (PDFNetException e) {
        e.printStackTrace();
    }
    // return false so LinkAction can continue working on clicking link annotation.
    return false;
}
```