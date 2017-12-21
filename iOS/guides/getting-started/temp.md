1. For the **latest** release of **both** `PDFNet.framework` and `Tools.framework`:

  ```
target '<Your-Target-Name>' do
  use_frameworks!
  pod 'PDFNet', podspec: 'asd asd '
end
```

2. For the a **specific** release of **both** `PDFNet.framework` and `Tools.framework` (in this case 6.8.0.12345):

  ```
target '<Your-Target-Name>' do
  use_frameworks!
  pod 'PDFNet', podspec: 'asd asd'
end
```
