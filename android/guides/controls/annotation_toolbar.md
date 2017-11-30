# Annotation toolbar
With annotation toolbar users are able to conveniently create and switch between different tools. 

![](gif/annotation-toolbar.gif "Annotation toolbar")

# How to show annotation toolbar
Annotation toolbar lets user to easily select their tools when adding annotations to the document. 

To set up your layout with annotation toolbar, add a `<AnnotationToolbar>` element to your XML layout. For example, your layout may look like this:

```java
<com.pdftron.pdf.controls.AnnotationToolbar
    android:id="@+id/annotationToolbar"
    android:layout_width="match_parent"
    android:layout_height="?android:attr/actionBarSize"
    android:background="@color/controls_annotation_toolbar_background"
    android:elevation="@dimen/actionbar_elevation"/>
```

Then, you need to attach a tool manager to the annotation toolbar:

```java
AnnotationToolbar annotationToolbar = view.findViewById(R.id.annotationToolbar);
annotationToolbar.setup(anchorView, toolManager);
annotationToolbar.show(toolbarHeight);
```

The `anchorView` is used as an anchor for annotation property popup windows. To close the annotation toolbar call:
```java
annotationToolbar.close();
```

## Undo/Redo

If undo/redo is enabled in the `PDFViewCtrl` then the buttons for undo/redo are also provided as popup windows when the user clicks on three vertical dots at the end right of the toolbar.

# Listeners

You should set a listener via `setAnnotationToolbarListener(AnnotationToolbarListener)` to be notified when the annotation toolbar is shown or closed, as well as when the annotation toolbar should be shown by pressing the corresponding shortcut.

To be notified when undo/redo buttons are clicked you should call `setOnUndoRedoListener(OnUndoRedoListener)`.

# Continuous annotation edit

If you like the annotation toolbar does not return to the hand tool after an annotation is created you should call
```java
annotationToolbar.setButtonStayDown(true);
```
By default the annotation toolbar returns to the pan tool after an annotation is created.

# Style
You can change the style by calling the following methods:
- `setNormalStateSpinnerBtnBackground(int)`: for changing the normal state spinner button background
- `setNormalStateBtnBackground(int)`: for changing the normal state button background
- `setNormalStateToolbarColor(int)`: for changing the normal state toolbar color
