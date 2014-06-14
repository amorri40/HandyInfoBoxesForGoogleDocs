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
  DocumentApp.getUi().createMenu('NSN Plugin')
  .addItem('Insert Warning Box', 'insertWarningTableAtCursor')
  .addItem('Insert Information Box', 'insertInfoTableAtCursor')
  .addItem('Insert Terminal Command', 'insertTerminalAtCursor')
  .addToUi();
}
/**
 * Inserts a warning box under the current cursor location
 */
function insertWarningTableAtCursor() {
  if (!doesTheUserWantToContinue('This will insert a warning Box at your current cursor location, are you sure you want to do this?')) return;
  
  var cursor = DocumentApp.getActiveDocument().getCursor();

  if (!cursor) {showCursorError(); return;}
  
  /*
   Setup the style for the whole box (yellow for warning)
  */
  var style = setupStyle('#fff2cc','#000000', true);
  
  /*
  Create the main table
  */
  var cells = [['', 'Warning: Warning Text goes here']];
  
  var warningTable = insertTableAtCursor(cursor,cells,style);
  warningTable.setColumnWidth(0, 64) //the first column should be small (just a picture of a warning sign)
  
  /*
   Setup the picture Cell
  */
  var pictureCell = warningTable.getCell(0, 0);
  pictureCell.setAttributes(style);
  pictureCell.clear();
  
  var img = getImage('0B1d2AYWnsGhXVWYtbnAxemFXRmc'); //replace with your own image id
  var warningInlineImage = appendImageToElement(pictureCell, img, 64,64)
  
  /*
  Setup the content Cell style
  */
  styleACell(warningTable,0,1,style)
    
  
}

/**
 * Inserts an information box under the current cursor location
 */
function insertInfoTableAtCursor() {
  if (!doesTheUserWantToContinue('This will insert an infoirmation Box at your current cursor location, are you sure you want to do this?')) return;
  
  var cursor = DocumentApp.getActiveDocument().getCursor();

  if (!cursor) {showCursorError(); return;}
  
  /*
   Setup the style for the whole box (yellow for warning)
  */
  var style = setupStyle('#c9daf8','#000000', true);
  
  /*
  Create the main table
  */
  var cells = [['', 'Information: Information Text goes here']];
  
  var warningTable = insertTableAtCursor(cursor,cells,style);
  warningTable.setColumnWidth(0, 64) //the first column should be small (just a picture of a warning sign)
  
  /*
   Setup the picture Cell
  */
  var pictureCell = warningTable.getCell(0, 0);
  pictureCell.setAttributes(style);
  pictureCell.clear();
  
  var img = getImage('0B1d2AYWnsGhXc2hObDhrTU1RcHc'); //replace with your own image id
  var warningInlineImage = appendImageToElement(pictureCell, img, 64,64)
  
  /*
  Setup the content Cell style
  */
  styleACell(warningTable,0,1,style)  
}

function insertTerminalAtCursor() {
  if (!doesTheUserWantToContinue('This will insert a Terminal Command Box at your current cursor location, are you sure you want to do this?')) return;
  
  var cursor = DocumentApp.getActiveDocument().getCursor();
  if (!cursor) {showCursorError(); return;}
  
  
  var cells = [['./ccadmin.sh']];
  
  var style={}
  style[DocumentApp.Attribute.BORDER_WIDTH] = 2;
  style[DocumentApp.Attribute.BORDER_COLOR] = '#999999';
  style[DocumentApp.Attribute.SPACING_AFTER] = 0;
  var terminalTable = insertTableAtCursor(cursor,cells,style);
  
  var cellStyle = setupStyle('#000000', '#FFFFFF', true);
  styleACell(terminalTable,0,0,cellStyle)
}

function insertCodeSnippetAtCursor() {
  var cursor = DocumentApp.getActiveDocument().getCursor();
  if (!cursor) {showCursorError(); return;}
  
  var payload =
   {
     "lang" : "python",
     "code" : "print 'hello'"
   };
  
  var options =
   {
     "method" : "post",
     "payload" : payload
   };
  
  var response = UrlFetchApp.fetch("http://pygments.appspot.com/",options)
  showDialog(response,"response")
  // https://raw2.github.com/trevorturk/pygments/master/default.css
}

/*
 LIBRARY FUNCTIONS
*/

function appendImageToElement(element, img, width,height) {
  var inlineImage = element.appendImage(img);
  inlineImage.setHeight(height);
  inlineImage.setWidth(width);
  return inlineImage;
}

function getImage(fileId) {
  return DriveApp.getFileById(fileId).getBlob();
}

function styleACell(table,x,y,style) {
  var mainCell = table.getCell(x, y);
  mainCell.setAttributes(style);
  mainCell.getChild(0).setAttributes(style);
}

function insertTableAtCursor(cursor,cells,style) {
  var currentElement = cursor.getElement();
  var elementIndex = currentElement.getParent().getChildIndex(currentElement);
  var newTable = currentElement.getParent().asBody().insertTable(elementIndex+1,cells)
  if (style)
    newTable.setAttributes(style);
  return newTable;
}

function setupStyle(back_colour, fore_colour ,bold) {
  var style = {};
  style[DocumentApp.Attribute.BACKGROUND_COLOR] = back_colour;
  style[DocumentApp.Attribute.FOREGROUND_COLOR] = fore_colour;
  style[DocumentApp.Attribute.BOLD] = bold;
  style[DocumentApp.Attribute.SPACING_AFTER] = 0;
  style[DocumentApp.Attribute.SPACING_BEFORE] = 0;
  return style;
}

function showCursorError() {
  DocumentApp.getUi().alert('Cannot find a cursor in the document.');
}

function doesTheUserWantToContinue(message) {
  var result = DocumentApp.getUi().alert(
      'Handy Info Boxes',
      message,
      DocumentApp.getUi().ButtonSet.YES_NO);
  if (result == DocumentApp.getUi().Button.YES) {
    return true;
  } else {
    return false;
  }
}
