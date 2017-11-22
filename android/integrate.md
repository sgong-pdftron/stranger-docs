## Integrating PDFNet

PDFNet supports Android devices with API 16 and newer, targeting the latest stable Android version Oreo, API 26. PDFNet uses Android support libraries with backwards compatibility for older devices.

To integrate the PDFNet libraries into one of your own projects, here are a few simple steps to prepare your Android Studio project.

First, add rules to your root-level `build.gradle` file, to include PDFNet's Maven repository:

```
allprojects {
    // ...
    repositories {
        // ...
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

You can add the credentials in your project's `gradle.properties` file:

```
AWS_ACCESS_KEY=<YOUR_ACCESS_KEY_GOES_HERE>
AWS_SECRET_KEY=<YOUR_SECRET_KEY_GOES_HERE>
```

Then, in your module Gradle file (usually `app/build.gradle`), add:

```
implementation "com.pdftron:pdfnet:6.8.0"
implementation "com.pdftron:tools:6.8.0"
```
