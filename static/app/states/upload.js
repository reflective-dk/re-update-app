define([ 'webix', './state-router', 'common/$$' ], function (webix, stateRouter, $$) {
    var form = {
	view: 'form',
        rows: [ {
	    view: 'uploader',
            value: 'Upload file',
	    id: 'file-uploader',
            name: 'uploader',
	    link: 'file-list',
            upload: '/app/uploader/send-files',
            autosend: false
	}, {
	    view: 'list',
            id: 'file-list',
            type: 'uploader',
	    autoheight: true,
            borderless: true
	}, { view: 'button', label: 'Save files', click: function() {
            $$('file-uploader').send(function(response) {
                console.log('response', response);
            });
        } },
                {
            view: 'button', label: 'Get value', click: function() {
	        var text = this.getParentView().getValues();
	        text = JSON.stringify(text, '\n').replace(/,/g,',\n\t');
	        webix.message('<pre>'+text+'</pre>');
	    }
        } ]
    };

    return {
        name: 'upload',
        route: '/upload-files',
        template: {
            $ui: { rows: [ {}, { cols: [ {}, form, {} ] }, {} ] },
            $oninit: function (view, scope) {
                $$('file-uploader').attachEvent('onFileUpload', function(item, response) {
                    console.log('response', response);
                    item.name = 'ref: ' + response.hash;
                });
            }
        }
    };
});
