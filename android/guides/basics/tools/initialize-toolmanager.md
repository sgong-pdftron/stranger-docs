
# Initialize ToolManager

To initialize ToolManager for controlling tools, you can build it easily through [ToolManagerBuilder](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/config/ToolManagerBuilder.html). [ToolManagerBuilder](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/config/ToolManagerBuilder.html) is a helper class for constructing ToolManager with style resource configuration, it also sets ToolManager to PDFViewCtrl. By default, ToolManagerBuilder reads configuration from settings first, if you want to set configuration explicitly, you can add style with the following configuration attributes and then put style in ToolManagerBuilder by calling [`ToolManagerBuilder.from(PDFViewCtrl, @StyleRes int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/config/ToolManagerBuilder.html#from(com.pdftron.pdf.PDFViewCtrl,%20int)).

You can add the following customization in your `styles.xml` file:

```xml
<style name="TabFragmentToolManager">
    <!-- open the annotation toolbar when editing ink annotaiton -->
    <item name="edit_ink_annots">true</item>
    <!-- disable image stamper tool -->
    <item name="add_image_stamper_tool">false</item>
    <!-- when ink selected in annotation toolbar, it should open it's own ink toolbar -->
    <item name="open_toolbar_on_pan_ink_selected">true</item>
    <!--hide build in page nuber indicator -->
    <item name="build_in_page_number_indicator">false</item>
</style>
```

And then initialize ToolManager as following:

```java
ToolManager mToolManager = ToolManagerBuilder.from(this, R.style.TabFragmentToolManager).build();
```

## XML style attributes
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

