define([ 'webix', './state-router' ],
function (webix, stateRouter) {

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
                value: 'Tryk for udvælgelse af fil, eller træk og slip filen her.',
                link: "list",
                upload: "/app/upload/file",
                css: {'color': 'white'}
              },
              {
                id: "list",
                view: "list",
                type: "uploader",
                autoheight: true,
                autowidth: true,
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
          item.name = response.filename;
        });
     }
    },
    resolve: function(data, parameters, cb) {
      cb();
  	},
    activate: function(context) {
  	},
    route: '/upload',
  };
});
