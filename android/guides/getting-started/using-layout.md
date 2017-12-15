# Using PDFViewCtrl

**If you are looking for a quick start on displaying documents in your application, please first take a look at [Using an Activity](/android/guides/getting-started/using-activity) or [Using a Fragment](/android/guides/getting-started/using-fragment) as they are easier to setup and ready to launch from any Activity or Fragment. Continue reading this article if you are looking for embedding [`PDFViewCtrl`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) in your own layout.**

[`PDFViewCtrl`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) extends Android's [`ViewGroup`](https://developer.android.com/reference/android/view/ViewGroup.html) and can be embedded in any layout.

In this tutorial you will be able to display a PDF file in `PDFViewCtrl`.

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
PDFViewCtrl pdfViewCtrl = findViewById(R.id.pdfviewctrl);
com.pdftron.pdf.utils.AppUtils.setupPDFViewCtrl(pdfViewCtrl, PDFViewCtrlConfig.getDefaultConfig(this));
```

NOT DONE
