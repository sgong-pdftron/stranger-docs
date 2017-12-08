# Upgrading

### Via Maven package manager
If your app is integrating via gradle [Maven package manager](/android/guides/getting-started/integrate), you can simply update PDFNet version in your app's `build.gradle` file. You can either specify the latest version by the exact version number, or simply put `+` to tell gradle to look for the latest version:

```groovy
dependencies {
    ...
    implementation "com.pdftron:pdfnet:6.8.+"
    implementation "com.pdftron:tools:6.8.+"
    implementation "com.pdftron:demo:6.8.+"
}
```

### Via manual AAR file integration
If your app is integrating via the [manual process](/android/guides/getting-started/integrate-manual), you will need to follow the same steps again whenever a new version of the PDFNetAndroid library zip is obtained.