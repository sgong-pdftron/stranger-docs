## Run sample projects

PDFNet ships with two sample projects each containing examples that you could use in your project.

You can run any of the sample projects via command line or via Android Studio.

To deploy via command line, simply navigate to the sample's root folder of interest (i.e. `CompleteReader`, or `MiscellaneousSamples`), and run:

Windows:
```shell
.\gradlew.bat appStart
```

Linux:
```shell
gradle appStart
```

To run in Android Studio. See steps here:
[Run existing project in Android Studio](/android/guides/faq/run-in-android-studio)

### CompleteReader app

![](img/complete_reader_app.png "CompleteReader")

This sample is included in the download package.
In addition, this sample can be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

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

This sample is included in the download package.
In addition, this sample can be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

This app shows the functionalities of the PDFNet SDK and includes the samples found in the [sample code](http://www.pdftron.com/pdfnet/samplecode.html) page. Inspect its source code to learn how to use some of the main classes and features of the SDK, or just run the sample and check the results.
