# Tool styles
When creating annotations, each annotation has default color and styles which is defined by the tool. For example, when creating [Square](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdftron/PDF/Annots/Square.html) annotation in [RectCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectCreate.html) tool, by default, it will draw a rectangle with red border and fill with transparent color. These default colors can be easily override.

## Table of Contents  
1. [Default styles attributes](#default-styles-attributes)
2. [Override existing tool default style](#override-existing-tool-default-style)
3. [Add customized tool default style](#add-customized-tool-default-style)

## Default styles attributes
####`annot_color`
default color when creating annotation. For annotation that has [`annot_fill_color`](#annot_fill_color), it represents stroke color.

format: color

####`annot_color_2`
default color option 2, often used in color presets, for example, annotation toolbar of **ink** tool has 5 presets, they are defined in [`annot_color_2`](#annot_color_2), [`annot_color_3`](#annot_color_3), [`annot_color_4`](#annot_color_4), [`annot_color_5`](#annot_color_5), 

format: color

#### `annot_color_3`
default color option 3, often used in color presets

format: color

#### `annot_color_4`
default color option 4, often used in color presets

format: color

#### `annot_color_5`
default color option 5, often used in color presets

format: color

#### `annot_fill_color`

default annotation fill color, used for annotations that has fill color: [Square](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Square.html) and [Circle](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Square.html)

format: color

#### `annot_font_size`
default anotation font size, used in [`ToolManager.e_text_create`]() tool

format: int

#### `annot_thickness`
default thickness

format: float

#### `annot_thickness_max`
default maximum thickness

format: float

#### `annot_thickness_min`
default minimum thickness

format: float

#### `annot_font`
default font

format: string

#### `annot_opacity`
default annotation opacity

format: float

#### `annot_icon`
default annotation icon, used in [`ToolManager.e_text_annot_create`]() tool

format: float

## Override existing tool default style
The following table are default exisitng styles for corresponding tool:

| Tool                                | style resource                       |
|-------------------------------------|--------------------------------------|
| [TextHighlightCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlightCreate.html)    | `R.style.HighlightAnnotationProperty`  |
| [TextUnderlineCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextUnderlineCreate.html)     | `R.style.TextMarkupAnnotationProperty` |
|  [TextStrikeoutCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextStrikeoutCreate.html)    | `R.style.TextMarkupAnnotationProperty` |
| [TextSquigglyCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSquigglyCreate.html)     | `R.style.TextMarkupAnnotationProperty` |
| [RectLinkCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectLinkCreate.html)         | `R.style.TextMarkupAnnotationProperty` |
| [FreeTextCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreeTextCreate.html)      | `R.style.FreeTextAnnotationProperty`   |
| [StickyNoteCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/StickyNoteCreate.html) | `R.style.NoteAnnotationProperty`       |
| [Signature](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Signature.html)        | `R.style.SignaturetAnnotationProperty` |
| [FreehandCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreehandCreate.html)       | `R.style.FreehandAnnotationProperty`   |
| other                               | `R.style.ShapeAnnotationProperty`      |

The following example will override the color presets for [FreehandCreate](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreehandCreate.html) tool

```xml
<style name="FreehandAnnotationProperty" parent="ShapeAnnotationProperty">
    <item name="annot_color">@color/xodo_light_blue</item>
    <item name="annot_color_2">@color/page_number_indicator_bg</item>
    <item name="annot_color_3">@color/red</item>
    <item name="annot_color_4">@color/orange</item>
    <item name="annot_color_5">@color/purple</item>
</style>
```

## Add customized tool default style
Alternatively, You can also add your customized tool default style resource by calling [`ToolStyleConfig.getInstance().addDefaultStyleMap(int, @StyleRes int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/config/ToolStyleConfig.html#addDefaultStyleMap(int,%20int)):

```java
ToolStyleConfig.getInstance().addDefaultStyleMap(ToolManager.e_rect_create, R.style.rectangle_style);
```