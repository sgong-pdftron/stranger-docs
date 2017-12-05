# Reflow
Reflow makes the document more flexible and easier to read, especially on small devices. PDFNet is able to extract reflowable layout of each page of a PDF document as an HTML file. In this article we explain how simple it is to show a widget that allows the user to swipe left or right through the pages of the document to see reflowable document pages. Later, we provide necessary functions to convert a hard-layout PDF page to a HTML document page.

# How to show Reflow Pager
ReflowControl is a [ViewPager](https://developer.android.com/reference/android/support/v4/view/ViewPager.html) that allows the user to flip left and right through reflowable layout of pages in a certain PDF document.

![](https://github.com/sgong-pdftron/stranger-docs/blob/master/android/guides/basics/gif/reflow_pager.gif?raw=true "Reflow")

## Implementation
To set up your layout with [ReflowControl](http://www.pdftron.com/pdfnet/mobile/docs/Android/tools/javadoc/reference/com/pdftron/pdf/controls/ReflowControl.html), add a `<ReflowControl>` element to your XML layout. For example, if each page in the swipe view should consume the entire layout, then your layout looks like this:

```java
<com.pdftron.pdf.controls.ReflowControl
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/reflow_pager"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

Then, you need to attach a PDFDoc to the reflow pager:

```java
ReflowControl reflowControl = (ReflowControl) findViewById(R.id.reflow_pager);
reflowControl.setup(pdfDoc);
```

That is everything you need to have a simple reflow pager. Next, we will go through advanced features.

### Post process color
If you want to map each original color to a new color (for example for handling night mode) you need to pass an OnPostProcessColorListener listener to the ReflowControl.

To do so, you can provide an OnPostProcessColorListener listener when setting up the ReflowControl:
<pre><code>
ReflowControl reflowControl = (ReflowControl) findViewById(R.id.reflow_pager);
reflowControl.setup(pdfDoc, mOnPostProcessColorListener);
</code></pre>

where, mOnPostProcessColorListener can be defined by PDFViewCtrl as:
```java
    private final ReflowControl.OnPostProcessColorListener mOnPostProcessColorListener =
        new ReflowControl.OnPostProcessColorListener() {
            @Override
            public ColorPt getPostProcessedColor(ColorPt cp) {
                if (mPDFViewCtrl != null) {
                    return mPDFViewCtrl.getPostProcessedColor(cp);
                }
                return cp;
            }
        };
```

Alternatively you can set a listener:
```java
ReflowControl reflowControl = (ReflowControl) findViewById(R.id.reflow_pager);
reflowControl.setup(pdfDoc);
reflowControl.setOnPostProcessColorListener(mOnPostProcessColorListener):
```

### Notify Reflow pager that the document has been modified
To refresh the reflow pager to show the latest changes on your document, you should let the reflow pager know that the document has been modified:

```java
void notifyReflowModified(ReflowControl reflowControl) {
    if (reflowControl != null && reflowControl.isReady()) {
        reflowControl.notifyPagesModified();
    }
}
```     

### Set text size
You can change the reflowable text size as a fraction of 100 (valid values are 5, 10, 25, 50, 75, 100, 125, 150, 200, 40, 800, 1600):
```java
void changeReflowSize(ReflowControl reflowControl, int percent) {
    if (reflowControl != null && reflowControl.isReady()) {
        reflowControl.setTextSizeInPercent(percent);
    }
}
```     
Alternatively you can zoom in/out to change the reflowable text size:

```java
void zoomReflow(ReflowControl reflowControl, boolean zoomIn) {
    if (reflowControl != null && reflowControl.isReady()) {
        if (zoomIn) {
            reflowControl.zoomIn();
        } else {
            reflowControl.zoomOut();
        }
    }
}
```     

Assuming the current text size is 100%, by calling zoomReflow(reflowControl, true) and zoomReflow(reflowControl, false) the new text size will be 125% and 75% of the original size, respectively.

### Set background color
There are three methods to change the background color:

ReflowControl:setDayMode(): no background

ReflowControl:setNightMode(): night background

ReflowControl:setCustomColorMode(int): customized background

### Set right-to-left direction
You can support right-to-left languages by setting the direction of reflowable text:

ReflowControl:setRightToLeftDirection(isRtlMode)

# How to generate a Reflow page
You don't need a reflow pager to have a reflowable layout of PDF pages. Indeed, you can extract the reflowable layout by creating a HTML file from a certain page of the document.

## Implementation
The first step is to let the core know you are going to use reflow by calling:
```java
ReflowProcessor.initialize();
```
Please note that this method clears all existing reflowable data. So, preferably put this in your application or activity.

When reflow processor has been initialized, you can request for reflow by calling getReflow(Page, RequestHandler, Object). Once the reflowable HTML file is ready the RequestHandler.RequestHandlerProc(int, String, customData) callback is executed:

```java
void getReflowPage(PDFDoc doc, int pageNum) {
    boolean shouldUnlockRead = false;
    try {
        // request for reflow output
        doc.lockRead();
        shouldUnlockRead = true;
        Page page = doc.getPage(pageNum);
        ReflowProcessor.getReflow(page, mRequestHandler, pageNum);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        if (shouldUnlockRead) {
            Utils.unlockReadQuietly(doc);
        }
    }
}

RequestHandler mRequestHandler = new RequestHandler(new RequestHandler.RequestHandlerCallback() {
    /**
     * @param result The result state. The possible values are
     *               RequestHandler.JOB_REQUEST_RESULT_FAILURE = 0;
     *               RequestHandler.JOB_REQUEST_RESULT_SUCCESS = 1;
     *               RequestHandler.JOB_REQUEST_RESULT_SECURITY_ERROR = 2;
     *               RequestHandler.JOB_REQUEST_RESULT_CANCEL = 3;
     *               RequestHandler.JOB_REQUEST_RESULT_PACKAGE_ERROR = 4;
     *               RequestHandler.JOB_REQUEST_RESULT_PREVIOUS_CRASH = 5;
     *               RequestHandler.JOB_REQUEST_RESULT_POSTPONED = 9;
     * @param outFilename The reflowable HTML file name
     * @param customData The custom data
     */
    @Override
    public void RequestHandlerProc(int result, String outFilename, Object customData) {
        if (result == RequestHandler.JOB_REQUEST_RESULT_SUCCESS) {
            // int pageNum = (int) customData;
            // The reflowable HTML file of page pageNum exists in outFilename.
        }
    }
});
```

To cancel all reflow requests, call ReflowProcessor.cancelAllRequests();

Finally, if you want to clear all HTML files created in the cache you may need to call ReflowProcessor.clearCache().
