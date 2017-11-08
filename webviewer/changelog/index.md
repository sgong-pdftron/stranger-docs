# Version 3.0.1 Changelog (2017-06-29)

### PDFNetJS Updates

- Added Document.getOfficeResources to get the resources used by a given page in an office document
- Fix issue where the PDF worker would be unnecessarily loaded when loading an office file
- Fix issue with error handling where some errors could be misreported as license errors

### WebViewer HTML5 Updates

- Added Tools.Tool.ENABLE_AUTO_SWITCH to disable automatic switching of the pan and text select tools
- Fixed issue where WebViewer.js would warn about certain options not being valid even though they actually were
- Fixed issue in FreeText annotations with auto font size and a large height the initial font size would be very large
- Fixed issue with potential rerendering of pages when the cache size is small
- Fixed issue where the "Current Page" print option wasn't localizable
- Fixed issue where checkboxes and radio buttons weren't visible in the latest Firefox version
- Fixed issue with the annotation edit tool where the annotation canvas could be incorrectly translated when in viewport rendering mode
- Fixed issue where search could fail on some older XOD files