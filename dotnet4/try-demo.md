# How to Run Samples

1. Double click one of the `.sln` files in `Samples` folder.
1. Hit `F5` or click `Start` from Visual Studio, to run the default sample.
1. The default sample should have run fine (exit code 0). If not please see the FAQ.

You are now ready to run different samples. Note that samples are grouped into `CSharp` and `VisualBasic` folders for ease.

## Document Viewing Samples

PDFNet for .Net4+ includes a number of samples that show document viewing, using one of two viewer classes, [`PDFViewCtrl`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_PDFViewCtrl.htm) and [`PDFViewWPF`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_PDFViewWPF.htm).

PDFNet currently offers two document viewers for .Net, which while offering different interfaces, they do use the same rendering technology, so rendering and performances are the same. 

### PDFViewCtrl

This is an older, WinForms based, viewer class. It includes a number of build in controls (such as print dialog, watermarking, insert/delete/rotate pages, etc.).

Run either the `CSharp/PDFVewSimpleTest` or `CSharp/PDFViewTest` projects.

### PDFViewWPF

This is the newer viewer which offers full cusomtization over the user experience. All code and artwork, related to user interaction is available for you to modify, extend, or replace as you see fit. This is accomplished with the `CSharp/PDFViewWPFTools` project.

Run either the `CSharp/PDFVewWPFSimpleTest` or `CSharp/PDFViewWPFTest` projects, both of which use the `CSharp/PDFViewWPFTools` project.

## Miscellaneous Samples

The rest of the samples, in the `CSharp` and `VisualBasic` folders, show how to accomplish various tasks using the `PDFNet` API. Select any as the startup project and select `Run`.

All logging for these is printed out to the Console, and all file output is in `Samples/TestFiles/Output` folder.

The following samples are avaiable.

### AddImage
This sample illustrates how to embed various raster image formats (e.g. TIFF, JPEG, JPEG2000, JBIG2, GIF, PNG, BMP, etc.) in a PDF document.

### Annotation
Shows how to add a text annotation to an existing page and how to create link annotations between several pages:

### Bookmarks
The sample code illustrates how to read and edit existing outline items and create new bookmarks using the high-level API.

### ContentReplacer
This sample shows how to use [`ContentReplacer`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_ContentReplacer.htm) to search and replace text strings and images in existing PDF (e.g. business cards and other PDF templates). Unlike PDF forms, the ContentReplacer works on actual PDF content and is not limited to static rectangular annotation regions.

### Convert
This sample shows how to use PDFNet Convert Add-on (i.e. [`Convert`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_Convert.htm) class) for direct, high-quality conversion between PDF, XPS, EMF, SVG, TIFF, PNG, JPEG, and other image formats. The sample also shows how to convert any printable document (e.g. Word, HTML, RTF, MS Office, DXF, DWG, etc) to PDF or XPS using a universal document converter.

### DigitalSignatures
Demonstrates the basic usage of high-level digital signature API to digitally sign and/or certify PDF documents.

### ElementBuilder
Illustrates how to use PDFNet page writing API, how to embed fonts and images and how to copy graphical elements from one page to another.

### ElementEdit
The sample code shows how to edit the page display list and how to modify graphics state attributes on existing Elements. In particular the sample program strips all images from the page and changes text color to blue.

### ElementReaderAdv
The sample shows how to use some of more advanced PDFNet features. The sample code illustrates how to extract text, paths, and images. The sample also shows how to do color conversion, image normalization, and how to process changes in the graphics state.

### ElementReader
Illustrates how to traverse page display list using [`ElementReader`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_ElementReader.htm).

### Encryption
Illustrates encryption support in PDFNet. The sample code reads an encrypted document and sets a new [`SecurityHandler`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_SDF_SignatureHandler.htm).

### FDF
PDFNet includes a full support for FDF (Forms Data Format) and capability to merge/extract forms data (FDF) with/from PDF. The sample illustrates basic FDF merge/extract functionality available in PDFNet.

### HTML2PDF
The sample shows how to directly convert HTML pages to PDF using [`HTML2PDF`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_HTML2PDF.htm), which is part of separately licensable PDFNet Convert Add-On. HTML2PDF converter supports HTML conversion from a string or URL and offers many options to control page size and formating.

### ImageExtract
This sample illustrates couple of approaches to PDF image extraction.

### Imposition
The sample illustrates how multiple pages can be combined/imposed using PDFNet. Page imposition can be used to arrange/order pages prior to printing or to assemble a 'master' page from several 'source' pages. Using PDFNet API it is possible to write applications that can re-order the pages such that they will display in the correct order when the hard copy pages are compiled and folded correctly.

### InteractiveForms
The sample illustrates some basic PDFNet capabilities related to interactive forms (also known as AcroForms).

### JBIGTest
The sample project illustrates how to recompress bi-tonal (black and white) images in existing PDF documents using JBIG2 compression. The sample is intended to show how to specify hint information for image encoder and is not meant to be a generic PDF optimization tool. PDFNet supports both loss-less and lossy JBIG2 compression. To give you a feeling of compression rates possible with PDFNet we re-compressed a document containing 17 scanned pages. The original input document is ~1.4MB and is using standard CCITT Fax compression. Loss-less JBIG2 compression shrunk down the file to 641KB. Lossy JBIG2 compression shrunk down the file to 176KB.

