# Using a Fragment

All activities related to the PDF viewer is handled through the PdfViewCtrlTabHostFragment fragment. This host fragment extends `android.support.v4.app.Fragment` and is responsible for showing document tabs.

![](https://github.com/sgong-pdftron/stranger-docs/blob/master/android/guides/basics/gif/host-fragment.gif?raw=true "Host Fragment")

Showing the Host fragment in an activity is straightforward, just like any other fragment make an instance of the class and attach it to the activity:

```java
PdfViewCtrlTabHostFragment mPdfViewCtrlTabHostFragment;

mPdfViewCtrlTabHostFragment = PdfViewCtrlTabHostFragment.newInstance(args);
FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
ft.replace(R.id.fragment_container, mPdfViewCtrlTabHostFragment, null);
ft.commit();
```

where `args` specifies the document that should be shown when the host fragment is visible. You are encouraged to use `createBasicPdfViewCtrlTabBundle` for creating the host bundle. For example, to open a document in the host fragment when you know the URI of the file and its password if the file is password protected you can build `args` as:

```java
Bundle args = PdfViewCtrlTabFragment.createBasicPdfViewCtrlTabBundle(this, fileUri, password);
```

Note that since we use support version of android fragment, your activity must extend `FragmentActivity` and must call `getSupportFragmentManager()` to get the `FragmentManager`.

## Toolbar menu
The default toolbar menu consists of menu items for
- searching text in the current document [icon]
- sharing the current document [icon]
- setting up viewing mode [icon]
- showing/hiding annotation toolbar [icon]
- editing pages [icon]
- printing the current document [icon]

![](img/default-toolbar-menu.png "Default toolbar menu")


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

If you want to interact with the host fragment you should call `addHostListener(TabHostListener)` and override those methods that you are interested in. For example, you may want to override `onToolbarOptionsItemSelected(MenuItem)` when you add a new menu item, so when the item is clicked you can get a callback. As another example, you can get the callback when the navigation icon is clicked if you override `onNavButtonPressed`.

Here's an example that replaces the default navigation icon, and only keeps the annotation toolbar icon in the toolbar menu while adds a new menu item to show a toast when selected:

<!-- ![](https://github.com/sgong-pdftron/stranger-docs/blob/master/android/guides/basics/gif/host-fragment-simple.gif?raw=true "Simple Host Fragment") -->

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
        Toast.makeText(this, "Show toast is clicked!", Toast.LENGTH_SHORT).show();
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

In the above example, we overrides 