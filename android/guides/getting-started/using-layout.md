# Using PDFViewCtrl

**If you are looking for a quick start on displaying documents in your application, please first take a look at [Using an Activity](/android/guides/getting-started/using-activity) or [Using a Fragment](/android/guides/getting-started/using-fragment) as they are easier to setup and ready to launch from any Activity or Fragment. Continue reading this article if you are looking for embedding [`PDFViewCtrl`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) in your own layout.**

[`PDFViewCtrl`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) extends Android's [`ViewGroup`](https://developer.android.com/reference/android/view/ViewGroup.html) and can be embedded in any layout.

In this tutorial you will be able to display a PDF file in `PDFViewCtrl`.

**Before jumping into the layout, please make sure [PDFNet library is initialized](/android/guides/getting-started/add-license) before inflating the layout or before `setContentView` of your Activity.**

First, add `PDFViewCtrl` to your XML layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.myapplication.MainActivity">

    <com.pdftron.pdf.PDFViewCtrl
        android:id="@+id/pdfviewctrl"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scrollbars="vertical|horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Then, get a reference of `PDFViewCtrl` in code after inflating the layout.
```java
import com.pdftron.pdf.PDFViewCtrl;
import com.pdftron.pdf.config.PDFViewCtrlConfig;
import com.pdftron.pdf.utils.AppUtils;
...
PDFViewCtrl pdfViewCtrl = findViewById(R.id.pdfviewctrl);
AppUtils.setupPDFViewCtrl(pdfViewCtrl, PDFViewCtrlConfig.getDefaultConfig(this));
```

Next, choose a document to display:

### Option 1: from HTTP/HTTPS

To access internet, add the following permissions to `AndroidManifest.xml` file outside of the `<application/>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```
Then:

```java
try {
    String url = "http://www.pdftron.com/downloads/pdfref.pdf";
    pdfViewCtrl.openUrlAsync(url, null, null, null);
    pdfViewCtrl.setToolManager(new ToolManager(pdfViewCtrl));
} catch (Exception ex) {
    ex.printStackTrace();
}
```

### Option 2: from resource

Add a **sample.pdf** to `src/main/res/raw` folder.

```java
try {
    InputStream is = getResources().openRawResource(R.raw.sample);
    PDFDoc doc = new PDFDoc(is);
    pdfViewCtrl.setDoc(doc);
    pdfViewCtrl.setToolManager(new ToolManager(pdfViewCtrl));
} catch (Exception ex) {
    ex.printStackTrace();
}
```

### Option 3: from local device storage

To access device storage, add the following permissions to `AndroidManifest.xml` file outside of the `<application/>` tag:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Then:

```java
try {
    pdfViewCtrl.setDoc(new PDFDoc("my_file_path"));
    pdfViewCtrl.setToolManager(new ToolManager(pdfViewCtrl));
} catch (Exception ex) {
    ex.printStackTrace();
}
```
