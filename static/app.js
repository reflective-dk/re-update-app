requirejs.config({
    baseUrl: 'static/lib',
    paths: {
        common: '../../common/lib',
        app: '../app',
        'es6-promise': '../../common/js/es6-promise.min',
        webix: '../../common/js/webix_debug',
        axios: '../../common/js/axios'
    },
    shim: {
        webix: {
            exports: 'webix'
        }
    }
});
requirejs([ '../../static/app/main' ]);
