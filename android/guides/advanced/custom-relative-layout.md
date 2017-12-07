# Custom relative layout

[CustomRelativeLayout](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/CustomRelativeLayout.html) is a [RelativeLayout](https://developer.android.com/reference/android/widget/RelativeLayout.html) that can be nested and displayed in [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) by a given page position and page number. Therefore all child views of [CustomRelativeLayout](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/CustomRelativeLayout.html) are displayed in PDF view.

<img alt='custom layout' src='./img/custom_layout.png' width='300' />

## XML attributes

####`app:posX`
Specifies the x coordinates in page point.

Default value: 0

####`app:posY`

Specifies the y coordinates in page point.

Default value: 0

####`app:pageNum`
Specifies the page number of the document.

Default value: 1

####`app:zoomWithParent`
Specifies whether the view will be zoom with parent. 

Default value: true

####`android:layout_width`
Specifies the width of the view, it has to be **exact number**.

####`android:layout_height`
Specifies the height of the view, it has to be **exact number**.

## Show CustomRelativeLayout

You can add [CustomRelativeLayout](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/tools/CustomRelativeLayout.html) under [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) in xml layout resource

```xml
<com.pdftron.pdf.PDFViewCtrl
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/pdfviewctrl"
    android:layout_width="match_parent"
    android:layout_height="0dp"
    android:scrollbars="vertical|horizontal" >
    <com.pdftron.pdf.tools.CustomRelativeLayout
        android:layout_width="50dp"
        android:layout_height="50dp"
        app:posX="50"
        app:posY="150"
        app:pageNum="3"
        app:zoomWithParent="true">
        <!--Child views under CustomRelativeLayout-->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="Custom Layout Text View"
            android:textSize="24dp"
            android:elevation="2dp"/>
        <View
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="@color/light_gray" />
    </com.pdftron.pdf.tools.CustomRelativeLayout>
</com.pdftron.pdf.PDFViewCtrl>
```

Screenshot:

![screenshot](./img/custom-layout.png)

## Adding Custom layout programmably

Alternatively, you can also add custom layout programmably like a [RelativeLayout](https://developer.android.com/reference/android/widget/RelativeLayout.html).

```java
public void addCustomeLayout(PDFViewCtrl pdfViewCtrl) {
  // initialize custom layout
  CustomRelativeLayout customLayout= new CustomRelativeLayout(pdfViewCtrl.getContext());
  // set page position and page
  customLayout.setPagePosition(100, 100, 3);
  // set layout width and height
  LayoutParams lp = new LayoutParams(100, 100);
  customLayout.setLayoutParams(lp);
  // add custom layout to pdfViewCtrl
  pdfViewCtrl.addView(customLayout);

}
```
