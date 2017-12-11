## Integrating PDFNet

**If you have not yet received an access token for PDFNet's Maven repository, please first [obtain an access token here](https://www.pdftron.com/pdfnet/mobile/request_trial.html) before proceeding to the next step.**

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

Then, in your module Gradle file (usually `app/build.gradle`), add:

```groovy
android {
    defaultConfig {
        ...
        vectorDrawables.useSupportLibrary = true
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    ...
    implementation "com.pdftron:pdfnet:6.8.0"
    implementation "com.pdftron:tools:6.8.0"
}
```

To use activities shown in the [CompleteReader sample project](/android/guides/getting-started/try-demo), also include:

```groovy
dependencies {
    ...
    implementation "com.pdftron:demo:6.8.0"
}
```

And you are ready to start! Now time to [add PDFNet license key](/android/guides/getting-started/add-license) to your application and [open a document in an Activity](/android/guides/getting-started/using-activity).
