BookmarksDialogFragment

BookmarksDialogFragment provides a horizontal layout to display the following items in separate tabs:

   * user-defined bookmarks

   * document outline

   * annotations

<p align="center"><img src="gif/bookmarks.gif?raw=true" width="32%"></p>

To create a new instance of the bookmarks dialog fragment call
```android
BookmarksDialogFragment bookmarksDialogFragment = BookmarksDialogFragment.newInstance();
```
and setup the dialog:
```android
bookmarksDialogFragment.setPdfViewCtrl(pdfViewCtrl)
.setDialogFragmentTabs(dialogFragmentTabs);
```
where DialogFragmentTab specifies the information about each tab including the type of class and the tab tag.


| Dialog           | Type of class                    | Tab tag            |
|------------------|----------------------------------|--------------------|
| annotations      | AnnotationDialogFragment.class   | TAG_TAB_ANNOTATION |
| document outline | OutlineDialogFragment.class      | TAG_TAB_OUTLINE    |
| user bookmarks   | UserBookmarkDialogFragment.class | TAG_TAB_BOOKMARK   |

The following example shows how to display an annotations list, a document outline and a user-defined bookmark list tabs in BookmarksDialogFragment:

```android
BookmarksDialogFragment showBookmarksDialog(FragmentManager fragmentManager, PDFViewCtrl pdfViewCtrl) {
    DialogFragmentTab annotationsDialog = new DialogFragmentTab(
        AnnotationDialogFragment.class,
        BookmarksTabLayout.TAG_TAB_ANNOTATION,
        null,
        "Annotations",
        "Bookmarks Dialog",
        null);
    DialogFragmentTab outlineDialog = new DialogFragmentTab(
        UserBookmarkDialogFragment.class,
        BookmarksTabLayout.TAG_TAB_OUTLINE,
        null,
        "Outline",
        "Bookmarks Dialog",
        null);
    DialogFragmentTab userBookmarksDialog = new DialogFragmentTab(
        UserBookmarkDialogFragment.class,
        BookmarksTabLayout.TAG_TAB_BOOKMARK,
        null,
        "User Bookmarks",
        "Bookmarks Dialog",
        null);
    ArrayList<DialogFragmentTab> dialogFragmentTabs = new ArrayList<>();
    dialogFragmentTabs.add(annotationsDialog);
    dialogFragmentTabs.add(outlineDialog);
    dialogFragmentTabs.add(userBookmarksDialog);
    BookmarksDialogFragment bookmarksDialog = BookmarksDialogFragment.newInstance();
    bookmarksDialog.setPdfViewCtrl(pdfViewCtrl)
        .setDialogFragmentTabs(dialogFragmentTabs)
        .setBookmarksDialogListener(this)
        .setBookmarksTabsListener(this);
    bookmarksDialog.setStyle(DialogFragment.STYLE_NO_TITLE, R.style.CustomAppTheme);
    bookmarksDialog.show(fragmentManager, "bookmarks_dialog");
    return bookmarksDialog;
}

@Override
public void onBookmarksDialogDismissed(int tabIndex) {
    // the bookmarks dialog was dismissed
}

@Override
public void onUserBookmarkClick(int pageNum) {
    // a user bookmark was clicked
}
@Override
public void onOutlineClicked(Bookmark parent, Bookmark bookmark) {
    // an outline was clicked
}

@Override
public void onAnnotationClicked(Annot annotation, int pageNum) {
    // an annotation was clicked
}

@Override
public void onExportAnnotationsClicked() {
    // the export annotation button was clicked
}
```

================================

UserBookmarkDialogFragment

This class shows a list of user-defined bookmarks that can be used to navigate through the document. The user-defined bookmarks are PDFTron specific features that may not be shown in other PDF viewers apps. If you want to manage PDF bookmarks so that they can be processed in other standard PDF viewers, see OutlineDialogFragment.

<p align="center"><img src="img/user_bookmarks.png?raw=true" width="32%"></p>

To create a new instance of the user bookmark dialog fragment call `newInstance()` and set the PDFViewCtrl: 
```android
UserBookmarkDialogFragment showUserBookmarkDialog(FragmentManager fragmentManager, PDFViewCtrl pdfViewCtrl) {
    UserBookmarkDialogFragment userBookmarkDialogFragment = UserBookmarkDialogFragment.newInstance();
    userBookmarkDialogFragment.setPdfViewCtrl(pdfViewCtrl);
    userBookmarkDialogFragment.setStyle(DialogFragment.STYLE_NO_TITLE, R.style.CustomAppTheme);
    userBookmarkDialogFragment.show(fragmentManager, "user_bookmarks_dialog");
    return userBookmarkDialogFragment;
}
```

You should set a listener via `setUserBookmarkListener(UserBookmarkDialogListener)` to be notified when a user bookmark is clicked.

If the document has write access, users can add new user bookmarks using floating action button. To specify whether the document is read-only call 
```android
setReadOnly(boolean)
```

============================
OutlineDialogFragment

This class shows a a document outline (bookmarks) that can be used to navigate through the document being viewed by a PDFViewCtrl.

<p align="center"><img src="img/outline.png?raw=true" width="32%"></p>

user_bookmarks
To create a new instance of the outline dialog fragment call `newInstance()` and set the PDFViewCtrl: 
```android
OutlineDialogFragment showOutlineDialog(FragmentManager fragmentManager, PDFViewCtrl pdfViewCtrl) {
    OutlineDialogFragment outlineDialogFragment = OutlineDialogFragment.newInstance();
    outlineDialogFragment.setPdfViewCtrl(pdfViewCtrl);
    outlineDialogFragment.setStyle(DialogFragment.STYLE_NO_TITLE, R.style.CustomAppTheme);
    outlineDialogFragment.show(fragmentManager, "outline_dialog");
    return outlineDialogFragment;
}
```

You can also sets the current bookmark using 
```android
setCurrentBookmark(Bookmark)
```

You should set a listener via `setOutlineDialogListener(OutlineDialogListener)` to be notified when an outline is clicked.

==================================
AnnotationDialogFragment


This class shows a list of all the annotations in a document being viewed by a PDFViewCtrl. The list will contain any comments that have been added to the annotations.

<p align="center"><img src="img/annotations.png?raw=true" width="32%"></p>

To create a new instance of the annotation dialog fragment call `newInstance()` and set the PDFViewCtrl: 
```android
AnnotationDialogFragment showAnnotationDialog(FragmentManager fragmentManager, PDFViewCtrl pdfViewCtrl) {
    AnnotationDialogFragment annotationDialogFragment = AnnotationDialogFragment.newInstance();
    annotationDialogFragment.setPdfViewCtrl(pdfViewCtrl);
    annotationDialogFragment.setStyle(DialogFragment.STYLE_NO_TITLE, R.style.CustomAppTheme);
    annotationDialogFragment.show(fragmentManager, "outline_dialog");
    return annotationDialogFragment;
}
```

You should set a listener via `setAnnotationDialogListener(AnnotationDialogListener)` to be notified when an annotation item is clicked, or when document annotations are exported to a PDF doc when users click on the export floating action button.

If the document has write access, users can delete existing annotations by long-pressing on the annotation. To specify whether the document is read-only call 
```android
setReadOnly(boolean)
```
