#Styles and Themes

As you may know, AppCompat has a new theme called DayNight since Support Lib 23.2.0. So, if your activity's theme extends from one of the DayNight variants then you can switch between dark theme and light theme in your activity as

```java
int mode = isNight ? AppCompatDelegate.MODE_NIGHT_YES : AppCompatDelegate.MODE_NIGHT_NO;
getDelegate().setLocalNightMode(mode);
recreate();
```
As you can see, to take any effect for changing night mode the activity should be re-created.

For example, in our sample activity (SimpleReaderActivity) we change the device UI night mode when the PDFViewCtrl's color mode is updated:

```java
@Override
public boolean onColorModeUpdated() {
		boolean isDarkMode = PdfViewCtrlSettingsManager.isDarkMode(this);
        if (isDeviceNightMode() != isDarkMode) {
            getDelegate().setLocalNightMode(isDarkMode
                ? AppCompatDelegate.MODE_NIGHT_YES
                : AppCompatDelegate.MODE_NIGHT_NO);
        recreate();
        return true;
    }
    return false;
}

public boolean isDeviceNightMode() {
    int currentNightMode = getResources().getConfiguration().uiMode
        & Configuration.UI_MODE_NIGHT_MASK;
    return currentNightMode == Configuration.UI_MODE_NIGHT_YES;
}
```

You can also have different styles for device day/night mode by creating new resoures for night. That means, add a new folder with *night* qulifier on the resource folder and re-define the styles. In the following example, Thumbnail Slider has different appearence for day/night mode:

*res/values/styles.xml*
```java
<style name="ThumbnailSlider">
    <item name="left_menu_item_color">?attr/colorPrimary</item>
    <item name="right_menu_item_color">?attr/colorPrimary</item>
    <item name="seekbar_color">?attr/colorPrimary</item>
</style>
```

*res/values-night/styles.xml*
```java
<style name="ThumbnailSlider">
    <item name="left_menu_item_color">@android:color/white</item>
    <item name="right_menu_item_color">@android:color/white</item>
    <item name="seekbar_color">@android:color/white</item>
</style>
```