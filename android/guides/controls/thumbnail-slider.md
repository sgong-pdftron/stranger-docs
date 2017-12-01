# Thumbnail Slider

[ThumbnailSlider](http://neon.pdftron.local:8000/www/qliu/android/api/reference/com/pdftron/pdf/controls/ThumbnailSlider.html) is a toolbar that contains a left image button, a seekbar for changing pages, and a right image button. When sliding the seekbar, it will show a small page preview popup on top of the thumbnail slider.

![thumbnail slider](./gif/thumbnail-slider.gif?raw=true)

## Adding thumbnail slider in the view

1. Add thumbnail slider in your xml layout

  ```xml
  <com.pdftron.pdf.controls.ThumbnailSlider
      android:id="@+id/thumbnail_slider"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:layout_alignParentBottom="true"
  />
  ```
2. 