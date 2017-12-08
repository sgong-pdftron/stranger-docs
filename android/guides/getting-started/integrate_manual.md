## Manually integrating PDFNet

In addition to integrating via gradle [maven package manager](/android/guides/getting-started/integrate), you can also integrate manually by copying required `aar` files to your project. Typical usage of this is when trying out custom builds or nightly builds with latest hot fixes in your application.

1. Have PDFNetAndroid library zip bundle ready and extract it.
2. Copy either `full/pdfnet.aar` or `standard/pdfnet.aar` file into your project's `libs` directory. See differences between the two versions [here](/android/guides/faq/full-vs-standard).
3. Copy `floatingactionbutton.aar`, `pagecropper.aar`, and `tools.aar` files into your project's `libs` directory.
4. (Optional) Copy `demo.aar` file into your project's `libs` directory.
5. Add `libs` directory in your project's `build.gradle` repositories section.

```groovy
repositories {
    ...
    flatDir {
        dirs 'libs'
    }
}
```