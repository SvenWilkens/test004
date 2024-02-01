async function CreateSdk () {
  let widgetKey = 'e3ce8a5436134ff4a0148bd77fe73e7b'
  let apiUrl = 'https://interact.de-01.luware.cloud/api/interact/v1'
  let initSettings = {
    widgetKey: widgetKey,
    apiUrl: apiUrl,
    type: 'signalR'
  }
  return new interactSDK(initSettings)
}

async function subscribeToPresence1 (contectGuid, sdkInstance) {
  await sdkInstance.initPresence('signalR')

  await sdkInstance.presence.on([
    {
      publicUserId: contectGuid,
      callbacks: {
        onChanged: p => onPresenceChanged1(p, 'contactStatus_' + contectGuid)
      }
    }
  ])
}

function onPresenceChanged1 (presence, divId) {
  if (presence.presenceStatus === 'Away') {
    var div = document.getElementById(divId)
    div.style.backgroundColor = 'red'
  } else if (presence.presenceStatus === 'Busy') {
    var div = document.getElementById(divId)
    div.style.backgroundColor = 'red'
  } else if (presence.presenceStatus === 'Available') {
    var div = document.getElementById(divId)
    div.style.backgroundColor = 'green'
  } else {
    var div = document.getElementById(divId)
    div.style.backgroundColor = 'black'
  }
}