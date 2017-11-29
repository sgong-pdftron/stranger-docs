## Integrating PDFNet

PDFNet supports Android devices with API 16 and newer, targeting the latest stable Android version Oreo, API 26. PDFNet uses Android support libraries with backwards compatibility for older devices.

To integrate PDFNet libraries into one of your own projects, here are a few simple steps to prepare your Android Studio project.

First, add rules to your root-level `build.gradle` file, to include PDFNet's Maven repository:

```groovy
allprojects {
    ...
    repositories {
        ...
        maven {
            url "s3://pdfnet-maven/release"
            credentials(AwsCredentials) {
                accessKey AWS_ACCESS_KEY
                secretKey AWS_SECRET_KEY
            }
        }
    }
}
```

Add the credentials in your project's `gradle.properties` file:

```
AWS_ACCESS_KEY=YOUR_ACCESS_KEY_GOES_HERE
AWS_SECRET_KEY=YOUR_SECRET_KEY_GOES_HERE
```

To use PDFNet initialize helper, also include the following in the same file:

```
PDFTRON_LICENSE_KEY=YOUR_PDFNET_LICENSE_KEY_GOES_HERE
```

To use PDFNet initialize helper, add license key placeholder to `AndroidManifest.xml` file inside the `<application/>` tag:

```xml
<meta-data
  android:name="pdftron_license_key"
  android:value="${pdftronLicenseKey}"/>
```

Then, in your module Gradle file (usually `app/build.gradle`), add:

```groovy
android {
    defaultConfig {
        ...
        vectorDrawables.useSupportLibrary = true
        manifestPlaceholders = [pdftronLicenseKey:PDFTRON_LICENSE_KEY]
    }
}

dependencies {
    ...
    implementation "com.pdftron:pdfnet:6.8.0"
    implementation "com.pdftron:tools:6.8.0"
}
```

To use Activities and fragments shown in the CompleteReader sample project, also include:

```groovy
implementation "com.pdftron:demo:1.0.0"
```
