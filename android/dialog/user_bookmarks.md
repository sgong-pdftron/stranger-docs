# User bookmark dialog fragment

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