# PDFNet document locking

As computing devices become more parallel in nature, PDFNet is evolving to allow developers to leverage this power in new and exciting ways. PDFNet version 6.0 introduces new locking semantics which allow for concurrent access of a [`PDFDoc`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFDoc.html) instance. This was done to improve performance during interactive viewing (simultaneous rendering, text extraction, etc.), as well as to open up the possibility for new use cases (parallel rendering). This article introduces the locking system, and will get you on your way to developing parallel applications with PDFNet SDK.

## PDFDoc lock

PDFNet uses a recursive read/write locking system. Multiple threads can hold a read lock on the document, **but only one thread can hold a write lock at any given time**. A thread can acquire an equivalent or weaker lock as many times as it likes without causing a deadlock. In other words, the following is valid:

```java
PDFDoc d = new PDFDoc("foo.pdf");
d.lock();
d.unlock();
d.lockRead();
d.unlockRead();
```

However, a **thread cannot acquire a write lock while holding a read lock**. Because one can only acquire a write lock when no read locks are held, this situation would inevitably lead to a deadlock. To avoid this scenario, PDFNet will throw a runtime exception whenever the situation occurs.

## Locking in the PDFNet API

Some of our API calls internally acquire a write lock on the document. As a result, these calls can also throw a runtime exception if they are invoked while holding a read lock. This is noted in each method's documentation. Additionally, you will find a complete list of those methods at the end of this article.

In general, the parts of our library that manage the UI will maintain document locks. **For the lower level calls which actually modify the document, you are responsible for maintaining document locks.**

## Client side locking

PDFNet provides the following APIs for locking the document:

```java
void PDFDoc.lock()
bool PDFDoc.tryLock(int milliseconds)
void PDFDoc.unlock()
void PDFDoc.lockRead()
bool PDFDoc.tryLockRead(int milliseconds)
void PDFDoc.unlockRead()
```

For convenience, [`PDFViewCtrl`](http://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html) expose similar methods, which will be applied to the document currently associated with the control. Additionally, the [`PDFViewCtrl.docLock()`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFViewCtrl.html#docLock(boolean)) method takes a `cancel_threads` parameter, which will interrupt all worker threads currently accessing the document. This allows you to acquire the write lock as fast as possible:

```java
void PDFViewCtrl.docLock(bool cancel_threads)
bool PDFViewCtrl.docTryLock(int milliseconds)
void PDFViewCtrl.docUnlock()
void PDFViewCtrl.docLockRead()
bool PDFViewCtrl.docTryLockRead(int milliseconds)
void PDFViewCtrl.docUnlockRead()
```

## Filters (TODO change to android's specific filter)

At the low level, a [`PDFDoc`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFDoc.html) uses an `input filter` to access its PDF data. this data could be stored on the file system, in a memory buffer, or over a network. Now that PDFNet supports concurrent access of PDFDocs across many threads, these input filters must also be made thread-safe. StdFile, which was not a thread-safe filter, is no longer available. Instead, you should now use the new [`MappedFile`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/filters/MappedFile.html) filter, which provides thread-safe and efficient read access on a file. Custom user filters are still supported, although they are now wrapped in an internal filter that guarantees thread safety.

## Migration of earlier code

The new locking system is backwards compatible, meaning previous calls to [`PDFDoc.lock()`](https://www.pdftron.com/pdfnet/mobile/docs/Android/pdfnet/javadoc/reference/com/pdftron/pdf/PDFDoc.html#lock()) now acquire a write lock. If you would like to take advantage of the ability to read a PDF concurrently, it is your responsibility to review document locks and determine whether it is safe to downgrade them to a read lock.

## Opting out

Conversely, if you are happy with the existing *'one document, one thread'* model previously used in PDFNet 5.9., you can continue to work with this system. No change is required on your behalf.

## API calls which can acquire a write lock

### PDFViewCtrl
```java
void PDFViewCtrl.closeDoc()
void PDFViewCtrl.setDoc()
```
