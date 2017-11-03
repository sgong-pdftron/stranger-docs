## Try the PDFNet Demo

To integrate the PDFNet libraries into one of your own projects, here are a few simple steps to prepare your Android Studio project.

First, add rules to your root-level `build.gradle` file, to include the PDFNet's Maven repository:

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

You can either include your access key above, however here we recommend you to add the credentials in your project's `gradle.properties`:

```
AWS_ACCESS_KEY=<YOUR_ACCESS_KEY_GOES_HERE>
AWS_SECRET_KEY=<YOUR_SECRET_KEY_GOES_HERE>
```

Then, in your module Gradle file (usually the app/build.gradle), add:

```
implementation "com.pdftron:pdfnet:6.8.0"
implementation "com.pdftron:tools:6.8.0"
implementation "com.pdftron:demo:1.0.0"
```

Next, add the trial license key to AndroidManifest.xml inside the `<application/>` tag:

```
<meta-data
    android:name="pdfnet_license_key"
    android:value="your_license_key_goes_here"/>

```

