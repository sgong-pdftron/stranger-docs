# Thumbnail Slider

[ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html) is a toolbar that contains a left image button, a seekbar for changing pages, and a right image button. When sliding the seekbar, it will show a small page preview popup on top of the thumbnail slider.

![thumbnail slider](https://i.imgur.com/ruqlxCB.gif)

## XML attributes
[CustomRelativeLayout]() lets child views to be displayed inside [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html). XML properties available for positioning view in [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) includes:

#### `app:pdfviewctrl_id`

Specifies the [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) view id

Format: reference

#### `app:left_menu_item_drawable`

Specifies left menu item drawable resource.

Format: reference

#### `app:right_menu_item_drawable`

Specifies right menu item drawable resource.

Format: reference

#### `app:left_menu_item_color`

Specifies left menu item color

Format: color

Default value:  `#1a9bcb` ![#1a9bcb](https://placehold.it/12/1a9bcb/000000?text=+)


#### `app:right_menu_item_color`

Specifies right menu item color

Format: color

Default value:  `#1a9bcb` ![#1a9bcb](https://placehold.it/12/1a9bcb/000000?text=+)

## Show thumbnail slider

Add thumbnail slider to your layout, If [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) is in the same layout, you can set it to thumbnail slider by adding attribute: [`app:pdfviewctrl_id`](#apppdfviewctrl_id).
```xml
<com.pdftron.pdf.controls.ThumbnailSlider 
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/thumbnail_slider"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"
    app:pdfviewctrl_id="@id/pdfviewctrl"
/>
```

If [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) is **NOT** in the same layout, you can set it to thumbnail slider programmatically by calling [`ThumbnailSlider.setPdfViewCtrl(PDFViewCtrl)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#setPdfViewCtrl(com.pdftron.pdf.PDFViewCtrl))

```java
ThumbnailSlider mSeekBar = stub.findViewById(R.id.thumbseekbar);
mSeekBar.setPdfViewCtrl(mPdfViewCtrl);
```

## Add left image button and right image buttons

You can add left menu item button and right menu item button by adding attributes [`app:left_menu_item_drawable`](#appleft_menu_item_drawable) and [`app:right_menu_item_drawable`](#appright_menu_item_drawable) to the xml layout. In addition, you can set left menu item and right menu item color by adding attributes [`app:left_menu_item_color`](#appleft_menu_item_color) and [`app:right_menu_item_color`](#appright_menu_item_color)

```xml
<com.pdftron.pdf.controls.ThumbnailSlider
    android:id="@+id/thumbnail_slider"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"
    app:left_menu_item_drawable="@drawable/thumbnails"
    app:right_menu_item_drawable="@drawable/ic_format_list_bulleted_white_24dp"
    app:left_menu_item_color="@color/blue"
    app:right_menu_item_color="@color/purple"
/>
```

Alternatively, you can also add them programmably by calling [`setMenuItem(@DrawableRes int, @MenuItemPosition int)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#setMenuItem(int,%20int)). There are two positions: [`POSITION_LEFT`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#POSITION_LEFT) and [`POSITION_RIGHT`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#POSITION_RIGHT).

```java
mSeekBar.setMenuItem(R.drawable.left_icon, ThumbnailSlider.POSITION_LEFT);
```

## Set menu item clicked event listener

After adding menu items to thumbnail slider, you can add menu item clicked event listener by calling [`setOnMenuItemClickedListener(ThumbnailSlider.OnMenuItemClickedListener)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#setOnMenuItemClickedListener(com.pdftron.pdf.controls.ThumbnailSlider.OnMenuItemClickedListener)).

```java
mSeekBar.setOnMenuItemClickedListener(new ThumbnailSlider.OnMenuItemClickedListener(){
    @Override
    public void onMenuItemClicked(int menuItemPosition) {
        if (menuItemPosition == ThumbnailSlider.POSITION_LEFT) {
            if (mTabListener != null) {
                mTabListener.onPageThumbnailOptionSelected(false, null);
            }
        } else {
            if (mTabListener != null) {
                mTabListener.onOutlineOptionSelected();
            }
        }
    }
});
```

## Set thumbnail slider seekbar track event listener

You can also set thumbnail slider seekbar track event listener by calling [`setThumbSliderListener(ThumbnailSlider.OnThumbnailSliderTrackingListener`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#setThumbSliderListener(com.pdftron.pdf.controls.ThumbnailSlider.OnThumbnailSliderTrackingListener)). 
```java
mSeekBar.setThumbSliderListener(new ThumbnailSlider.OnThumbnailSliderTrackingListener() {
    /**
    * Called when a tracking touch on thumbnail slider has been started.
    */
    @Override
    public void onThumbSliderStartTrackingTouch() {
        // so something
    }

    /**
    * Called when a tracking touch on thumbnail slider has been started.
    */
    @Override
    public void onThumbSliderStopTrackingTouch(int pageNum) {
        // do something
    }
});
```

See more details about [`ThumbnailSlider.OnThumbnailSliderTrackingListener`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.OnThumbnailSliderTrackingListener.html)



## Styles
You can change the style of thumbnail slider by setting the `colorPrimary` in `CustomAppTheme` for API < 21, and setting `colorPrimary` in your app default theme for API >= 21. Alternatively, you can also override the following style resources.

### Overall style attribute: `R.style.ThumbnailSlider`

```xml
<style name="ThumbnailSlider">
    <item name="left_menu_item_color">?attr/colorPrimary</item>
    <item name="right_menu_item_color">?attr/colorPrimary</item>
</style>
```

### Seekbar style attribute: `R.style.ThumbnailSlider.Seekbar`

API < 21:
```xml
<style name="ThumbnailSlider.Seekbar" parent="Widget.AppCompat.SeekBar" >
    <!-- add paddingTop and paddingBottom for api < 21 here for avoiding seekbar becomes too thick-->
    <item name="android:paddingTop">16dp</item>
    <item name="android:paddingBottom">16dp</item>
    <item name="android:layout_gravity">center</item>
    <item name="android:minHeight">2dp</item>
    <item name="android:maxHeight">2dp</item>
</style>
```

API >= 21:

```xml
<style name="ThumbnailSlider.Seekbar" parent="Widget.AppCompat.SeekBar">
    <item name="android:progressTint">?android:attr/colorPrimary</item>
    <item name="android:progressBackgroundTint">?android:attr/colorPrimary</item>
    <item name="android:colorControlActivated">?android:attr/colorPrimary</item>
    <item name="android:colorControlHighlight">?android:attr/colorPrimary</item>
    <item name="android:minHeight">2dp</item>
    <item name="android:maxHeight">2dp</item>
    <item name="android:layout_gravity">center</item>
</style>
```

### Seekbar track drawable attribute: `R.drawable.seek_track_material`

Please note: for API < 21, drawable is using color attribute `R.color.fab_dark_blue` ( #1a9bcb ![#1a9bcb](https://placehold.it/12/1a9bcb/000000?text=+) )

### Seekbar thumb drawable attribute: `R.drawable.seek_thumb`

Please note: for API < 21, drawable is using color attribute `R.color.fab_dark_blue` ( #1a9bcb ![#1a9bcb](https://placehold.it/12/1a9bcb/000000?text=+) )

### Layout attribute: `R.layout.controls_thumbnail_slider`

Please note: if you want to override `R.layout.controls_thumbnail_slider`, please add the following views and the id of each view should be the same as following

```xml
<LinearLayout
    android:id="@+id/controls_thumbnail_slider_scrubberview"
    android:paddingLeft="@dimen/thumbnail_slider_padding"
    android:paddingRight="@dimen/thumbnail_slider_padding"
    android:focusable="true"
    android:clickable="true"
    android:layout_width="match_parent"
    android:layout_height="@dimen/quick_menu_button_size"
    android:orientation="horizontal"
    android:background="@color/white">

    <android.support.v7.widget.AppCompatImageButton
        android:id="@+id/controls_thumbnail_slider_left_menu_button"
        android:layout_width="@dimen/quick_menu_button_size"
        android:layout_height="@dimen/quick_menu_button_size"
        android:theme="@style/Widget.AppCompat.Button.Borderless"
        android:background="?android:attr/selectableItemBackground"
        android:padding="@dimen/icon_min_padding"
        android:visibility="gone"
        />

    <com.pdftron.pdf.controls.MirrorSeekBar
        android:id="@+id/controls_thumbnail_slider_scrubberview_seekbar"
        android:layout_width="0dp"
        android:layout_weight="1"
        android:layout_height="match_parent"
        android:progressDrawable="@drawable/seek_track_material"
        android:thumb="@drawable/seek_thumb"
        android:theme="@style/ThumbnailSlider.Seekbar"/>

    <android.support.v7.widget.AppCompatImageButton
        android:id="@+id/controls_thumbnail_slider_right_menu_button"
        android:layout_width="@dimen/quick_menu_button_size"
        android:layout_height="@dimen/quick_menu_button_size"
        android:theme="@android:style/Widget.DeviceDefault.Button.Borderless"
        android:background="?android:attr/selectableItemBackground"
        android:padding="@dimen/icon_min_padding"
        android:visibility="gone"
        />
</LinearLayout>
```