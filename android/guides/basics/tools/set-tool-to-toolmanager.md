# Set tool to ToolManager

If you want to set next tool explicitly through ToolManager, you can call [`ToolManager.setTool(ToolManager.Tool)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#setTool(com.pdftron.pdf.tools.ToolManager.Tool))

```java
mToolManager.setTool(mToolManager.createTool(toolMode, mToolManager.getTool()));
```

If you are writing your own [custom tool](android/guides/advanced/custom-tool) and you need to set next tool implicitly in tool motion event by calling  [`Tool.safeSetNextToolMode(int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#safeSetNextToolMode-int-). For example, in [`Pan.onSingleTapConfirmed(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html#onSingleTapConfirmed-android.view.MotionEvent-), it sets next tool to be [`LinkAction`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html) tool as following:

```java
@Override
public boolean onSingleTapConfirmed(MotionEvent e) {
    // ... do something
    if (mAnnot.getType() == Annot.e_Link) {
        // Link navigation
        mNextToolMode = safeSetNextToolMode(ToolManager.e_link_action);
    }
    return false;
}
```
