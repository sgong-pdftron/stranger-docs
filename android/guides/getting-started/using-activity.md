# Using an Activity

Starting from PDFNet v6.8.+, PDFNet ships with `SimpleReaderActivity` which is an all-in-one document reader and PDF editor. In addition to PDF files, it also supports viewing of other file extensions such as `.docx`, `.doc`, `.pptx`, `.xlsx`, `.md`, `.cbz` and various image formats. It allows stream conversion of these non-pdf documents to PDF format so you can view the document while conversion happens. In this activity, you can read, annotate, sign, fill in PDF forms and more. See [detailed features list here](/android/guides/getting-started#completereader-app).

`SimpleReaderActivity` extends Android's [`AppCompatActivity`](https://developer.android.com/reference/android/support/v7/app/AppCompatActivity.html) and follows [Material design guidelines](https://material.io/guidelines/).

Please note that `SimpleReaderActivity` requires the `com.pdftron:demo` package.

<img alt='Host Fragment' src ="https://raw.githubusercontent.com/sgong-pdftron/stranger-docs/master/android/guides/getting-started/gif/host-fragment.gif" width='300'/>

Here are a few simple steps to get started with `SimpleReaderActivity`.

First, add activity declarations to `AndroidManifest.xml` file:

```xml
<application
    ...
    android:supportsRtl="true"
    android:largeHeap="true">
    ...
    <activity android:name="com.pdftron.demo.app.SimpleReaderActivity"
        android:configChanges="keyboardHidden|orientation|screenSize|screenLayout|smallestScreenSize"
        android:windowSoftInputMode="adjustPan"
        android:theme="@style/CustomAppTheme"/>
</application>
```

Then, add theme to `res/values/styles.xml`:

```xml
<style name="CustomAppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="colorPrimary">@color/app_color_primary</item>
    <item name="colorPrimaryDark">@color/app_color_primary_dark</item>
    <item name="colorAccent">@color/app_color_accent</item>
    <!-- Drawer -->
    <item name="drawerArrowStyle">@style/DrawerArrowStyle</item>
    <!-- Action bar -->
    <item name="windowActionModeOverlay">true</item>
</style>
```

`SimpleReaderActivity` extends [`AppCompatActivity`](https://developer.android.com/reference/android/support/v7/app/AppCompatActivity.html) and uses AppCompat [`Toolbar`](https://developer.android.com/reference/android/support/v7/widget/Toolbar.html). It is important that you define a `Theme.AppCompat`-based theme. The recommended theme is `Theme.AppCompat.*.NoActionBar`. However you can also use other custom themes, be sure to disable the action bar manually:

```xml
<style name="CustomAppTheme" parent="Theme.AppCompat.*">
    ...
    <!-- Action bar -->
    <item name="windowActionModeOverlay">true</item>
    <item name="windowActionBar">false</item>
    <item name="windowNoTitle">true</item>
</style>
```

Then, if you would like to customize the UI of `SimpleReaderActivity`, you can use `PdfFragmentConfig` class. For example:

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
    .toolbarTitle("Simple Reader")
    .showSearchView(true)
    .showShareOption(true)
    .showDocumentSettingsOption(true)
    .showAnnotationToolbarOption(true)
    .showOpenFileOption(true)
    .showOpenUrlOption(true)
    .showEditPagesOption(true)
    .showPrintOption(true)
    .showCloseTabOption(true)
    .showAnnotationsList(true)
    .showOutlineList(true)
    .showUserBookmarksList(true)
    .build();
```

If you need storage permission for accessing local documents, add the following permissions to `AndroidManifest.xml` file outside of the `<application/>` tag:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

If you need internet permission for downloading online documents, add the following permissions to `AndroidManifest.xml` file outside of the `<application/>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

**Please note: from Android 6.0, API 23, and up, application needs to request storage permission at runtime before accessing any files on the external storage.**

Lastly, launch the activity from anywhere in your application:

```java
import com.pdftron.demo.app.SimpleReaderActivity;
...
// from internal storage
final Uri localFile = Uri.fromFile(new File("myLocalFilePath"));
SimpleReaderActivity.openDocument(context, localFile, config);

// from content uri
final Uri contentUri = Uri.parse("myContentUri");
SimpleReaderActivity.openDocument(context, contentUri, config);

// from http/https
final Uri fileLink = Uri.parse("myFileLink");
SimpleReaderActivity.openDocument(context, fileLink, config);

// from res
SimpleReaderActivity.openDocument(context, R.raw.my_file_res_id, config);
```