### LogicalStructure
This sample explores the structure and content of a tagged PDF document and dumps the structure information to the console window.

### Multithreaded
illustrates how to use PDFDoc locking mechanisms to access the document concurrently. PDFDoc uses a recursive shared lock model. Multiple threads can read the document at the same time, but only one thread can write to the document. A given thread can acquire as many locks of the same type as it wants, in a recursive fashion.

### Optimizer
The sample shows how to use [`Optimizer`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_Optimizer.htm) to reduce PDF file size by reducing the file size, removing redundant information, and compressing data streams using the latest in image compression technology. 'Optimizer' is an optional Add-On to PDFNet Core SDK.

### PageLabels
This example illustrates how to work with PDF page labels. PDF page labels can be used to describe a page. This is used to allow for non-sequential page numbering or the addition of arbitrary labels for a page (such as the inclusion of Roman numerals at the beginning of a book).

### Pattern
This example illustrates how to create various PDF patterns and shadings.
 
PDF/A
This sample illustrates how to use PDF/A add-on to validate existing PDF documents for PDF/A compliance as well as to convert generic PDF documents to PDF/A format.

### PDFDC
This sample shows how to create and use `PDFDC` (i.e. a PDF Device Context). Windows developers can use standard GDI or GDI+ API-s to write on PDFDC and to generate PDF documents based on their existing drawing functions. PDFDC can also be used to implement file conversion from any printable file format to PDF.

### PDFDocMemory
The sample illustrates how to read/write a PDF document from/to memory buffer. This is useful for applications that work with dynamic PDFdocuments that don't need to be saved/read from a disk.

### PDFDraw
This sample illustrates how to use the built-in rasterizer in order to render PDF images on the fly and how to save resulting images in PNG and JPEG format.

### PDFLayers
This sample demonstrates how to create PDF layers (also known as Optional Content Groups - OCGs). The sample also shows how to extract and render PDF layers.

### PDFPackage
This sample illustrates how to create, extract, and manipulate PDF Packages (also known as PDF Portfolios).

### PDFPage
The sample illustrates how to copy pages from one document to another, how to delete, and re-arrange pages and how to use ImportPages() method for very efficient copy and merge operations.

### PDFPrint
This sample illustrates how to print PDF document using currently selected default printer. It is possible to use PDFNet printing functionality in both client and server applications without dependance on any third party components.

### PDFRedact
The sample shows how to use ['Redactor'](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_Redactor.htm) to remove potentially sensitive content within PDF documents. PDFTron Redactor makes sure that if a portion of an image, text, or vector graphics is contained in a redaction region, that portion is destroyed and is not simply hidden with clipping or image masks.

### Rect
Shows how to change Page's MediaBox using Rect class.

### SDF
The sample illustrates how to use basic Cos/SDF API to edit an existing document.

### Stamper
The sample shows how to use [`Stamper`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_Stamper.htm) utility class to stamp PDF pages with text, images, or with other PDF pages. ElementBuilder and ElementWriter should be used for more complex PDF stamping operations.

### TextExtract
The sample illustrates the basic text extraction capabilities of PDFNet.

### TextSearch
This sample shows how to use `TextSearch` to search text on PDF pages using regular expressions. TextSearch utility class builds on functionality available in TextExtractor to simplify most common search operations.

### U3D
This example illustrates how to embed U3D content (3 dimensional models) in PDF.

### UnicodeWrite
An example illustrating how to create Unicode text and how to embed composite fonts.

### WebViewerConvert
These samples shows how to use integrate PDFNet WebViewer into any HTML5, Silverlight, or Flash web application.
The sample is using [`Convert.ToXod()`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/M_pdftron_PDF_Convert_ToXod_7.htm) to convert/stream PDF, XPS, MS Office, RTF, HTML and other document formats to WebViewer
[`Convert.ToXod()`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/M_pdftron_PDF_Convert_ToXod_7.htm) is an optional Add-On to the Core SDK and is part of PDFNet WebViewer Publishing Platform.

### WebViewerStreaming
Similar to previous sample, but using ASP.Net to stream [`Convert.ToXod()`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/M_pdftron_PDF_Convert_ToXod_1.htm) conversion to an HTTP response.

### WordToPDF
These samples illustrate how to use the [`Convert`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_Convert.htm) utility class to convert DOCX files to PDF. This conversion is performed entirely within PDFNet and has no external or system dependencies dependencies. Conversion results will be the same on all platforms.

### XAML2PDF
This example shows how to use PDFNet [`Convert`](http://www.pdftron.com/pdfnet/docs/PDFNet/?topic=html/T_pdftron_PDF_Convert.htm) Add-on to dynamically generate PDF or XPS directly from a FlowDocument, XAML, or WPF. Converting XAML/FlowDocument to PDF is not only easy, but is also very flexible in terms of how content is paginated and flowed into a fixed document such as PDF or XPS.
