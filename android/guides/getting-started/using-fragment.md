# Using a Fragment

All actions related to the PDF viewer are handled through the `PdfViewCtrlTabHostFragment` fragment. This fragment extends `android.support.v4.app.Fragment` and is responsible for showing document in tabs.

<p align="center"><img alt='Host Fragment' src ="https://raw.githubusercontent.com/sgong-pdftron/stranger-docs/master/android/guides/getting-started/gif/host-fragment.gif" width='300'/></p>

Showing the `PdfViewCtrlTabHostFragment` in an activity is straightforward, like any other fragment make an instance of the class and attach it to the activity. To create an instance of the host fragment you need pass in a bundle that can be created using `createBasicPdfViewCtrlTabBundle`. The bundle specifies the document that should be shown when the host fragment is visible. For example, to open a document in the host fragment when you know the URI of the file and its password if the file is password protected you can call:

```java
PdfViewCtrlTabHostFragment mPdfViewCtrlTabHostFragment;

Bundle args = PdfViewCtrlTabFragment.createBasicPdfViewCtrlTabBundle(context, fileUri, password);
mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
ft.replace(R.id.fragment_container, mPdfViewCtrlTabHostFragment, null);
ft.commit();
```

You can simply convert a file to a URI by:
```java
File file = ...
Uri fileUri.fromFile(file);
```

Note that since we use support version of android fragment, your activity must extend `FragmentActivity` and must call `getSupportFragmentManager()` to get the `FragmentManager`.

If you would like to customize the UI of `PdfViewCtrlTabHostFragment`, you can use `PdfFragmentConfig` class. For example:

```java
PdfFragmentConfig.Builder builder = new PdfFragmentConfig.Builder();
PdfFragmentConfig config = builder
    .fullscreenModeEnabled(true)
    .multiTabEnabled(true)
    .documentEditingEnabled(true)
    .longPressQuickMenuEnabled(true)
    .showPageNumberIndicator(true)
    .showBottomNavBar(true)
    .showThumbnailView(true)
    .showBookmarksView(true)
    .toolbarTitle("Host Fragment")
    .showSearchView(true)
    .showShareOption(true)
    .showOpenFileOption(true)
    .showOpenUrlOption(true)
    .showEditPagesOption(true)
    .showPrintOption(true)
    .showCloseTabOption(true)
    .showAnnotationsList(true)
    .showOutlineList(true)
    .showUserBookmarksList(true)
    .build();

Bundle args = PdfViewCtrlTabFragment.createBasicPdfViewCtrlTabBundle(context, fileUri, password, config);
args.putParcelable(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_CONFIG, config);
mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
```

## Toolbar menu

<p align="center"><img alt='Default toolbar menu' src ="img/default-toolbar-menu.png" width='300'/></p>

The default toolbar menu consists of menu items for
- searching text in the current document [#1]
- sharing the current document [#2]
- setting up viewing mode [#3]
- showing/hiding annotation toolbar [#4]
- editing pages [in overflow menu]
- printing the current document [in overflow menu]

However, you can fully customize and control the toolbar menu as well as the navigation icon. 

### Customize toolbar menu
In order to change the default toolbar menu items you need to create your own menu in menu resource folder and pass it to the host fragment through bundle:

```java
args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_TOOLBAR_MENU, R.menu.fragment_viewer_simple);
```

### Customize navigation icon
To change the navigation icon, similar to toolbar menu, you need to pass the desired icon to the host fragment through bundle:

```java
args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_NAV_ICON, R.drawable.ic_arrow_back_white_24dp);
```

### Interact with fragment
If you want to interact with the host fragment you should call `addHostListener(TabHostListener)` and override those methods that you are interested in. For example, you may want to override `onToolbarOptionsItemSelected(MenuItem)` when you add a new menu item, so when the item is clicked you can get a callback. As another example, you can get the callback when the navigation icon is clicked if you override `onNavButtonPressed()`.

Here's an example that replaces the default navigation icon, and only keeps the annotation toolbar icon in the toolbar menu while adds a new menu item to show a toast when selected:

<p align="center"><img alt='Host Fragment' src ="https://raw.githubusercontent.com/sgong-pdftron/stranger-docs/master/android/guides/getting-started/gif/simple-host-fragment.gif" width='300'/></p>

```java
...
args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_NAV_ICON, R.drawable.ic_arrow_back_white_24dp);
args.putInt(PdfViewCtrlTabHostFragment.BUNDLE_TAB_HOST_TOOLBAR_MENU, R.menu.fragment_viewer_simple);
mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
mPdfViewCtrlTabHostFragment.addHostListener(this);
...

@Override
public boolean onToolbarOptionsItemSelected(MenuItem item) {
	if (item.getItemId() == R.id.action_show_toast) {
		Toast.makeText(context, "Show toast is clicked!", Toast.LENGTH_SHORT).show();
	}
	return false;
}

@Override
public void onNavButtonPressed() {
	// called when navigation button has been clicked
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
        android:id="@+id/action_show_toast"
        android:title="Show toast"
        app:showAsAction="never" />
</menu>
```
