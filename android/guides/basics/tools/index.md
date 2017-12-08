# Tool Overview
[Tool](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html) implements [ToolManager.Tool](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.Tool.html) for handling all events passed from [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html). 
[ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) is a class where controls tool changes in each gesture event. When gesture event triggered on [PDFViewCtrl](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/PDFViewCtrl.html) by [GestureDetector.SimpleOnGestureListener](https://developer.android.com/reference/android/view/GestureDetector.SimpleOnGestureListener.html), [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) passed the gesture events to the [Tool](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Tool.html). If currently holded tool sets a different tool mode as next tool mode, after current tool gesture event finished, [ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) will let the next tool to follow current gesture event.

![tool-flow](./img/tool-flow.png)

[ToolManager](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html) uses [Pan](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html) tool as the default tool where handles almost all user events such as tapping on an annotation, long press to show quick menu, etc. When user tapped on an annotation, [Pan](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html) tool changed to the other annotation handler tool so that tool can handle the tap event. For example, if Pan tool tapped on a [Link](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Link.html) annotation in [`Pan.onSingleTapConfirmed(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html#onSingleTapConfirmed(android.view.MotionEvent)) event, then Pan tool will set the next tool to be [LinkAction](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html) tool. The link annotaiton will be handled by LinkAction tool in [`LinkAction.onSingleTapConfirmed(MotionEvent)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html#onSingleTapConfirmed(android.view.MotionEvent)) function. Besides gesture event defined in [ToolManager.Tool](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.Tool.html) follows the above flow, ToolManager functions also follows the above flow inlcudes: [ToolManager.onQuickMenuClicked(QuickMenuItem)](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#onQuickMenuClicked(com.pdftron.pdf.tools.QuickMenuItem)).

## Initialize ToolManager

To initialize ToolManager for controling tools, you can build it easily through [ToolManagerBuilder](). [ToolManagerBuilder]() is a helper class for constructing ToolManager with xml configuration and also sets ToolManager to PDFViewCtrl. By default, ToolManagerBuilder reads configuration from settings first, if you want to set configuration explicitly, you can add style with the following configuration attributes and put style in ToolManagerBuilder.

#### `edit_ink_annots`

whether editing ink annotation should open the annotation toolbar

format: boolean

default value: false

#### `add_image_stamper_tool`

whether to enable image stamper tool

format: boolean

default value: false

#### `open_toolbar_on_pan_ink_selected`

When editing ink, whether it should open the annotation toolbar

format: boolean

default value: false

#### `build_in_page_number_indicator`

whether to use/show the built-in page number indicator

format: boolean

default value: true

#### `annot_permission_check`

whether to check annotation author permission

format: boolean

default value: false

#### `show_author_dialog`

whether to show author dialog the first time when user annotates

format: boolean

default value: false

#### `text_markup_adobe_hack`

whether the TextMarkup annotations are compatible with Adobe (Adobe's quads don't follow the specification, but they don't handle quads that do)

format: boolean

default value: true

#### `copy_annotated_text_to_note`

whether to copy annotated text to note

format: boolean

default value: false

#### `stylus_as_Pen`

whether to use stylus to draw without entering ink tool

format: boolean

default value: false

#### `ink_smoothing_enabled`

whether to smooth ink annotation

format: boolean

default value: true

#### `night_mode`

whether night mode is enabled

format: boolean

default value: false

#### `auto_select_annotation`

whether auto select annotation after annotation is created

format: boolean

default value: true

#### `sticky_note_popup`

whether show pop up dialog when sticky note is added/ selected/ etc.

format: boolean

default value: true

Example about [PdfViewCtrlTabFragment](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/PdfViewCtrlTabFragment.html) ToolManager configuration style:

```xml
<style name="TabFragmentToolManager">
    <item name="extra_text_select_menu_options">true</item>
    <item name="edit_ink_annots">true</item>
    <item name="add_image_stamper_tool">false</item>
    <item name="open_toolbar_on_pan_ink_selected">true</item>
    <item name="build_in_page_number_indicator">false</item>
</style>
```

Here is how [PdfViewCtrlTabFragment](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/PdfViewCtrlTabFragment.html) set toolmanager in [`onViewCreated(View, Bundle)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/PdfViewCtrlTabFragment.html#onViewCreated(android.view.View,%20android.os.Bundle)) function:

```java
ToolManager mToolManager = ToolManagerBuilder.from(this, R.style.TabFragmentToolManager)
            .build();
```


## Set tool to ToolManager

If you want to set next tool explicitly through ToolManager, you can call [`ToolManager.setTool(ToolManager.Tool)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#setTool(com.pdftron.pdf.tools.ToolManager.Tool))

```java
mToolManager.setTool(mToolManager.createTool(toolMode, mToolManager.getTool()));
```

If you are writing your own [custom tool](android/guides/advanced/custom-tool) and you need to set next tool implicitly in tool motion event as described in [custom tool switch to a different tool](http://localhost:8000/android/guides/advanced/custom-tool#switching-tool-during-motion-events-eg-ondownmotionevent-ondoubletapmotionevent).

## Disable tool in ToolManager

If there are tools that you want to disable in ToolManager so the ToolManager will never switch to those tools. If those tools are annotation creator tools and they appears in [annotation toolbar](/android/guides/basics/annotation-toolbar) or [quick menu](/android/guides/basics/quick-menu), disabling those tools will also removes the corresponding button in annotation toolbar and quick menu. You can disable tools by calling [`ToolManager.disableToolMode(int[])`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ToolManager.html#disableToolMode(int[]))

```java
mToolManager.disableToolMode(new int[]{ToolManager.e_link_action, ToolManager.e_text_highlight});
```

## Tool Subclasses hierachy

- [`AnnotEdit`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEdit.html): Responsible for editing a selected annotation, e.g., moving and resizing. 
- [`AnnotEditLine`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEditLine.html): Responsible for editing a selected line or arrow, e.g., moving and resizing. 
- [`DigitalSignature`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/DigitalSignature.html): The purpose of this tool is to demonstrate how to digitally sign a document by using one of its signature fields. 
- [`FormFill`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FormFill.html): Responsible for filling forms. 
- [`FreeTextCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreeTextCreate.html): Responsible for creating [FreeText](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/FreeText.html) annotation
- [`LinkAction`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LinkAction.html): Responsible for jumping to corresponding link if single tapped on [Link](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Link.html) annotation
- [`Pan`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Pan.html): Pan tool implements the following functions: 1. Select the hit annotation and switch to annotation edit tool on single tap event; 2. Bring up annotation creation menu upon long press event. 
- [`RichMedia`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RichMedia.html): Responsible for play video when tap on the annotation with [RichMedia](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Annot.html#e_RichMedia) annotation.
- [`Signature`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Signature.html): Responsible for creating [Signature](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Annot.html#e_Stamp) annotation. 
- [`SimpleShapeCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/SimpleShapeCreate.html): The base class for several shape creation classes, e.g., LineCreate, OvalCreate, etc. 
    - [`ArrowCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ArrowCreate.html): 	This class is for creating an arrow. 
    - [`RectCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectCreate.html): This class is for creating a rectangle annotation. 
        - [`CheckboxFieldCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/CheckboxFieldCreate.html): This class is for creating [checkbox field](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Field.html#e_check)
        - [`RectLinkCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectLinkCreate.html): Used for creating rectangle [Link](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Link.html) annotation
        - [`SignatureFieldCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/SignatureFieldCreate.html): This class is for creating a [signature field](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Field.html#e_signature) annotation  
        - [`TextFieldCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextFieldCreate.html): 	This class is for creating [text field](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Field.html#e_textt) 
    - [`Eraser`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Eraser.html): 	This class is for erasing [Ink](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Ink.html) annotation. 
    - [`FreehandCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreehandCreate.html): 	This class is for creating an [Ink](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Ink.html) annotation. 
    - [`LineCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LineCreate.html): 	This class is for creating a [line](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Line.html) annotation. 
    - [`OvalCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/OvalCreate.html): 	This class is for creating a [circle](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Circle.html) annotation. 
    - [`StickyNoteCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/StickyNoteCreate.html): This class is for creating a [sticky note](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Text.html) annotation. 
    - [`Stamper`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Stamper.html): Responsible for creating [Stamper](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Annot.html#e_Stamp) annotation. 
- [`TextHighlighter`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlighter.html): This class can be used to highlight all search results. 
- [`TextMarkupCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html): This class is the base class for all text markup creation tools. 
    - [`TextHighlightCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlightCreate.html)
    - [`TextSquigglyCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSquigglyCreate.html): This class is for creating [text highlight](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Highlight.html) annotation. 
    - [`TextStrikeoutCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextStrikeoutCreate.html): This class is for creating [text strikeout](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/StrikeOut.html) annotation. 
    - [`TextUnderlineCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextUnderlineCreate.html): This class is for creating [text underline](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Underline.html) annotation. 
    - [`TextLinkCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextLinkCreate.html): This class is for creating [Link](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Link.html) annotation based on selected text bounding box.
- [`TextSelect`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSelect.html): This class selects text on pages. 
  - [`AnnotEditTextMarkup`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEditTextMarkup.html): This class is responsible for editing text markup: highlight/strikeout/underline, e.g., moving and resizing. 







