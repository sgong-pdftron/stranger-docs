# Using a Fragment

All activities related to the PDF viewer is handled through the PdfViewCtrlTabHostFragment fragment. This host fragment extends `android.support.v4.app.Fragment` and is responsible for showing document tabs.

![](https://github.com/sgong-pdftron/stranger-docs/blob/master/android/guides/basics/gif/host-fragment.gif?raw=true "Host Fragment")

Showing the Host fragment in an activity is straightforward, just like any other fragment make an instance of the class and attach it to the activity:

```java
PdfViewCtrlTabHostFragment mPdfViewCtrlTabHostFragment;

void startTabHostFragment(Bundle args) {
	if (mPdfViewCtrlTabHostFragment == null) {
		mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
	}
	FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
	ft.replace(R.id.fragment_container, mPdfViewCtrlTabHostFragment, null);
	ft.commit();
}
```

The `args` specifies the document that should be shown when the host fragment is visible. You are encouraged to use `createBasicPdfViewCtrlTabBundle` for creating the host bundle. For example, to open a document in the host fragment when you know the URI of the file and its password if the file is password protected you should call `openDocument()`:

```java
void openDocument(@NonNull Uri fileUri, String password) {
	Bundle tabHostBundle = PdfViewCtrlTabFragment.createBasicPdfViewCtrlTabBundle(this, fileUri, password);
	startTabHostFragment(tabHostBundle);
}
```
or you can have a specific function for opening files existing in internal storage:

```java
void openInternalDocument(@NonNull File file, String password) {
	String tag = file.getAbsolutePath();
	String title = file.getName();
	String fileExtension = FilenameUtils.getExtension(tag);
	Bundle tabHostBundle = PdfViewCtrlTabFragment.createBasicPdfViewCtrlTabBundle(
		tag, title, fileExtension, password, FileInfo.FILE_TYPE_FILE);
	startTabHostFragment(tabHostBundle);
}
```

Note that since we use support version of android fragment, your activity must extend `FragmentActivity` and must call `getSupportFragmentManager()` to get the `FragmentManager`.

## Customize toolbar
The default toolbar menu consists of menu items for
- searching text in the current document
- sharing the current document
- setting up viewing mode
- showing/hiding annotation toolbar
- editing pages
- printing the current document

However, you can fully customize and control the toolbar menu as well as the navigation icon. Just pass the customized menu by adding `PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_TOOLBAR_MENU` to the host bundle for customizing the toolbar menu and pass the desired icon by adding `PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_NAV_ICON` to the host bundle for changing the navigation icon.

```java
args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_NAV_ICON, R.drawable.ic_arrow_back_white_24dp);
args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_TOOLBAR_MENU, R.menu.fragment_viewer_simple);
mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
```

The following example replaces the default navigation icon, and only keeps the annotation toolbar icon in the toolbar menu while adds two new menu items for opening a file form device storage and opening a file from URL:

![](https://github.com/sgong-pdftron/stranger-docs/blob/master/android/guides/basics/gif/host-fragment-simple.gif?raw=true "Simple Host Fragment")

```java
private void startTabHostFragment(Bundle args) {
	if (mPdfViewCtrlTabHostFragment == null) {
		args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_NAV_ICON, R.drawable.ic_arrow_back_white_24dp);
		args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_TOOLBAR_MENU, R.menu.fragment_viewer_simple);
		mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
	}
	mPdfViewCtrlTabHostFragment.addHostListener(this);
	FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
	ft.replace(R.id.container, mPdfViewCtrlTabHostFragment, null);
	ft.commit();
}

@Override
public boolean onToolbarOptionsItemSelected(MenuItem item) {
	final int id = item.getItemId();
	FragmentManager fragmentManager = getSupportFragmentManager();

	if (id == R.id.action_open_file) {
		FilePickerDialogFragment dialogFragment = FilePickerDialogFragment.newInstance(RequestCode.SELECT_FILE,
			Environment.getExternalStorageDirectory());
		dialogFragment.setSingleFileListener(new FilePickerDialogFragment.SingleFileListener() {
			@Override
			public void onSingleFileSelected(int requestCode, FileInfo fileInfo) {
				Uri fileUri;
				if (fileInfo.getType() == FileInfo.FILE_TYPE_FILE) {
					fileUri = Uri.fromFile(new File(fileInfo.getAbsolutePath()));
				} else {
					fileUri = Uri.parse(fileInfo.getAbsolutePath());
				}
				openDocument(fileUri, "");
			}
		});
		dialogFragment.show(fragmentManager, "file_picker_dialog_fragment");
	} else if (id == R.id.action_open_url) {
		DialogOpenUrl dialogOpenUrl = new DialogOpenUrl(this, new DialogOpenUrl.DialogOpenUrlListener() {
			@Override
			public void onSubmit(String url) {
				openDocument(Uri.parse(url), "");
			}
		});
		dialogOpenUrl.show();
	}
	return false;
}

@Override
public void onNavButtonPressed() {
	finish();
}

@Override
protected void onDestroy() {
	super.onDestroy();
	if (mPdfViewCtrlTabHostFragment != null) {
		mPdfViewCtrlTabHostFragment.removeHostListener(this);
	}
}
```

The `fragment_viewer_simple.xml` should be placed in menu resource folder and contain:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/action_annotation_toolbar"
        android:icon="@drawable/ic_mode_edit_white"
        android:title="@string/action_annotation_toolbar"
        app:showAsAction="ifRoom"/>
    <item
        android:id="@+id/action_open_file"
        android:title="Open file"
        app:showAsAction="never" />
    <item
        android:id="@+id/action_open_url"
        android:title="Open PDF from link"
        app:showAsAction="never" />
</menu>
```
