define([
    'webix', './state-router', './upload'
], function(webix, stateRouter, upload) {

    return function(initialState, defaultState) {
      defaultState = defaultState || initialState;
      webix.ready(function() {
        stateRouter.addState(upload);
        stateRouter.on('routeNotFound', function(route, parameters) {
          stateRouter.go(defaultState, { route: route });
        });
        stateRouter.evaluateCurrentRoute(initialState);
      });
    };
});
