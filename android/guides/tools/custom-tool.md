# Tool
public class [Tool](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html) \
implements [ToolManager.Tool](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.Tool.html)

## Quick start creating an annotation creator tool

### Creates a subclass of Tool
If you are going to creates a tool that is going to creates an annotation by drawing on the page, you can creates a subclass tool listed as following and then overrides [`TextMarkupCreate.createMarkup(PDFDoc, Rect bbox)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html#createMarkup-com.pdftron.pdf.PDFDoc-com.pdftron.pdf.Rect-) and [`Tool.getMode()`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#getMode--) method: 

#### [`TextMarkupCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html)

It selects text and draw  a text loupe first and then creates an annotation.

#### [`RectCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectCreate.html)

It draws a rectangle on document first, and then creates an annotation

#### [`LineCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LineCreate.html)

It draws a line on document first, and then creates an annotation

#### [`OvalCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/OvalCreate.html)

It draws an oval on document first, and then creates an annotaiton

##### Example [TextMarkupCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html)
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
### Register the tool to [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html)

All tools are controlled in [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html). You can add the custom tool to [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) by calling [`ToolManager.addCustomizedTool(Tool)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#addCustomizedTool-com.pdftron.pdf.tools.Tool-)

### Switched to a different tool:
In [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html), you can switch to another tool by calling [`ToolManager.setTool(ToolManager.Tool)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.Tool.html)

##### Example
MainActivity:

```java
PDFViewCtrl mPDFView = (PDFViewCtrl) findViewById(R.id.pdfviewctrl);
ToolManager mToolManager = new ToolManager(mPDFView);
setToolManagerStatusBarHeight();
mPDFView.setToolManager(mToolManager);

// add customized tool
mToolManager.addCustomizedTool(new CustomTool(mPDFView));

// when clicked button, change tool to custom tool
Button button = findViewById(R.id.button);
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        mToolManager.setTool(mToolManager.createTool(CustomTool.MODE, mToolManager.getTool()));
    }
});
```

### Switching tool during motion events (e.g. [`onDown(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#onDown-android.view.MotionEvent-), [`onDoubleTap(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#onDown-android.view.MotionEvent-))

In motion event functions, if one tool set a different tool to be the next tool, that motion event will continue to the next tool.

Here is how [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) controls tool changes in `onDoubleTap` event
```java
  @Override
    public boolean onDoubleTap(MotionEvent e) {
        boolean handled = false;

        if (mTool != null) {
            int prev_tm = mTool.getMode(), next_tm;
            do {
                handled = mTool.onDoubleTap(e);
                next_tm = mTool.getNextToolMode();
                if (prev_tm != next_tm) {
                    mTool = createTool(next_tm, mTool);
                    prev_tm = next_tm;
                } else {
                    break;
                }
            } while (true);
        }

        return handled;
    }
```

So if your tool want to switch to the other tool during motion event, you can set next tool by calling [`Tool.safeSetNextToolMode(int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html#safeSetNextToolMode-int-).

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

## Subclasses hierachy

- [AnnotEdit](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEdit.html)
- [AnnotEditLine](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEditLine.html)
- [DigitalSignature](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/DigitalSignature.html)
- [FormFill](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FormFill.html)
- [FreeTextCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreeTextCreate.html)
- [LinkAction](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html)
- [Pan](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html)
- [RichMedia](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RichMedia.html)
- [Signature](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Signature.html)
- [SimpleShapeCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/SimpleShapeCreate.html)
  - [ArrowCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ArrowCreate.html)
  - [RectCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectCreate.html)
    - [CheckboxFieldCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/CheckboxFieldCreate.html)
    - [RectLinkCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectLinkCreate.html)
    - [SignatureFieldCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/SignatureFieldCreate.html)
    - [TextFieldCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextFieldCreate.html)
  - [Eraser](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Eraser.html)
  - [FreehandCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreehandCreate.html)
  - [LineCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LineCreate.html)
  - [OvalCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/OvalCreate.html)
  - [StickyNoteCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/StickyNoteCreate.html)
- [Stamper](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Stamper.html)
- [TextHighlighter](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlighter.html)
- [TextMarkupCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html)
  - [TextHighlightCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlightCreate.html)
  - [TextSquigglyCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSquigglyCreate.html)
  - [TextStrikeoutCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextStrikeoutCreate.html)
  - [TextUnderlineCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextUnderlineCreate.html)
  - [TextLinkCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextLinkCreate.html)
- [TextSelect](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSelect.html)
  - [AnnotEditTextMarkup](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEditTextMarkup.html)

