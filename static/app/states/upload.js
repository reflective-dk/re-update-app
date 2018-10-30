define([ 'webix', './state-router', '../models/situ' ],
function (webix, stateRouter, situ) {

  return {
    name: 'upload',
    template: {
      $ui: {
        rows:[
          {},
          {cols: [
            {},
            { type: "form", rows: [
              {
                id: "uploader",
                view: "uploader",
                height: 200,
                width: 500,
                value: 'Tryk for udvælgelse af fil, eller træk og slip filen her.',
                link: "list",
                upload: "/api/process/file-upload",
              },
              {
                id: "list",
                view: "list",
                type: "uploader",
                autoheight: true,
                borderless: true,
              }]
              },
            {}
          ]},
          {}
        ]
      },
      $oninit: function (view, scope) {
        $$("uploader").attachEvent("onFileUpload", function(item, response) {
          item.name = 'ref: '+response.hash;
        });
     }
    },
    resolve: function(data, parameters, cb) {
      cb();
  	},
    activate: function(context) {
  	},
    route: '/',
  };
});
