document.onreadystatechange = function() {
  if (document.readyState === 'interactive') renderApp();

  function renderApp() {
    console.log('render app')
    var onInit = app.initialized();

    onInit
      .then(function getClient(_client) {
        window.client = _client;
        console.log('activated')
        _client.events.on('app.activated', renderContactName);
        _client.events.on('ticket.propertiesUpdated', eventCallback);
      })
      .catch(handleErr);
  }
};

async function showDialog (_client) {
  try {
    console.log('showing dialog');
    let result = await _client.interface.trigger("showConfirm", {
      title: "Confim", // plain text
      message: "Are you sure you want to save the details?" // plain text
    });
    console.log('ss', result);
      /* "result" will be either "Save" or "Cancel" */
  } catch (error) {
      // failure operation
    console.error('in here', error);
  }
}

function renderContactName() {
  console.log('start render')
  var textElement = document.getElementById('apptext');
  // var textElement = document.getElementById('ember40');
  client.data
    .get('requester')
    .then(function(data) {
      console.log('setting inner element : ', data);
      textElement.innerHTML = data.requester.name;
    })
    .catch(handleErr);
}

function eventCallback (event) {
  console.log('in here: ');
  const eventData = event.helper.getData();
  console.log('event data: ', eventData);
  showDialog(client);
  
}

function handleErr(err = 'None') {
  console.error(`Error occured. Details:`, err);
}
