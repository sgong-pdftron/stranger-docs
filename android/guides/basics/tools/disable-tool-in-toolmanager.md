
# Disable tool in ToolManager

If there are tools that you want to disable in ToolManager so the ToolManager will never switch to those tools. In addition, the disabled tool will not be displayed in annotation toolbar or quick menu. You can disable tools by calling [`ToolManager.disableToolMode(int[])`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#disableToolMode(int[]))

```java
// disable LinkAction tool, text highlight tool
mToolManager.disableToolMode(new int[]{ToolManager.e_link_action, ToolManager.e_text_highlight});
```