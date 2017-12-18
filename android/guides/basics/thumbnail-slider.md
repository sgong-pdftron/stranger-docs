# Thumbnail Slider

[ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html) is a toolbar that contains a left image button, a seekbar for changing pages, and a right image button. When sliding the seekbar, it will show a small page preview popup on top of the thumbnail slider.

<img alt='thumbnail-slider'  src='https://i.imgur.com/bchlpDc.gif' width=300 />

## Table of Contents  
1. [Show thumbnail slider](#show-thumbnail-slider)
2. [Thumbnail slider buttons](#add-left-image-button-and-right-image-buttons)
3. [Thumbnail slider buttons onClick event listener](#set-menu-item-clicked-event-listener)
4. [Styles](#styles)
5. [XML attributes](#xml-attributes)


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

By default thumbnail slider is using `?attr/colorPrimary` for seekbar color, left menu item color, and right menu item. You can also changing them by setting [`app:seekbar_color`](#appseelbar_color) for seekbar color, [`app:left_menu_item_color`](#appleft_menu_item_color) for left menu item icon color, and [`app:right_menu_item_color`](#appright_menu_item_color) for right menu item icon color.

```xml
<com.pdftron.pdf.controls.ThumbnailSlider
    android:id="@+id/thumbnail_slider"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"
    app:left_menu_item_color="@android:color/blue"
    app:right_menu_item_color="@android:color/purple"
    app:seekbar_color="@android:color/black"
/>
```

### Seekbar styles

If you want to further changing seekbar styles such as padidng, height, you can overrides the default seekbar style: `R.style.ThumbnailSlider.Seekbar`.

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
    <item name="android:progressTint">?attr/colorPrimary</item>
    <item name="android:progressBackgroundTint">?attr/colorPrimary</item>
    <item name="android:colorControlActivated">?attr/colorPrimary</item>
    <item name="android:colorControlHighlight">?attr/colorPrimary</item>
    <item name="android:minHeight">2dp</item>
    <item name="android:maxHeight">2dp</item>
    <item name="android:layout_gravity">center</item>
</style>
```

In addition, you can also overrides seekbar progress bar drawable by overrding the drawable file: `seek_track_material.xml`. If you want to overrides, seekabr thumb drawable, you can overrides drawable file: `seek_thumb.xml`.

## XML attributes
[CustomRelativeLayout]() lets child views to be displayed inside [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html). XML properties available for positioning view in [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) includes:

#### `app:pdfviewctrl_id`

Specifies the [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) view id

Format: reference

#### `app:seelbar_color`

Specifies seekbar progress bar and thumb color

Format: color

Default value: `?attr/colorPrimary`

#### `app:left_menu_item_drawable`

Specifies left menu item drawable resource.

Format: reference

#### `app:right_menu_item_drawable`

Specifies right menu item drawable resource.

Format: reference

#### `app:left_menu_item_color`

Specifies left menu item color

Format: color

Default value:  `?attr/colorPrimary`


#### `app:right_menu_item_color`

Specifies right menu item color

Format: color

Default value:  `?attr/colorPrimary`
