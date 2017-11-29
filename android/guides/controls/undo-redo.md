# Undo/Redo Support 

PDFTron supports undo/redo for any manipulation on the document. For convenience reasons, we have provided a class called `UndoRedoManger` to facilitate undo/redo. This class is by default attached to `ToolManager` class. In other words, if you are using `ToolManger` you don't need to do anything to make undo/redo work. Just ensure you raise the appropriate events existing in `ToolManager` when you manipulate the document:

- `void raiseAnnotationsAddedEvent(Map<Annot,Integer>)`: Call this function when annotations have been added to the document.

- `void raiseAnnotationsPreModifyEvent(Map<Annot,Integer>)`: Call this function before annotations in the document are modified.

- `void raiseAnnotationsModifiedEvent(Map<Annot,Integer>)`: Call this function when annotations in the document have been modified.

- `void raiseAnnotationsPreRemoveEvent(Map<Annot,Integer>)`: Call this function before annotations are removed from the document.

- `void raiseAnnotationsRemovedEvent(Map<Annot,Integer>)`: Call this function when annotations have been removed from the document.

- `void raiseAnnotationsRemovedEvent(int)`: Call this function when all annotations in the specified page have been removed from the document.

- `void raiseAllAnnotationsRemovedEvent()`: Call this function when all annotations in the document have been removed.

- `void raiseAnnotationActionEvent()`: Call this function when an action has taken place that changes the document.

- `void raiseBookmarkModified()`: Call this function when document bookmark has been modified.

- `void raisePagesCropped()`: Call this function when pages of the document have been cropped.

- `void raisePagesAdded(List<Integer>)`: Call this function when new pages have been added to the document.

- `void raisePagesDeleted(List<Integer>)`: Call this function when pages have been deleted from the document.

- `void raisePagesRotated(List<Integer>)`: Call this function when pages in the document have been rotated.

- `void raisePageMoved(int, int)`: Call this function when a page in the document have been moved to a new position.

## Undo/Redo operation

To do undo/redo operation simply call

``` android
String undoInfo = mToolManager.getUndoRedoManger().undo()
```
or
``` android
String redoInfo = mToolManager.getUndoRedoManger().redo()
```
The `undoInfo`/`redoInfo` contains the information about the action that has been undone/redone; for example, it can be something like this when the undo/redo action is corresponding to annotation addition:

`{"Action":"Add Text Box","Annot Info":"{\"Page Numbers\":\"1 \",\"Rects\":\"197 511 307 534 \"}"}`

From this you can understand the action was adding a text box in page 1 at the rectangle (197 511 307 534). This information can be used later, for example, in jumping to the last modification which will be explained in the next section.

## Jump to Undo/Redo
If you are in the PDF view and like the view to jump to the undo/redo changes you can call
``` android
mToolManager.getUndoRedoManger().jumpToUndoRedo(PDFViewCtrl, String, boolean)
```
This function will show the transition with an animation. The second input argument is the attached information to undo action, and the third argument specifies if the action was undo or redo.

## Information about Undo/Redo action
There area several facility functions provided in UndoRedoManger to see the action you can undo/redo, including

- `boolean canUndo()`: determines if there is any action to undo in the stack of undo/redo.

- `boolean canRedo()`: determines if there is any action to redo in the stack of undo/redo.

- `String getNextUndoAction()`: gets the information attached to the next undo action

- `String getNextRedoAction()`: gets the information attached to the next redo action

The information attached to the undo/redo action can be used to determine the type of action:

- `boolean isAddAnnotationAction(Context, String)`: checks if the information attached to an undo is related to adding annotations

- `boolean isModifyAnnotationAction(Context, String)`: checks if the information attached to an undo is related to modifying annotations

- `boolean isRemoveAnnotationAction(Context, String)`: checks if the information attached to an undo is related to removing annotations

- `boolean isAddPagesAction(Context, String)`: checks if the information attached to an undo is related to adding pages

- `boolean isDeletePagesAction(Context, String)`: checks if the information attached to an undo is related to deleting pages

- `boolean isRotatePagesAction(Context, String)`: checks if the information attached to an undo is related to rotating pages

- `boolean isMovePageAction(Context, String)`: checks if the information attached to an undo is related to moving a page

- `boolean isEditPageAction(Context, String)`: checks if the information attached to an undo is related to editing (adding, deleting, rotating, moving) pages

## `Caution`
We highly recommend to call `UndoRedoManger.takeUndoSnapshotForSafety()` before saving the document in case any manipulation to the document has not been raised in ToolManager class; otherwise, the document may be corrupted.

# Build your own Undo/Redo Manager
If you don't use ToolManger or you'd like to have you own undo/redo control you need to enable undo/redo as the first step:
``` android
mPdfViewCtrl.enableUndoRedo();
```
You can see if the undo/redo is enabled in the PDF view using:
``` android
boolean isUndoRedoEnabled = mPdfViewCtrl.isUndoRedoEnabled();
```

## Undo/Redo Snapshots
After enabling undo/redo, you should determine the snapshots for undo/redo operations, i.e. calling the followings when there is a modification on the document (or if you prefer after a short period of time):

``` android
try {
    mPdfViewCtrl.takeUndoSnapshot(info);
} catch (Exception e) {
    e.printStackTrace();
}
```

If you have at least one undo snapshot you can back to the last modification using `PDFViewCtrl.undo()` and get the information you passed through when taking undo snapshot:

``` android
try {
    mPdfViewCtrl.cancelRendering();
    info = mPdfViewCtrl.undo();
} catch (Exception e) {
    e.printStackTrace();
}
```

Or, if you have any undo in the stack you can redo the last undo by

``` android
try {
    mPdfViewCtrl.cancelRendering();
    info = mPdfViewCtrl.redo();
} catch (Exception e) {
    e.printStackTrace();
}
```

## Last but not least
Again, don't forget to take an undo snapshot before saving the document:

``` android
boolean shouldUnlock = false;
try {
    mPdfViewCtrl.docLock(false);
    shouldUnlock = true;
    if (mPdfViewCtrl.getDoc().hasChangesSinceSnapshot()) {
        mPdfViewCtrl.takeUndoSnapshot("Safety");
    }
} catch (PDFNetException | JSONException e) {
    e.printStackTrace();
} finally {
    if (shouldUnlock) {
        mPdfViewCtrl.docUnlock();
    }
}
```
