# Creating custom tool

You can create your own customized tool based on the fundamental tool: [Tool](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/Tool.html). [Tool](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/Tool.html) is responsible for creating annotations, or handling annotations when user interacts with [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html). This tutorial helps you create a customized tool.

## Subclass a tool
All of the tool classes defined in PDFViewCtrlTools extend [Tool](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/Tool.html). Your custom tool can also extend `Tool` directly, or you can save time by extending one of the existing tool subclasses, such as [FreehandCreate](http://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/FreehandCreate.html)
```
class CustomTool extends Tool {
  public static int MODE = 1234;
  public CustomTool(PDFViewCtrl ctrl) {
    super(ctrl);
  }

  @Override
  public int getMode() {
    // assign a unique mode number to this tool
    return MODE;
  }
}
```

## Add custom tool to ToolManager
When creating toolManager, add the custom tool to [ToolManager](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.ToolManager.html) so when the next tool mode is the custom tool mode, it can auto generate custom tool class.
```
PDFViewCtrl pdfView = findViewById(R.id.pdfviewctrl);
ToolManager toolManager = new ToolManager(pdfView);
// add custom tool to toolManager
toolManager.addCustomizedTool(new CustomTool(pdfView));
pdfView.setToolManager(toolManager);
```

### Add custom constructor parameter to tool manager
Generally, tools are using [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) as their contructor parameter. If your custom tool requires other parameters, you can add your customized parameter as following:
```
toolManager.addCustomizedTool(new CustomTool(pdfView), param1, param2);
```

### Set custom tool as default tool in ToolManager
If your custom tool is a subclass of [Pan](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/Pan.html) tool and you want to replace the original [Pan](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/Pan.html) tool to be the default tool in tool manager, you can set it as the following:
```
toolManager.setDefaultToolCLass(CustomTool.class);
```

## Switching between tools
To use Custom tools, you can use [ToolManager.setTool](http://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/ToolManager.html#setTool(com.pdftron.pdf.tools.ToolManager.Tool)) to switch to Custom Tool:
```
Button button = findViewById(R.id.button);
button.setOnClickListener(new View.OnClickListener() {
  @Override
  public void onClick(View v) {
    mToolManager.setTool(mToolManager.createTool(CustomTool.MODE, mToolManager.getTool()));
  }
});
```

Alternatively, if your current tool is an instance of [Tool](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/Tool.html), you can also use `Tool.setNextToolModeHelper` to set next tool to be custom tool, and also easily switch to the other tools.

```
((Tool) mToolManager.getTool()).setNextToolModeHelper(CustomTool.MODE);
```

## Example
Custom Tool:
```
public class CustomTool extends Tool {

    public static int MODE = 1234;

    public CustomTool(PDFViewCtrl ctrl) {
        super(ctrl);
    }

    @Override
    public int getMode() {
        return MODE;
    }

    @Override
    public boolean onDown(MotionEvent e) {
        Toast.makeText(mPDFView.getContext(), "Custom Tool onDown called", Toast.LENGTH_LONG).show();
        return super.onDown(e);
    }
}
```
Main Activity:
```
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

## Additional tips
If your custom tool is going to create a new annotation by drawing a shape on page, your custom tool can extend [SimpleShapeCreate]() or one its subclasses that best match your desired behaviour. After that, you can simply override the `createMarkup(PDFDoc doc, Rect bbox)` function for creating your custom annotation.

For instance, If you want to draw a rectangle on page first, and then using that rectangle area to create a signature field. You can create a custom tool by extending [RectCreate]():
```
/**
 * This class is for creating a signature field annotation
 */
public class SignatureFieldCreate extends RectCreate {
    public SignatureFieldCreate(PDFViewCtrl ctrl) {
        super(ctrl);
    }

    @Override
    public int getMode() {
        return ToolManager.e_signature_field; // return a unique tool mode
    }

    // Override this function to return a Widget annotation with field type Field.e_sigature
    @Override
    protected Annot createMarkup(PDFDoc doc, Rect bbox) throws PDFNetException {
        Annot annot =  Widget.create(doc, bbox, doc.fieldCreate("signature", Field.e_signature));
        return annot;
    }
}
```

The following creation tools may help you create custom annotations more easily:

#### [SimeleShapeCreate]():
The subclasses will draw something on page first, and then creates an annotation.

Helpful tools for drawing on page: [RectCreate](), [OvalCreate](), [LineCreate](), [ArrowCreate]()

Example tool: [SignatureFieldCreate]()

#### [TextMarkupCreate]()
It will select the text first, and then creates an annotation. If the annotation created is not [TextMarkup](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/TextMarkup.html), it will creates a rectangle surrounding the selected text.

Example tool: [TextLinkCreate](), [TextUnderlineCreate](https://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/tools/TextUnderlineCreate.html)



