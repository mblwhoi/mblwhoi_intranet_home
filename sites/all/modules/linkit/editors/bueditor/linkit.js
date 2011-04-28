
var LinkitDialog = {
  init : function() {
    this.tmp_e = dialogArguments.bueditor;
    this.o =  dialogArguments.opener;
    this.e = LinkitE[this.tmp_e];

    if(typeof this.e == 'undefined') {
      alert(Drupal.t('No editor reference was found.'));
    }

    var textValue = this.o.BUE.active.getSelection();

    if (!textValue) {
      // Show help text when there is no selection element
      linkit_helper.show_no_selection_text();
    }
  },

  insertLink : function() {
    // Get the params from the form
    var params = this._getParams();  
    
    //If no href, just colse this window
    if(params.href == "") {
      window.close();
    } 
    // Ok, we have a href, lets make a link of it and insert it
    else {      
      this.e.process(params);
    }
  },

  _getParams : function () {
    // Regexp to find the "path"
    var matches = $('#edit-link').val().match(/\[path:(.*)\]/i);
    href = (matches == null) ? $('#edit-link').val() : matches[1];
    
    // Add anchor if we have any and make sure there is no "#" before adding the anchor
    var anchor = $('#edit-anchor').val().replace(/#/g,'');
    if(anchor.length > 0) {
      href = href.concat('#' + anchor);
    }

    var link_text_matches = $('#edit-link').val().match(/(.*)\[path:.*\]/i);
    link_text = (link_text_matches == null) ? $('#edit-link').val() : link_text_matches[1].replace(/^\s+|\s+$/g, '');

    var params = { 'href' : href , 'link_text' : link_text};
    
    $("fieldset fieldset input[id!='edit-anchor']").each(function() {
      if($(this).val() != "") {
        params[$(this).attr('name')] = $(this).val();
      }
    });

    return params;
  }
};


// Global editor object
var LinkitE = {};

/**
 * Editor "Default"
 */ 
LinkitE.Default = {
  process : function (params) {
    window.close();
  }
}

/**
 * Editor "BBcode"
 */ 
LinkitE.BBcode = {
  process : function (params) {
    window.close();
  }
}


/**
 * Editor "Commenter"
 */ 
LinkitE.Commenter = {
  process : function (params) {
    window.close();
  }
}

/**
 * Editor "MarkdownEditor"
 */ 
LinkitE.markdownEditor = {
  process : function (params) {
    // Insert inline link after caret position
    var replaceString = "[" + params.link_text + "](" + params.href + ( params.title ? ' "' + params.title + '"' : '' ) + ")";
    LinkitDialog.o.markdownEditor.selection.replaceAll(replaceString);
    window.close();
  }
}


$(document).ready(function() {
  LinkitDialog.init();

  $('#edit-link').keydown(function(ev) {
    if (ev.keyCode == 13) {
      // Prevent browsers from firing the click event on the first submit
      // button when enter is used to select from the autocomplete list.
      return false;
    }
  });
  $('#edit-insert').click(function() {
    LinkitDialog.insertLink();
    return false;
  });

  $('#edit-cancel').click(function() {
    window.close();
    return false;
  });
});