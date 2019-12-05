define([ 'webix', './state-router', 'common/$$' ], function (webix, stateRouter, $$) {
    var form = {
	view: 'form',
        rows: [ {
	    view: 'list',
            id: 'file-list',
            type: 'uploader',
	    autoheight: true,
            minHeight: 200
	}, {
            cols: [ {}, {
	        view: 'uploader',
                value: 'Vælg',
	        id: 'file-uploader',
                name: 'uploader',
                css: 'webix_primary',
                height: 40, width: 100,
	        link: 'file-list',
                upload: '/app/uploader/send-files',
                autosend: false
	    }, {
                view: 'button',
                label: 'Send',
                css: 'webix_primary',
                height: 40, width: 100,
                click: function() { $$('file-uploader').send(); }
            } ]
        } ]
    };

    return {
        name: 'upload',
        route: '/upload-files',
        template: {
            $ui: { rows: [
                { gravity: .2 },
                { cols: [ { gravity: .2 }, form, { gravity: .2 } ] },
                { gravity: .2 }
            ] },
            $oninit: function (view, scope) {
                $$('file-uploader').attachEvent('onFileUpload', function(item, response) {
                    console.log('response', response);
                    item.name = 'ref: ' + response.hash;
                });
            }
        }
    };
});
