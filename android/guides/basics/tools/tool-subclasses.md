
# Tool Subclasses hierachy

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
    - [`ArrowCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/ArrowCreate.html): 	Responsible for creating an arrow. 
    - [`RectCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectCreate.html): Responsible for creating a rectangle annotation. 
        - [`CheckboxFieldCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/CheckboxFieldCreate.html): Responsible for creating [checkbox field](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Field.html#e_check)
        - [`RectLinkCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/RectLinkCreate.html): Used for creating rectangle [Link](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Link.html) annotation
        - [`SignatureFieldCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/SignatureFieldCreate.html): Responsible for creating a [signature field](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Field.html#e_signature) annotation  
        - [`TextFieldCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextFieldCreate.html): 	Responsible for creating [text field](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Field.html#e_textt) 
    - [`Eraser`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Eraser.html): 	Responsible for erasing [Ink](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Ink.html) annotation. 
    - [`FreehandCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/FreehandCreate.html): 	Responsible for creating an [Ink](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Ink.html) annotation. 
    - [`LineCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/LineCreate.html): 	Responsible for creating a [line](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Line.html) annotation. 
    - [`OvalCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/OvalCreate.html): 	Responsible for creating a [circle](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Circle.html) annotation. 
    - [`StickyNoteCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/StickyNoteCreate.html): Responsible for creating a [sticky note](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Text.html) annotation. 
    - [`Stamper`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/Stamper.html): Responsible for creating [Stamper](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/Annot.html#e_Stamp) annotation. 
- [`TextHighlighter`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlighter.html): Can be used to highlight all search results. 
- [`TextMarkupCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextMarkupCreate.html): Responsible the base class for all text markup creation tools. 
    - [`TextHighlightCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextHighlightCreate.html)
    - [`TextSquigglyCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSquigglyCreate.html): Responsible for creating [text highlight](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Highlight.html) annotation. 
    - [`TextStrikeoutCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextStrikeoutCreate.html): Responsible for creating [text strikeout](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/StrikeOut.html) annotation. 
    - [`TextUnderlineCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextUnderlineCreate.html): Responsible for creating [text underline](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Underline.html) annotation. 
    - [`TextLinkCreate`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextLinkCreate.html): Responsible for creating [Link](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/annots/Link.html) annotation based on selected text bounding box.
- [`TextSelect`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/TextSelect.html): Selects text on pages. 
  - [`AnnotEditTextMarkup`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/AnnotEditTextMarkup.html): Responsible responsible for editing text markup: highlight/strikeout/underline, e.g., moving and resizing. 







