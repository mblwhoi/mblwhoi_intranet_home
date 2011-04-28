// Just open the dialog window, all the magic is heppening sinde linkit.js
linkitBUEditorButtonInit = function(editor) {
  var path = Drupal.settings.linkit.url.bueditor;
  var media = window.showModalDialog(path, { 'opener' : window, 'editorname' : 'bueditor', 'bueditor' : editor }, "dialogWidth:750px; dialogHeight:320px; center:yes; resizable:yes; help:no;");
}