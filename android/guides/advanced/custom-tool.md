# Creates a custom annotation creator tool

If you are going to creates a tool that is going to creates an annotation by drawing on the page, you can creates a subclass tool listed as following and then overrides [`TextMarkupCreate.createMarkup(PDFDoc, Rect bbox)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html#createMarkup-com.pdftron.pdf.PDFDoc-com.pdftron.pdf.Rect-) and [`Tool.getMode()`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#getMode--) method simply.

#### [`TextMarkupCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html)

It selects text and draw  a text loupe first and then creates an annotation.

#### [`RectCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectCreate.html)

It draws a rectangle on document first, and then creates an annotation

#### [`LineCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LineCreate.html)

It draws a line on document first, and then creates an annotation

#### [`OvalCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/OvalCreate.html)

It draws an oval on document first, and then creates an annotaiton

Example: [TextUnderlineCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextUnderlineCreate.html)
```java


/**
 * This class is for creating text underline annotation.
 */
@Keep
public class TextUnderlineCreate extends TextMarkupCreate {

    /**
     * Class constructor
     */
    public TextUnderlineCreate(@NonNull PDFViewCtrl ctrl) {
        super(ctrl, ToolManager.e_text_underline);
    }

    /**
     * The overload implementation of {@link TextMarkupCreate#getMode()}}.
     */
    @Override
    public int getMode() {
        return ToolManager.e_text_underline;
    }

    /**
     * The overload implementation of {@link TextMarkupCreate#createMarkup(PDFDoc, Rect)}}.
     */
    @Override
    public Annot createMarkup(PDFDoc doc, Rect bbox) throws PDFNetException {
        return Underline.create(doc, bbox);
    }
}

```
## Register the tool to [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html)

All tools are controlled in [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html). To make Tool manager about to switch to the current tool, You need add the custom tool to [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) by calling [`ToolManager.addCustomizedTool(Tool)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#addCustomizedTool-com.pdftron.pdf.tools.Tool-).

```java
mToolManager.addCustomizedTool(new CustomTool(mPdfViewCtrl));
```

## Switch to custom tool explicitly
In [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html), you can switch to custom tool explicitly by calling [`ToolManager.setTool(ToolManager.Tool)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.Tool.html)

```java
mToolManager.setTool(mToolManager.createTool(CustomTool.MODE, mToolManager.getTool()));
```

## Switch to other tool during motion events (e.g. [`onDown(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#onDown-android.view.MotionEvent-), [`onDoubleTap(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#onDown-android.view.MotionEvent-))

In gesture event functions, if one tool set a different tool to be the next tool, that motion event will continue to the next tool. See [**Tool Overview**](/android/guides/basics/tools). So if your tool want to switch to the other tool during motion event, you can set next tool by calling [`Tool.safeSetNextToolMode(int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#safeSetNextToolMode-int-).

For example, in [`Pan.onSingleTapConfirmed(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html#onSingleTapConfirmed-android.view.MotionEvent-), it sets next tool to be [`LinkAction`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html) tool as following:

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