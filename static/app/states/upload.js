define([ 'webix', './state-router', 'common/$$' ], function (webix, stateRouter, $$) {
    var form = {
	view: 'form',
        elements: [ {
            template: 'Reflective File Uploader', type:'header'
        }, {
            view: 'label', label: 'Udvælg filer til sikker overførsel ved at bruge Vælg-knappen eller at trække dem ind i kassen nedenfor.'
        }, {
            view: 'label', label: 'De valgte filer overføres ved tryk på Overfør-knappen.'
        }, {
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
                label: 'Overfør',
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
                { gravity: .15 },
                { cols: [ { gravity: .2 }, form, { gravity: .2 } ] },
                { gravity: .3 }
            ] },
            $oninit: function (view, scope) {
                $$('file-uploader').addDropZone($$('file-list').$view);
                $$('file-uploader').attachEvent('onFileUpload', function(item, response) {
                    if (!item.refAdded) {
                        item.name += ' — filen er modtaget. Reference-id: ' + response.rid;
                        item.refAdded = true;
                    }
                });
            }
        }
    };
});
