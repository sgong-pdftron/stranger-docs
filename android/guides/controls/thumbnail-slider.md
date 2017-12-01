# Thumbnail Slider

[ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html) is a toolbar that contains a left image button, a seekbar for changing pages, and a right image button. When sliding the seekbar, it will show a small page preview popup on top of the thumbnail slider.

![thumbnail slider](./gif/thumbnail-slider.gif?raw=true)

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

Default value:  `#1a9bcb` ![#1a9bcb](https://placehold.it/15/1a9bcb/000000?text=+)


#### `app:right_menu_item_color`

Specifies right menu item color

Format: color

Default value:  `#1a9bcb` ![#1a9bcb](https://placehold.it/15/1a9bcb/000000?text=+)

## Add thumbnail slider in your xml layout

```xml
<com.pdftron.pdf.controls.ThumbnailSlider
    android:id="@+id/thumbnail_slider"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"
/>
```

## Set [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) to [ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html)

After thumbnail slider is added to the view, you need to set [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) to [ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html) so thumbnail slider can interact page changes of [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html). You can either add [PDFViewCtrl](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) by adding attribute [`app:pdfviewctrl_id`](#apppdfviewctrl_id) to [ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html), or alternatively you can do it programmably by calling [`setPdfViewCtrl(PDFViewCtrl)`](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html#setPdfViewCtrl(com.pdftron.pdf.PDFViewCtrl))

#### XML Example:

```xml
<com.pdftron.pdf.controls.ThumbnailSlider
    android:id="@+id/thumbnail_slider"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_alignParentBottom="true"
    app:pdfviewctrl_id="@id/pdfviewctrl"
/>
```

#### Programming Example:

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
