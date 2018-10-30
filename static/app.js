requirejs.config({
    baseUrl: 'static/lib',
    paths: {
        common: '../../common/lib',
        app: '../app',
        webix: '//cdn.webix.com/4.4/webix_debug',
    },
    shim: {
        webix: {
            exports: 'webix'
        }
    }
});
requirejs([ '../../static/app/main' ]);