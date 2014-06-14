/**
 * The onOpen function runs automatically when the Google Docs document is
 * opened. Use it to add custom menus to Google Docs that allow the user to run
 * custom scripts. For more information, please consult the following two
 * resources.
 *
 * Extending Google Docs developer guide:
 *     https://developers.google.com/apps-script/guides/docs
 *
 * Document service reference documentation:
 *     https://developers.google.com/apps-script/reference/document/
 */
function onOpen() {
  // Add a menu with some items, some separators, and a sub-menu.
  DocumentApp.getUi().createMenu('Handy Info Boxes')
  .addItem('Insert Warning Box', 'insertWarningTableAtCursor')
  .addItem('Insert Information Box', 'insertInfoTableAtCursor')
  .addItem('Insert Terminal Command', 'insertTerminalTableAtCursor')
  .addToUi();
}
/**
 * Inserts a warning box under the current cursor location
 */
function insertWarningTableAtCursor() {
  /*
   Setup the style for the whole box (yellow for warning)
  */
  var style = setupStyle('#F4EAC1','#000000', true);
  style[DocumentApp.Attribute.BORDER_WIDTH] = 2;
  
  insertGenericTableAtCursor('Warning Box',style,'Warning: Warning Text goes here','0B1d2AYWnsGhXVWYtbnAxemFXRmc');
  
}

/**
 * Inserts an information box under the current cursor location
 */
function insertInfoTableAtCursor() {
  
  /*
   Setup the style for the whole box (blue for information)
  */
  var style = setupStyle('#c9daf8','#000000', true);
  style[DocumentApp.Attribute.BORDER_WIDTH] = 2;
  insertGenericTableAtCursor('Information Box',style,'Information: Information Text goes here','0B1d2AYWnsGhXc2hObDhrTU1RcHc');
}

function insertTerminalTableAtCursor() {
  /*
   Setup the style for the whole box (black for terminal)
  */
  var style = setupStyle('#000000','#FFFFFF', true);
  style[DocumentApp.Attribute.BORDER_WIDTH] = 2;
  style[DocumentApp.Attribute.BORDER_COLOR] = '#999999';
  insertGenericTableAtCursor('Terminal Box',style,'ls','0B1d2AYWnsGhXLXJPM2hqUEpfM2s');
}
