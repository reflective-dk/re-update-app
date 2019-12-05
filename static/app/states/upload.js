define([ 'webix', './state-router' ],
function (webix, stateRouter) {

  return {
    name: 'upload',
    route: '/upload-files',
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
                upload: "/app/upload/file"
              },
              {
                id: "list",
                view: "list",
                type: "uploader",
                autoheight: true,
                borderless: true
              }]
              },
            {}
          ]},
          {}
        ]
      },
      $oninit: function (view, scope) {
        $$("uploader").attachEvent("onFileUpload", function(item, response) {
          item.name = response.filename + ', ' + response.hash;
        });
     }
    }
  };
});
