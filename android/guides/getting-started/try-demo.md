## Try the PDFNet Demo in your application

To try the PDFNet demo Activities in one of your own projects, here are a few simple steps to prepare your Android Studio project.

First, add the credentials in your project's `gradle.properties` file:

```
AWS_ACCESS_KEY=YOUR_ACCESS_KEY_GOES_HERE
AWS_SECRET_KEY=YOUR_SECRET_KEY_GOES_HERE
PDFTRON_LICENSE_KEY=YOUR_PDFNET_LICENSE_KEY_GOES_HERE
```

Add rules to your root-level `build.gradle` file, to include PDFNet's Maven repository.

Copy the following **as is**, do **not** import `org.gradle.api.credentials.Credentials`:

```groovy
allprojects {
    ...
    repositories {
        ...
        maven {
            //TODO: change to real link, use temp for internal testing purpose
            url "s3://pdfnet-maven/xodo"
            credentials(AwsCredentials) {
                accessKey AWS_ACCESS_KEY
                secretKey AWS_SECRET_KEY
            }
        }
    }
}
```

Then, in your module Gradle file (usually `app/build.gradle`), add:

```groovy
android {
    defaultConfig {
        ...
        vectorDrawables.useSupportLibrary = true
        manifestPlaceholders = [pdftronLicenseKey:PDFTRON_LICENSE_KEY]
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    configurations.all {
        resolutionStrategy.force "com.android.support:appcompat-v7:26.1.0"
        resolutionStrategy.force "com.android.support:support-v4:26.1.0"
        resolutionStrategy.force "android.arch.lifecycle:runtime:1.0.3"
    }
}

dependencies {
    ...
    implementation "com.pdftron:pdfnet:6.8.0"
    implementation "com.pdftron:tools:6.8.0"
    implementation "com.pdftron:demo:6.8.0"
}
```

Next, add permissions to `AndroidManifest.xml` file outside of the `<application/>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE"/>

```

Add license key placeholder, activity declarations to `AndroidManifest.xml` file inside the `<application/>` tag:

```xml
<meta-data
  android:name="pdftron_license_key"
  android:value="${pdftronLicenseKey}"/>

<activity android:name="com.pdftron.demo.app.SimpleReaderActivity"
    android:configChanges="keyboardHidden|orientation|screenSize|screenLayout|smallestScreenSize"
    android:windowSoftInputMode="adjustPan"
    android:theme="@style/CustomAppTheme"/>

<activity android:name="com.pdftron.demo.app.CompleteReaderActivity"
    android:configChanges="keyboardHidden|orientation|screenSize|screenLayout|smallestScreenSize"
    android:windowSoftInputMode="adjustPan"
    android:theme="@style/CustomAppTheme"/>

<activity android:name="com.pdftron.demo.app.SettingsActivity"
    android:parentActivityName="com.pdftron.demo.app.CompleteReaderActivity"
    android:theme="@style/CustomAppTheme" />

```

Finally, add style to `res/values/styles.xml`:

```xml
<style name="CustomAppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="colorPrimary">@color/app_color_primary</item>
    <item name="colorPrimaryDark">@color/app_color_primary_dark</item>
    <item name="colorAccent">@color/app_color_accent</item>
    <!--Drawer-->
    <item name="drawerArrowStyle">@style/DrawerArrowStyle</item>
    <item name="windowActionModeOverlay">true</item>
</style>
```

To open Simple Reader demo, use:
```java
import com.pdftron.demo.app.SimpleReaderActivity;
...
SimpleReaderActivity.open(this);
```

You will see:

<img alt='SimpleReader image' src='img/simple_reader_demo.png' width='300' />

To open Complete Reader demo, use:
```java
import com.pdftron.demo.app.CompleteReaderActivity;
...
CompleteReaderActivity.open(this);
```

You will see:

<img alt='CompleteReader image' src='img/complete_reader_demo.png' width='300' />