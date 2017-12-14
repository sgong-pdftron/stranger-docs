# Adding PDFNet License Key

Starting from PDFNet v6.8.+, PDFNet no longer supports empty license key for evaluation purpose. You will instead need a demo license key.

**If you have not yet received a license key, please first [obtain a license key here](https://www.pdftron.com/pdfnet/mobile/request_trial.html) before proceeding to the next step.**

It is important that you initialize PDFNet library with a valid license key before using any PDFNet classes.

There are two ways to include license key in your application.

**Options 1 (Recommended): define in `gradle.properties` where you can [inject build variables into the manifest](https://developer.android.com/studio/build/manifest-build-variables.html).**

First, add your PDFNet license key in your project's `gradle.properties` file:

```
PDFTRON_LICENSE_KEY=YOUR_PDFNET_LICENSE_KEY_GOES_HERE
```

Then, in your module Gradle file (usually `app/build.gradle`), add:

```groovy
android {
    defaultConfig {
        ...
        manifestPlaceholders = [pdftronLicenseKey:PDFTRON_LICENSE_KEY]
    }
}
```

Then, add license key placeholder to `AndroidManifest.xml` file inside the `<application/>` tag:

```xml
<meta-data
    android:name="pdftron_license_key"
    android:value="${pdftronLicenseKey}"/>
```

Lastly, in your `MainApplication.java` or `MainActivity.java` file's `onCreate` method, add:

If using `com.pdftron:demo` dependency, use:
```java
com.pdftron.demo.utils.AppUtils.initializePDFNetApplication(getApplicationContext())
```

If only using `com.pdftron:tools` dependency, use:
```java
com.pdftron.pdf.utils.AppUtils.initializePDFNetApplication(getApplicationContext())
```

**Options 2: define directly in code.**

Please note that option 1 will setup a number of recommended presets for using PDFNet SDK. If you choose to go with option 2, you will have to setup the options manually. See [PDFNet class documentation](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFNet.html).
```java
PDFNet.initialize(getApplicationContext(), R.raw.pdfnet, "YOUR_PDFNET_LICENSE_KEY_GOES_HERE");
```