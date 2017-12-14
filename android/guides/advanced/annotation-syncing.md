# Annotation syncing

PDFNet supports annotation syncing between different clients. All the required locking, change tracking, merging and view updating are handled internally. Below are instructions on how to handle the import and export of annotation changes on the client side. Not described here is how a server would handle the data. However, data that needs to be stored on server side are all primitive types and will be compatible with any cloud database services.

## Requirements

Here are a few requirements for syncing to work as expected:
- A valid and unique string identifier is needed for the userId.
- Annotation changes are stored as XFDF command strings, which PDFNet generates when changes are made. However, any custom modification to the XFDF command string might lead to unexpected results. Thus, modification to the XFDF command string is not recommended.
- Existing annotations that do not have a unique identifier will not work, it is recommended that you pre-process all annotations to make sure they all have unique identifier.
- [Undo and redo](/android/guides/basics/undo-redo) will be automatically enabled upon using annotation syncing feature.

## Initialize and sending annotation changes

Add the following after initialize ToolManager:
```java
mToolManager.enableAnnotManager("myUserId", new AnnotManager.AnnotManagerListener() {
    @Override
    public void sendAnnotationEvents(String action, String xfdfCommand) {
        // an annotation change event has happened,
        // now is the time to send the XFDF command string to your cloud service
        // action is one of {@link AnnotManager.AnnotationAction#ADD}
        //                  {@link AnnotManager.AnnotationAction#MODIFY}
        //                  {@link AnnotManager.AnnotationAction#DELETE}
        //                  {@link AnnotManager.AnnotationAction#UNDO}
        //                  {@link AnnotManager.AnnotationAction#REDO}
        // xfdfCommand is the XFDF command string, modification to this string is not recommended
    }
});
```

PDFNet will generate a unique identifier for every annotation created through PDFNet SDK. However, if you would like to generate your own annotation identification, you will be able to do so as follows:
```java
mToolManager.setExternalAnnotationManagerListener(
    new ToolManager.ExternalAnnotationManagerListener() {
        @Override
        public String generateKey() {
            return "someAnnotId";
        }
    });
```

## Receiving annotation changes
When an annotation change event is received from cloud service, add the following to notify viewer about the change:
```java
public void receivedAnnotationEvents(String xfdfCommand) {
    if (mToolManager.getAnnotManager() != null) {
        mToolManager.getAnnotManager().onCloudChange(xfdfCommand);
    }
}
```

## Jump to annotation
To jump to an annotation by id:
```java
public void jumpToAnnotation(String annotId) {
    if (mToolManager.getAnnotManager() != null) {
        mToolManager.getAnnotManager().jumpToAnnot(annotId);
    }
}
```
