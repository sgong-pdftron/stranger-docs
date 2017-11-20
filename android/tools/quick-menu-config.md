# Quick menu config

A Configuration for quick menu type and icon pair.

## Basic example:
### Get icon resource id by menu type:
```
QuickMenuConfig.getInstance().getMenuIconId("appearance");
```
### Get customized Icon resource id only by menu type:
```
QuickMenuConfig.getInstance().getMenuIconId("appearance", false);
```
### Add a customized menu type and icon pair:
```
QuickMenuConfig.getInstance().putIconMenuMap("appearance", R.drawable.ic_android);
```
### Add entire customized menu type and icon set:
```
HashMap<String, Integer> map = new HashMap<>();
map.put("appearance", R.drawable.ic_android);
QuickMenuConfig.getInstance().putIconMenuMap(map);
```

## Default menu type and icon set:
| Type                      | Icon ResourceId                              | Icon                                             |
|---------------------------|----------------------------------------------|--------------------------------------------------|
| [QM_APPEARANCE]()    | R.drawable.ic_color_lens_black_24dp          | ![](./img/ic_color_lens_black_24dp.PNG)          |
| [QM_HIGHLIGHT]()     | R.drawable.annotation_highlight              | ![](./img/annotation_highlight.png)              |
| [QM_UNDERLINE]()     | R.drawable.annotation_underline              | ![](./img/annotation_underline.png)              |
| [QM_NOTE]()          | R.drawable.annotation_sticky_note            | ![](./img/annotation_sticky_note.PNG)            |
| [QM_STICKY_NOTE]()   | R.drawable.annotation_sticky_note            | ![](./img/annotation_sticky_note.PNG)            |
| [QM_STRIKEOUT]()     | R.drawable.annotation_strikeout              | ![](./img/annotation_strikeout.PNG)              |
| [QM_SQUIGGLY]()      | R.drawable.annotation_squiggly               | ![](./img/annotation_squiggly.PNG)               |
| [QM_LINK]()          | R.drawable.ic_link_black_24dp                | ![](./img/ic_link_black_24dp.PNG)                |
| [QM_SIGNATURE]()     | R.drawable.annotation_signature              | ![](./img/annotation_signature.PNG)              |
| [QM_FLOATING_SIG]()  | R.drawable.annotation_signature              | ![](./img/annotation_signature.PNG)              |
| [QM_STAMPER]()       | R.drawable.annotation_stamper                | ![](./img/annotation_stamper.PNG)                |
| [QM_FREEHAND]()      | R.drawable.annotation_free_hand              | ![](./img/annotation_free_hand.png)              |
| [QM_INK_ERASER]()    | R.drawable.annotation_eraser                 | ![](./img/annotation_eraser.PNG)                 |
| [QM_FREE_TEXT]()     | R.drawable.annotation_free_text              | ![](./img/annotation_free_text.PNG)              |
| [QM_LINE]()          | R.drawable.annotation_line                   | ![](./img/annotation_line.PNG)                   |
| [QM_ARROW]()         | R.drawable.annotation_arrow                  | ![](./img/annotation_arrow.PNG)                  |
| [QM_RECTANGLE]()     | R.drawable.annotation_square                 | ![](./img/annotation_square.PNG)                 |
| [QM_OVAL]()          | R.drawable.annotation_circle                 | ![](./img/annotation_circle.PNG)                 |
| [QM_TRANSLATE]()     | R.drawable.ic_translate_black_24dp           | ![](./img/ic_translate_black_24dp.PNG)           |
| [QM_EDIT]()          | R.drawable.ic_edit_black_24dp                | ![](./img/ic_edit_black_24dp.PNG)                |
| [QM_SEARCH]()        | R.drawable.ic_search_black_24dp              | ![](./img/ic_search_black_24dp.PNG)              |
| [QM_SHARE]()         | R.drawable.ic_share_black_24dp               | ![](./img/ic_share_black_24dp.PNG)               |
| [QM_OPEN]()          | R.drawable.ic_arrow_forward_black_24dp       | ![](./img/ic_arrow_forward_black_24dp.PNG)       |
| [QM_DELETE]()        | R.drawable.ic_delete_black_24dp              | ![](./img/ic_delete_black_24dp.PNG)              |
| [QM_OVERFLOW_MENU]() | R.drawable.ic_more_vert_black_24dp           | ![](./img/ic_more_vert_black_24dp.PNG)           |
| [QM_DEFINE]()        | R.drawable.ic_dictionary                     | ![](./img/ic_dictionary.PNG)                     |
| [QM_COPY]()          | R.drawable.ic_content_copy_black_24dp        | ![](./img/ic_content_copy_black_24dp.PNG)        |
| [QM_TTS]()           | R.drawable.ic_play_circle_outline_black_24dp | ![](./img/ic_play_circle_outline_black_24dp.PNG) |
| [QM_PASTE]()         | R.drawable.ic_content_paste_black_24dp       | ![](./img/ic_content_paste_black_24dp.PNG)       |
| [QM_TYPE]()          | R.drawable.annotation_type                   | ![](./img/annotation_type.PNG)                   |
| [QM_ROTATE]()   | R.drawable.ic_rotate_right_black_24dp        | ![](./img/ic_rotate_right_black_24dp.PNG)        |
| [QM_TEXT]()     | R.drawable.ic_edit_black_24dp                | ![](./img/ic_edit_black_24dp.PNG)                |
