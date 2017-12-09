## PDFNet full or standard? Which version is for me?

PDFNet library comes in two versions: full and standard.

In order to help our customers to create applications with a smaller APK size, the standard version omits a number of features such as:

- `Convert`, `Optimizer`, `Redactor`, `Flattener`, `DocumentPreviewCache`, `ReflowProcessor` classes
- PDF/A validation/conversion
- Converting PDF pages to TIFF and PNG formats (i.e. PDFDraw will not work when using these formats)

Rendering speed and quality are the same for both versions of the library.

Here are some situations:

- I want to use the demo utils package `com.pdftron:demo` or `demo.aar`\
Full version

- I need to display non-pdf documents\
Full version

- I need to display documents with reflow\
Full version

- I need to optimize, redact, or flatten PDFs\
Full version

- I need to convert PDF pages to PNG formats\
Full version

- I need to build a file browser that displays all files on a device with first page preview for each\
Full version

- I need right to left support\
Full version

If none of the above fits your situation, you are more than welcome to consult the PDFTron support team so we can find the best option for you.

