define(['webix', 'common/promise', 'common/reflective-client'],
function(webix, promise, ReflectiveClient) {
  var client;

  // Add
  webix.attachEvent("onBeforeAjax",
    function(mode, url, data, request, headers, files, promise) {
      headers['authorization'] = client.authorization;
      headers['context'] = JSON.stringify(client.context);
    }
  );

  clear();

  return {
      clear: clear,
  };

  function clear() {
    var usertoken = webix.storage.cookie.get('reflective.token');
    var domain = webix.storage.cookie.getRaw('reflective.domain');

    var args = { context: { domain: domain } };
    client = new ReflectiveClient(args);
    client.authorization = 'Bearer ' + usertoken.token;

    return promise.fcall(function() { return true; });
  }

});
