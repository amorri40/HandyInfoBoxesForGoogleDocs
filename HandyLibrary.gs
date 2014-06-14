/*
 LIBRARY FUNCTIONS
*/

function appendImageToElement(element, img, width,height) {
  var inlineImage = element.appendImage(img);
  inlineImage.setHeight(height);
  inlineImage.setWidth(width);
  element.setText('');
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
  style[DocumentApp.Attribute.VERTICAL_ALIGNMENT] = DocumentApp.VerticalAlignment.CENTER;
  style[DocumentApp.Attribute.PADDING_BOTTOM] = 0;
  style[DocumentApp.Attribute.PADDING_TOP] = 0;
  style[DocumentApp.Attribute.MINIMUM_HEIGHT] = 0.2;
  style[DocumentApp.Attribute.HEIGHT] = 0.2;
  style[DocumentApp.Attribute.MARGIN_TOP] = 0;
  style[DocumentApp.Attribute.MARGIN_BOTTOM] = 0;
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

function insertGenericTableAtCursor(nameOfTable,style,initialContents,imageHash) {
  if (!doesTheUserWantToContinue('This will insert a '+nameOfTable+' at your current cursor location, are you sure you want to do this?')) return;
  var cursor = DocumentApp.getActiveDocument().getCursor();
  if (!cursor) {showCursorError(); return;}
  
  var icon_size = 48;
  
  /*
  Create the main table
  */
  var cells = [['', initialContents]];
  
  var genericTable = insertTableAtCursor(cursor,cells,style);
  genericTable.setColumnWidth(0, icon_size) // The first column should be small (just a picture)
  
  /*
   Setup the picture Cell
  */
  var pictureCell = genericTable.getCell(0, 0);
  pictureCell.setAttributes(style);
  pictureCell.clear();
  
  var img = getImage(imageHash);
  var inlineImage = appendImageToElement(pictureCell, img, icon_size,icon_size)
  
  /*
  Setup the content Cell style
  */
  styleACell(genericTable,0,1,style)
  styleACell(genericTable,0,0,style)
}
