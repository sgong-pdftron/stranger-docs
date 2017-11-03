# quick-menu-item

## Quick Menu Item

A menu item for quick menu. that defines menu type, menu display text, menu icon color, and menu opacity here. It auto generates menu icon resource from [QuickMenuConfig](./quick-menu-config.md). There are three possible display modes:

##### FIRST_ROW_MENU
  _int FIRST_ROW_MENU_

  Display the menu item in first row.

  Constant Value: 0

#### SECOND_ROW_MENU
  _int SECOND_ROW_MENU_

  Display the menu item in second row.

  Constant Value: 1

#### OVERFLOW_ROW_MENU
  _int OVERFLOW_ROW_MENU_

  Display the menu item in overflow menu list.

  Constant Value: 2
### Initialize Quick Menu Item
```
// creates a quick menu item with type "appearance", display text: "style",
// and show in first row.
QuickMenuItem menuItem = new QuickMenuItem("apperance", "style", FIRST_ROW_MENU);
```

### Customize
#### set display text
```
menuItem.setText("customized display text");
```
#### set icon resource
```
menuItem.setIconRes(R.drawable.ic_android);
```
#### set icon color
```
menuItem.setIconColor(Color.red);
```
#### set menu item opacity
```
menuItem.setIconOpacity(0.54);
```
