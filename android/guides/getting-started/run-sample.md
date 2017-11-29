## Run sample projects

PDFNet ships with three sample projects each containing examples that you could use in your project.

All the samples follow the same steps to run in Android Studio. See steps here:
[Run existing project in Android Studio](/android/guides/faq/run-in-android-studio)

### CompleteReader app

![](img/complete_reader_app.png "CompleteReader")

This app can be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

This app contains two document viewing and editing Activities, `SimpleReaderActivity` and `CompleteReaderActivity`.

`SimpleReaderActivity` is an all-in-one document reader and PDF editor. In addition to PDF files, it also supports viewing of many file extensions such as `.docx`, `.doc`, `.pptx`, `.xlsx`, `.md`, `.cbz` and various image formats. It allows stream conversion of these non-pdf documents to PDF format so you can view the document while conversion happens. In this app, you can read, annotate, sign, share and fill in PDF forms.

`CompleteReaderActivity` has everything in `SimpleReaderActivity`, plus file browsers for local and SD card files. It has example for how you can implement recent and favorite files. It also demonstrates how to use document thumbnails. In addition, it supports file merging, new file creation from styles such as lined, grid, graph and music sheet.

Features:
- [User bookmarks](/android/guides/dialog/user_bookmarks)
- [Outline](/android/guides/dialog/outline)
- [Annotations list](/android/guides/dialog/annotations)
- Sephia mode, night mode and custom color mode
- [Multi-tab viewing](/android/guides/getting-started/using_fragment)
- Page cropping
- [Reflow](/android/guides/controls/reflow)
- Full text search
- Annotation creation and form filling
- PDF creation
- PDF merging, splitting
- [Page thumbnails plus adding, removing, re-organizing, and rotating pages](/android/guides/dialog/thumbnails_view)
- Localization

### MiscellaneousSamples app

This app can be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

This app shows the functionalities of the PDFNet SDK and includes the samples found in the [sample code](http://www.pdftron.com/pdfnet/samplecode.html) page. Inspect its source code to learn how to use some of the main classes and features of the SDK, or just run the sample and check the results.

### PDFDrawDemo app

This app can be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

This app is a simple example that shows how PDFDraw can be used to make a simple PDF viewer. Tap top (bottom) half of the viewer to turn pages backward (forward).