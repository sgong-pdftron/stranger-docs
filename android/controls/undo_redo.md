# Undo/Redo Support 

PDFTron supports undo/redo for any manipulation on the document. For convenience reasons, we have provided a class called UndoRedoManger to facilitate undo/redo. This class is by default attached to ToolManager class. In other words, if you are using ToolManger you don't need to do anything to make undo/redo enabled. Just ensure you raise the appropriate events existing in ToolManager when you manipulate the document:

- `void raiseAnnotationsAddedEvent(Map<Annot,Integer>)`

- `void raiseAnnotationsPreModifyEvent(Map<Annot,Integer>)`

- `void raiseAnnotationsModifiedEvent(Map<Annot,Integer>)`

- `void raiseAnnotationsPreRemoveEvent(Map<Annot,Integer>)`

- `void raiseAnnotationsRemovedEvent(Map<Annot,Integer>)`

- `void raiseAllAnnotationsRemovedEvent()`

- `void raiseAnnotationActionEvent()`

- `void raiseBookmarkModified()`

- `void raisePagesCropped()`

- `void raisePagesAdded(List<Integer>)`

- `void raisePagesDeleted(List<Integer>)`

- `void raisePagesRotated(List<Integer>)`

- `void raisePageMoved(int, int)`

To do undo/redo operation simply call

``` android
String undoInfo = mToolManager.getUndoRedoManger().undo()
```
or
``` android
String redoInfo = mToolManager.getUndoRedoManger().redo()
```

## Jump to Undo/Redo
Additionally, if you are in the PDF view and like the view to jump to the undo/redo changes you can call
``` android
mToolManager.getUndoRedoManger().jumpToUndoRedo(PDFViewCtrl, String, boolean)
```
This function will show the transition with an animation.

## Next Undo/Redo actions
There area several facility functions provided in UndoRedoManger to see the action you can undo/redo, including

- `canUndo()`

- `canRedo()`

- `getNextUndoAction()`

- `getNextRedoAction()`

## `Caution`
We highly recommend to call `UndoRedoManger.takeUndoSnapshotForSafety()` before saving the document in case any manipulation to the document has not been raised in ToolManager class; otherwise, the document may be corrupted.

# Build your own Undo/Redo Manager
If you don't use ToolManger or you'd like to have you own undo/redo control you need to enable undo/redo as the first step:
``` android
mPdfViewCtrl.enableUndoRedo()
```
You can see if the undo/redo is enabled in the PDF view using:
``` android
mPdfViewCtrl.isUndoRedoEnabled()
```

## Undo/Redo Snapshots
After enabling undo/redo, you should determine the snapshots for undo/redo operations, i.e. calling the followings when there is a modification on the document (or if you prefer after a short period of time):

``` android
try {
    mPDFViewCtrl.takeUndoSnapshot(info);
} catch (Exception e) {
    e.printStackTrace();
}
```

If you have at least one undo snapshot you can back to the last modification using `PDFViewCtrl.undo()` and get the information you passed through when taking undo snapshot:

``` android
try {
    mPdfViewCtrl.cancelRendering();
    info = mPDFViewCtrl.undo();
} catch (Exception e) {
    e.printStackTrace();
}
```

Or, if you have any undo in the stack you can redo the last undo by

``` android
try {
    mPdfViewCtrl.cancelRendering();
    info = mPDFViewCtrl.redo();
} catch (Exception e) {
    e.printStackTrace();
}
```

## Last but not least
Again, don't forget to take an undo snapshot before saving the document:

``` android
boolean shouldUnlock = false;
try {
    mPDFViewCtrl.docLock(false);
    shouldUnlock = true;
    if (pdfDoc.hasChangesSinceSnapshot()) {
        mPDFViewCtrl.takeUndoSnapshot("Safety");
    }
} catch (PDFNetException | JSONException e) {
    e.printStackTrace();
} finally {
    if (shouldUnlock) {
        mPDFViewCtrl.docUnlock();
    }
}
```
