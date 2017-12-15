---
title: Realtime Collaboration
---
### Setting up realtime collaboration with WebViewer and Firebase
WebViewer contains APIs that allow you to export/import annotations from/to a document. Using those APIs and a server, you can set up realtime collaboration easily. This tutorial provides a simple example that covers:

- Authenticating users
- Exporting/Importing annotation data to/from server
- Setting the user permissions of each annotation on both server and client side

### Initial setup - HTML
1. Download the [WebViewer SDK](https://www.pdftron.com/webviewer/download.html) and unzip the package.
2. Copy lib/ folder to a location on your web server.
3. Create an HTML page.
4. Add the following scripts to the <head> of the HTML page. WebViewer.js depends on jQuery so it must be included. Instead of including WebViewer.js you could include WebViewer.min.js which is a minified version of the file.
```html
<script src="jquery-3.2.1.min.js"></script>
<script src="lib/WebViewer.js"></script>
```

5. Add necessary scripts server methods. In this tutorial, we are going to include Firebase library and a separate file named `server.js`
```html
<script src="https://www.gstatic.com/firebasejs/3.5.3/firebase.js"></script>
<script src="server.js"></script>
```

6. Add a script to initiate and use WebViewer.
```html
<script src="main.js"></script>
```

7. Add a stylesheet to style the WebViewer element and some other user feedback elements.
```html
<link rel="stylesheet" href="index.css">
```

8. Create a <div> tag in the HTML <body> and give it an id. This will be the container for the WebViewer
```html
<div id="viewer"></div>
```

9. Create a few more <div> tags in the HTML <body> as the following. These will be the used for a user to setup a name, or to show a returning user's name.
```html
<div class="popup returning-user">
  <div class="greeting">Welcome back</div>
  <div class="name"></div>
</div>
<div class="popup new-user">
  <div class="greeting">Welcome! Tell us your name :)</div>
  <input class="name" autofocus />
  <div class="button">Start</div>
</div>
```

### Server - JavaScript

In realtime collaboration, a server will merely act as an online database that triggers events upon data creation/modification/deletion. As long as the above requirement is met, your server can be built in any language and stack of your choice. For the simplicity of this tutorial, we will be using [Firebase](https://firebase.google.com/).

1. Go to the [Firebase Console](https://console.firebase.google.com/), login and create a project.
2. Click "Add Firebase to your Web App" and copy the whole code for "Initializing Firebase". If `storageBucket` is empty, close the popup and try again (that's a known bug from Firebase).
3. Create a JavaScript file and name it `server.js`.
4. Paste the code that you have copied from Firebase. (Note that you should remove the script tags)
5. Store the [firebase.database.References](https://firebase.google.com/docs/reference/js/firebase.database.Reference) for annotations and users. We will use these to create/update/delete data, and listen to data change events as well.

```javascript
window.Server = function() {
  var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID"
  };
  firebase.initializeApp(config);

  this.annotationsRef = firebase.database().ref().child('annotations');
  this.authorsRef = firebase.database().ref().child('authors');
};
```

6. Create a custom bind function for authorization and data using [firebase.auth.Auth#onAuthStateChanged](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged) and [firebase.database.Reference#on](https://firebase.google.com/docs/reference/js/firebase.database.Reference#on).

```javascript
Server.prototype.bind = function(action, callbackFunction) {
  switch(action) {
    case 'onAuthStateChanged':
      firebase.auth().onAuthStateChanged(callbackFunction);
      break;
    case 'onAnnotationCreated':
      this.annotationsRef.on('child_added', callbackFunction);
      break;
    case 'onAnnotationUpdated':
      this.annotationsRef.on('child_changed', callbackFunction);
      break;
    case 'onAnnotationDeleted':
      this.annotationsRef.on('child_removed', callbackFunction);
      break;
    default:
      console.error('The action is not defined.');
      break;
  }
};
```

7. Define a method to check if author exists in the database. We will use [firebase.database.Reference#once](https://firebase.google.com/docs/reference/js/firebase.database.Reference#once) and [firebase.database.DataSnapshot#hasChild](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#hasChild) to do so.

```javascript
Server.prototype.checkAuthor = function(authorId, openReturningAuthorPopup, openNewAuthorPopup) {
  this.authorsRef.once('value', function(authors) {
    if (authors.hasChild(authorId)) {
      this.authorsRef.child(authorId).once('value', function(author) {
        openReturningAuthorPopup(author.val().authorName);
      });
    } else {
      openNewAuthorPopup();
    }
  }.bind(this));
};
```

8. Define a sign-in method. In this tutorial, we will use [firebase.auth.Auth#signInAnonymously](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAnonymously).

```javascript
Server.prototype.signInAnonymously = function() {
  firebase.auth().signInAnonymously().catch(function(error) {
    if (error.code === 'auth/operation-not-allowed') {
      alert('You must enable Anonymous auth in the Firebase Console.');
    } else {
      console.error(error);
    }
  });
};
```

9. From the Firebase console click the "Authentication" button on the left panel and then click the "Sign-in Method" tab, just to the right of "Users". From this page click the "Anonymous" button and choose to enable Anonymous login.

10. Define data-write methods using [firebase.database.Reference#set](https://firebase.google.com/docs/reference/js/firebase.database.Reference#set) and [firebase.database.Reference#remove](https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove).

```javascript
Server.prototype.createAnnotation = function(annotationId, annotationData) {
  this.annotationsRef.child(annotationId).set(annotationData);
};

Server.prototype.updateAnnotation = function(annotationId, annotationData) {
  this.annotationsRef.child(annotationId).set(annotationData);
};

Server.prototype.deleteAnnotation = function(annotationId) {
  this.annotationsRef.child(annotationId).remove();
};

Server.prototype.updateAuthor = function(authorId, authorData) {
  this.authorsRef.child(authorId).set(authorData);
};
```

Last but not least, you should add server-side permission rules for writing data. Although client-side permission checking is supported in WebViewer, every user does have access to each annotation's information (including authorId and authorName). Thus, data-write permission should be regulated in the server as well. In this tutorial, we have used Firebase's [Database Rules](https://firebase.google.com/docs/database/security/).

11. Copy the JSON below and paste it in your Firebase Console's Database Rules. From the console click the "Database" button on the left panel and then click the "Rules" tab, just to the right of "Data". This will make sure that trying to modify someone else's annotation isn't allowed.

```javascript
{
  "rules": {
    ".read": "auth != null",

    "annotations": {
      "$annotationId": {
        ".write": "auth.uid === newData.child('authorId').val() || auth.uid === data.child('authorId').val() || auth.uid === newData.child('parentAuthorId').val() || auth.uid === data.child('parentAuthorId').val()"
      }
    },

    "authors": {
      "$authorId": {
        ".write": "auth.uid === $authorId"
      }
    }
  }
}
```

### Client - JavaScript
1. Create a JavaScript file and name it `main.js`.
2. Instantiate WebViewer on a DOM element, making sure to wrap this code and any further code inside `$(document).ready()`. Initial document can be any PDF or XOD file.

```javascript
$(document).ready(function() {
  var viewerElement = document.getElementById('viewer');
  var myWebViewer = new PDFTron.WebViewer({
    type: "html5",
    path: "lib",
    initialDoc: "MY_INITIAL_DOC.pdf",
    documentId: "unique-id-for-this-document",
    enableAnnotations: true,
  }, viewerElement);

});
```

3. Create the server.
```javascript
var server = new Server();
```

4. Bind a callback function to [DocumentViewer.documentLoaded](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.DocumentViewer.html#event:documentLoaded) event. You will then be able to get [annotationManager](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html) and access its methods.

```javascript
$(viewerElement).on('documentLoaded', function() {
  // show the notes panel by default
  myWebViewer.getInstance().showNotesPanel(true);

  var annotationManager = myWebViewer.getInstance().docViewer.getAnnotationManager();
  // Code in later steps will come here...
});
```

5. Inside the documentLoaded callback, bind another callback function to server's onAuthStateChanged event that is defined in `server.js`. A [firebase.User](https://firebase.google.com/docs/reference/js/firebase.User) object will be passed as a parameter.

    1. If the user is not logged in we'll call the sign-in method that we defined in `server.js`.
    2. If the user is logged in, we'll store their `uid` in the `authorId` variable, which will be used for client-side annotation permission checks.
    3. We call `server.checkAuthor` with parameters `authorId`, `openReturningUserPopup` function and `openNewUserPopup` function. These functions will be discussed in next steps.
    4. Then, we will send author information to the server and bind callback functions to annotation events. Details of the callback functions will be discussed in next steps.

```javascript
var authorId = null;

server.bind('onAuthStateChanged', function(user) {
  // User is logged in
  if (user) {
    // Using uid property from Firebase Database as an author id
    // It is also used as a reference for server-side permission
    authorId = user.uid;
    // Check if user exists, and call appropriate callback functions
    server.checkAuthor(authorId, openReturningAuthorPopup, openNewAuthorPopup);
    // Bind server-side data events to callback functions
    // When loaded for the first time, onAnnotationCreated event will be triggered for all database entries
    server.bind('onAnnotationCreated', onAnnotationCreated);
    server.bind('onAnnotationUpdated', onAnnotationUpdated);
    server.bind('onAnnotationDeleted', onAnnotationDeleted);
  }
  // User is not logged in
  else {
    // Login
    server.signInAnonymously();
  }
});
```

6. Define callback functions for `annotationCreated`, `annotationUpdated` and `server.annotationDeleted` events. A data object will be passed as a parameter. For more information, refer to [firebase.database.DataSnapshot](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot).

    1. `openReturningAuthorPopup` is a callback function triggered when author data is found in the database. It will receive authorName as a parameter, and open a popup with the authorName as a visual feedback.
    2. `openNewAuthorPopup` is a callback function triggered when author data is not found. Then we will open a popup for a new author to setup an author name.
    3. `updateAuthor` is a function which will set author name in both client and server using [annotationManager.setCurrentUser](https://www.pdftron.com/webviewer/demo/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#setCurrentUser) and `server.updateAuthor`, respectively.

```javascript
function openReturningAuthorPopup(authorName) {
  annotationManager.setCurrentUser(authorName);
  $('.returning-author .name').html(authorName);
  $('.returning-author').css('display', 'block').click(function(e) {
    e.stopPropagation();
  });
  $('.popup-container').click(function() {
    $('.popup-container').css('display', 'none');
  });
  $('.popup-container').keypress(function(e) {
    if (e.which === 13) {
      $('.popup-container').css('display', 'none');
    }
  });
}

function openNewAuthorPopup() {
  // Open popup for a new author
  $('.new-author').css('display', 'block');
  $('.new-author .button').click(function() {
    var authorName = $('.new-author .name').get(0).value.trim();
    if (authorName) {
      updateAuthor(authorName);
    }
  });
  $('.popup-container').keypress(function(e) {
    var authorName = $('.new-author .name').get(0).value.trim();
    if (e.which === 13 && authorName) {
      updateAuthor(authorName);
    }
  });
}

function updateAuthor(authorName) {
  // The author name will be used for both WebViewer and annotations in PDF
  annotationManager.setCurrentUser(authorName);
  // Create/update author information in the server
  server.updateAuthor(authorId, { authorName: authorName });
  $('.popup-container').css('display', 'none');
}
```

7. Define callback functions for `annotationCreated`, `annotationUpdated` and `server.annotationDeleted` events. A data object will be passed as a parameter. For more information, refer to [firebase.database.DataSnapshot](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot).

    1. `onAnnotationCreated` and `onAnnotationUpdated` have the exact same behavior in this tutorial. They will use [`annotationManager.importAnnotCommand`](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#importAnnotCommand) to update the viewer with the xfdf change.
    2. We also set a custom field `authorId` for the updated annotation to control client-side permission of the created/updated annotation.
    3. `onAnnotationDelete` creates a delete command string from the annotation's id and is simply able to call importAnnotCommand on it.

```javascript
function onAnnotationCreated(data) {
  // data.val() returns the value of server data in any type. In this case, it
  // would be an object with properties authorId and xfdf.
  var annotation = annotationManager.importAnnotCommand(data.val().xfdf)[0];
  annotation.authorId = data.val().authorId;
  annotationManager.redrawAnnotation(annotation);
  myWebViewer.getInstance().fireEvent('updateAnnotationPermission', [annotation]);
}

function onAnnotationUpdated(data) {
  var annotation = annotationManager.importAnnotCommand(data.val().xfdf)[0];
  annotation.authorId = data.val().authorId;
  annotationManager.redrawAnnotation(annotation);
}

function onAnnotationDeleted(data) {
  // data.key would return annotationId since our server method is designed as
  // annotationsRef.child(annotationId).set(annotationData)
  var command = '<delete><id>' + data.key + '</id></delete>';
  annotationManager.importAnnotCommand(command);
}
```

8. After server callback functions are bound, we'll also bind a function to [annotationManager.annotationChanged](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#event:annotationChanged) event.

    1. First parameter, `e`, has a property `imported` that is set to `true` by default for annotations internal to the document and annotations added by `importAnnotCommand`.
    2. Then we iterate through the annotations that are changed, which is passed as the second parameter.
    3. Third parameter, type, defines which action it was. In this tutorial, we'll have the same behavior for both `add` and `modify` action types.
    4. When annotations are added and modified, we will call `server.createAnnotation` or `server.updateAnnotation` which needs four variables: `annotationId`, `authorId`, `parentAuthorId` and `xfdf`.
    5. `annotationId` can be retrieved from [annotation.Id](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/Annotations.Annotation.html#Id).
    6. `authorId` was saved as a reference when user logged in.
    7. `parentAuthorId` refers to the parent annotation's author id, if any. This will be used to distinguish replies, and will be referenced in server-side permission. Thus, we retrieve `authorId` of the parent annotation by using annotation.InReplyTo, which returns the annotation id of the parent annotation.
    8. `xfdf` can be retrieved using [`annotationManager.getAnnotCommand`](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#getAnnotCommand). It will get an XML string specifying the added, modified and deleted annotations, which can be used to import the annotation using (`annotationManager.importAnnotCommand`)[http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#importAnnotCommand] in server data callback functions.

```javascript
annotationManager.on('annotationChanged', function(e, annotations, type) {
  if (e.imported) {
    return;
  }
  annotations.forEach(function(annotation) {
    if (type === 'add') {
      var xfdf = annotationManager.getAnnotCommand();
      var parentAuthorId = null;
      if (annotation.InReplyTo) {
        var parentAuthorId = annotationManager.getAnnotationById(annotation.InReplyTo).authorId || 'default';
      }
      server.createAnnotation(annotation.Id, {
        authorId: authorId,
        parentAuthorId: parentAuthorId,
        xfdf: xfdf
      });
    } else if (type === 'modify'){
      var xfdf = annotationManager.getAnnotCommand();
      var parentAuthorId = null;
      if (annotation.InReplyTo) {
        var parentAuthorId = annotationManager.getAnnotationById(annotation.InReplyTo).authorId || 'default';
      }
      server.updateAnnotation(annotation.Id, {
        authorId: authorId,
        parentAuthorId: parentAuthorId,
        xfdf: xfdf
      });
    } else if (type === 'delete') {
      server.deleteAnnotation(annotation.Id);
    }
  });
});
```

9. Lastly, we will overwrite the client-side permission checking function using [`annotationManager.setPermissionCheckCallback`](http://localhost/webviewer/webviewerjs/lib/html5/doc/symbols/CoreControls.AnnotationManager.html#setPermissionCheckCallback). The default is set to compare the authorName. Instead, we will compare authorId created from the server.

```javascript
annotationManager.setPermissionCheckCallback(function(author, annotation) {
  return annotation.authorId === authorId;
});
```

### Styling - CSS

Width and height of the WebViewer element must be specified with css. Styling for author name popup is also added in this tutorial. Create a file named index.css with the following content.

```css
html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.popup-container {
  width: 100%;
  height: 100%;

  position: fixed;
  left: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.5);
}

.popup {
  display: none;

  padding: 30px;
  border-radius: 10px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 1);
  font-family: Verdana;
  text-align: center;
  line-height: 2em;
}

.greeting {
  margin-bottom: 10px;
}

.name {
  font-size: 25px;
  font-weight: bold;
}

.new-author .name {
  float: left;

  width: 170px;
  height: 50px;
  padding: 0 20px;
  border: 1px black;
  border-style: solid none solid solid;
  border-radius: 5px 0 0 5px;

  outline: none;
}

.new-author .button {
  float: right;

  height: 50px;
  padding: 0 20px;
  border: 1px solid black;
  border-radius: 0 5px 5px 0;

  background: white;
  cursor: pointer;
  line-height: 50px;
}
```

### Conclusion
At this point you should be able to have multiple people access the HTML page from your server and add/modify/delete annotations in real time. To test it out yourself you could try opening it in multiple browsers or in an incognito window to simulate multiple users.
