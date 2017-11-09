# Creating Custom Tool

You can create your own customized tool based on the fundamental tool: [Tool](). [Tool]() is responsible to creating annotations or handling annotations when user interacts with [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html). This tutorial helps you create a customized tool.

## Subclass a Tool
All the tool class defined in PDFViewCtrlTools extend [Tool](). Your custom tool can also extent Tool directly, or you can save time by extending one of the existing tool subclasses, such as [RectCreate]()
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
If your custom tool is a subclass of [Pan]() tool and you want to replace the original [Pan]() tool to be the default tool in tool manager, you can set it as the following:
```
toolManager.setDefaultToolCLass(CustomTool.class);
```

## Switching between tools
Tools are automatically switching to next tool by protected field `mNextToolMode` in [Tool](). To change the next tool mode to custom tool mode, you need to call [currentTool.setNextToolModeHelper(int nextToolMode)]()
```
Button button = findViewById(R.id.button);
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        ((Tool)mToolManager.getTool()).setNextToolModeHelper(CustomTool.MODE);
    }
});
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
        ((Tool)mToolManager.getTool()).setNextToolModeHelper(CustomizedTool.MODE);
    }
});
```