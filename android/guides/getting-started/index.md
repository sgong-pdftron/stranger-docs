## Run sample projects

**If you are interested in trying out the sample activities in your application directly, check out [this article](/android/guides/getting-started/try-demo) instead.**

PDFNet ships with two sample projects each containing examples that you could use in your project. Both samples are included in the download package under `\samples` folder.

You can run any of the sample projects both via command line and/or via Android Studio.

First, add your PDFNet license key into `gradle.properties` file in the root folder of the sample project of interest (i.e. `\samples\CompleteReader\gradle.properties` or `\samples\MiscellaneousSamples\gradle.properties`):

```
PDFTRON_LICENSE_KEY=YOUR_PDFNET_LICENSE_KEY_GOES_HERE
```

### Via command line

To deploy via command line, simply navigate to the root folder of the sample project of interest (i.e. `\samples\CompleteReader`, or `\samples\MiscellaneousSamples`), have one device or emulator running, then run the following command:

Windows:
```shell
.\gradlew.bat appStart
```

Mac:
```shell
gradle appStart
```

If encountered any errors, please make sure you have [Homebrew](https://brew.sh/) and gradle installed and its version is above `Gradle 4.1`, if not:
```shell
brew update && brew install gradle
```

### Via Android Studio

To deploy via Android Studio. See steps here:
[Run existing project in Android Studio](/android/guides/faq/run-in-android-studio).

### CompleteReader app

<img alt='CompleteReader image' src='img/complete_reader_app.png' width='300' />

This sample can also be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

This app contains two document viewing and editing activities, `SimpleReaderActivity` and `CompleteReaderActivity`.

`SimpleReaderActivity` is an all-in-one document reader and PDF editor. In addition to PDF files, it also supports viewing of other file extensions such as `.docx`, `.doc`, `.pptx`, `.xlsx`, `.md`, `.cbz` and various image formats. It allows stream conversion of these non-pdf documents to PDF format so you can view the document while conversion happens. In this app, you can read, annotate, sign, fill in PDF forms and more. See detailed features list below.

`CompleteReaderActivity` has everything in `SimpleReaderActivity`, plus file browsers for local and SD card files. It has example for how you can implement recent and favorite files. It also demonstrates how to use document thumbnails. In addition, it supports file merging, new file creation from styles such as lined, grid, graph and music sheet. See detailed features list below.

Features:
- [Multi-tab viewing](/android/guides/getting-started/using_fragment)
- [Annotation creation and form filling](/android/guides/basics/tools)
- [Quick menu](/android/guides/basics/quick-menu)
- [Annotation toolbar](/android/guides/basics/annotation-toolbar)
- [Thumbnail slider](/android/guides/basics/thumbnail-slider)
- [Annotations list](/android/guides/basics/annotations)
- [Outline list](/android/guides/basics/outline)
- [User bookmarks list](/android/guides/basics/user_bookmarks)
- [Page thumbnails with add, duplicate, remove, re-organize, rotate and export pages](/android/guides/basics/thumbnails_view)
- [PDF page creation](/android/guides/basics/add_page)
- [PDF page rotation](/android/guides/basics/rotate_pages)
- [Reflow](/android/guides/basics/reflow)
- [Undo and redo](/android/guides/basics/undo-redo)
- Night mode, sephia mode and custom color mode
- Page cropping
- Full text search
- PDF merging
- Localization

### MiscellaneousSamples app

This sample can also be downloaded from `GITHUB-CLONE-LINK-GOES-HERE`.

This app shows the functionalities of the PDFNet SDK and includes the samples found in the [sample code](http://www.pdftron.com/pdfnet/samplecode.html) page. Inspect its source code to learn how to use some of the main classes and features of the SDK, or just run the sample and check the results.
