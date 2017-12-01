# Rotate pages dialog

Rotate pages dialog allows users to rotate pages of the document by 90, 180 and 270 degree with ease while they see the thumbnail of the current page as they rotate pages.

![](https://github.com/sgong-pdftron/stranger-docs/blob/master/android/guides/dialog/gif/rotate_pages.gif?raw=true "Rotate pages")

## Implementation

To create a new instance of the rotate pages dialog fragment call `newInstance()` and setup the dialog:

```java
void openRotatePagesDialog(@NonNull FragmentManager fragmentManager, @NonNull PDFViewCtrl pdfViewCtrl) {
    RotateDialogFragment.newInstance()
        .setup(pdfViewCtrl, pdfViewCtrl.getCurrentPage())
        .show(fragmentManager, "rotate_dialog");
}
```