
// 




function initValues(index) {
    setInputValueFromQuery(`userName${index}`)
    setInputValueFromQuery(`email${index}`)
    setInputValueFromQuery(`apiUrl${index}`)
    setInputValueFromQuery(`widgetKey${index}`)
    setInputValueFromQuery(`token${index}`)
    setInputValueFromQuery(`contactId${index}`)
    setInputValueFromQuery(`serviceId${index}`)
    setInputValueFromQuery(`presence_contactId_1${index}`)
    setInputValueFromQuery(`presence_contactId_2${index}`)
    setInputValueFromQuery(`message${index}`)
}

function initSDK(current) {
  
    let index = getSdkIndex(current)
    let widgetKey = getQueryOrInputValue(`widgetKey${index}`)
    let apiUrl = getQueryOrInputValue(`apiUrl${index}`)

    let sdk = new interactSDK({ apiUrl: apiUrl, widgetKey: widgetKey })
    _sdkByIndex.set(index, {
        sdk: sdk,
        index: index,
        muted: false,
        activeScreenSharing: false,
        settings: {
            userName: () => getQueryOrInputValue(`userName${index}`),
            email: () => getQueryOrInputValue(`email${index}`),
            contactId: () => getQueryOrInputValue(`contactId${index}`),
            serviceId: () => getQueryOrInputValue(`serviceId${index}`)
        }
    })
   

    appendLog('SDK is inited', index)
    return sdk
}

function getSdkIndex(current) {
    let sdkElement = current.closest('.sdk')
    let number = sdkElement.getAttribute('index')
    return number
}

function getSdkDetails(current) {
    let index = getSdkIndex(current)
    var sdk = _sdkByIndex.get(index)
    return sdk
}

function updateToken(current, nameId) {
    let sdkDetails = getSdkDetails(current)
    let token = getQueryOrInputValue(nameId)

    sdkDetails.sdk.setAuthorization(token)
    appendLog('Token is updated', sdkDetails.index)
}

async function getContactStatus(current, nameId, agentNameId) {
    let sdkDetails = getSdkDetails(current)
    let contactId = getQueryOrInputValue(nameId)
    try {
        let status = await sdkDetails.sdk.getContactStatus(contactId)
        if (status.isMeetingAlive) {
            startVideo(current)
        }

        document.getElementById(agentNameId).value = status.displayName

        appendLog(
            `Contact status is ${JSON.stringify(status)}`,
            sdkDetails.index
        )
    } catch (er) {
        appendLog(`Contact status error ${er}`, sdkDetails.index)
    }
}

async function getServiceStatus(current, nameId, agentNameId) {
    let sdkDetails = getSdkDetails(current)
    let serviceId = getQueryOrInputValue(nameId)
    try {
        let status = await sdkDetails.sdk.getServiceStatus(serviceId)

        document.getElementById(agentNameId).value = status.displayName
        if (status.isMeetingAlive) {
            startVideo(current, true)
        }

        appendLog(
            `Contact status is ${JSON.stringify(status)}`,
            sdkDetails.index
        )

        let chatStatus = await sdkDetails.sdk.getChatStatus(serviceId)
        appendLog(
            `Contact chat status is ${JSON.stringify(chatStatus)}`,
            sdkDetails.index
        )
        if (chatStatus.isAlive) {
            await startChat(current)
            const restoreMessages = await sdkDetails.sdk.getRestoredMessages()
            appendLog(
                `Contact chat restored messages are:  ${JSON.stringify(
                    restoreMessages
                )}`,
                sdkDetails.index
            )
        }
    } catch (er) {
        appendLog(`Contact status error ${er}`, sdkDetails.index)
    }
}
async function getContactPresence(current, nameId) {
    let sdkDetails = getSdkDetails(current)
   
    let contactId = getQueryOrInputValue(nameId)
    appendLog(`contactId =  ${contactId}`, sdkDetails.index)
    try {
        let presence = await sdkDetails.sdk.getContactPresence(contactId)
        appendLog(
            `Contact presence is ${JSON.stringify(presence)}`,
            sdkDetails.index
        )
    } catch (er) {
        appendLog(`Contact status error ${er}`, sdkDetails.index)
    }
}

function createSdk(index) {
    var baseTeamplte = document.getElementsByTagName('template')[0]
    let sdkTemplate = baseTeamplte.innerHTML.replaceAll(
        '{index-template}',
        index
    )

    var clone = document.createElement('template')
    clone.innerHTML = sdkTemplate

    document.body.appendChild(clone.content)
}

///// test functions
async function startVideo(current, isService) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let userName = sdkDetails.settings.userName()
    let email = sdkDetails.settings.email()
    let contactId = isService
        ? sdkDetails.settings.serviceId()
        : sdkDetails.settings.contactId()
    let replacedName = undefined
    if (isService) {
        const status = await sdkDetails.sdk.getServiceStatus(contactId)
        replacedName = status.displayName
    }

    let userDetails = {
        userName: userName,
        email: email,
        disclaimer: true
    }
    try {
        const sessionId = await sdkDetails.sdk.startConversation(
            userDetails,
            contactId
        )
        addSubscriptions(sdkDetails)
        appendLog(
            `Conversation is started. Session id is ${sessionId}`,
            index
        )
        let video = getDeviceId(`videoinput`, index)
        let microphone = getDeviceId(`audioinput`, index)
        let audio = getDeviceId(`audiooutput`, index)
        let options = {
            devices: {
                videoId: video != 0 ? video : 'default',
                speakerId: audio != 0 ? audio : 'default',
                microphoneId: microphone != 0 ? microphone : 'default'
            },
            selfVideoId: `testSelfVideo${index}`,
            videoId: `testVideo${index}`,
            screenSharingId: `screensharing-id${index}`,
            replacedAgentName: replacedName
        }
        await sdkDetails.sdk.startCall(options)
        toneSequence = 0
        AfterStartCall()
        toggleButtons(false, index, false, isService)
      
    } catch (e) {
        appendLog(
            `Conversation was not started ${JSON.stringify(e ?? '')}`,
            index
        )
    }
}

async function startAudio(current, isService) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let userName = sdkDetails.settings.userName()
    let email = sdkDetails.settings.email()
    let contactId = isService
        ? sdkDetails.settings.serviceId()
        : sdkDetails.settings.contactId()

    let userDetails = {
        userName: userName,
        email: email,
        disclaimer: true
    }
    try {
        const sessionId = await sdkDetails.sdk.startConversation(
            userDetails,
            contactId,
            true
        )
        addSubscriptions(sdkDetails)
        appendLog(
            `Conversation is started. Session id is ${sessionId}`,
            index
        )

        let microphone = getDeviceId(`audioinput`, index)
        let audio = getDeviceId(`audiooutput`, index)

        let options = {
            devices: {
                speakerId: audio != 0 ? audio : 'default',
                microphoneId: microphone != 0 ? microphone : 'default'
            },
            screenSharingId: `screensharing-id${index}`,
            selfVideoId: `testSelfVideo${index}`,
            videoId: `testVideo${index}`
        }
        await sdkDetails.sdk.startCall(options)
        toneSequence = 0
        toggleButtons(false, index, false, isService)
    } catch (e) {
        appendLog(
            `Conversation was not started ${JSON.stringify(e ?? '')}`,
            index
        )
    }
}
async function stopCall(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    try {
        sdkDetails.sdk.stopCall().then(result => {
            appendLog(`Call is stopped: ${result}`, index)
            removeSubscriptions(sdkDetails)
            toggleButtons(true, index)
        })
    } catch (er) {
        appendLog(`Stop call failed ${er}`, index)
    }
}

function getCallState(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    try {
        const result = sdkDetails.sdk.getCallState()
        appendLog(`Current call state: ${JSON.stringify(result)}`, index)
    } catch (er) {
        appendLog(`Can't get call state: ${er}`, index)
    }
}

async function startChat(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let userName = sdkDetails.settings.userName()
    let email = sdkDetails.settings.email()
    let serviceId = getQueryOrInputValue(`serviceId${index}`)
    let initial_message =
        getQueryOrInputValue(`initial_service_message${index}`) || ''

    let userDetails = {
        userName: userName,
        email: email,
        disclaimer: true,
        initialMessage: initial_message
    }
    try {
        const sessionId = await sdkDetails.sdk.startChatConversation(
            userDetails,
            serviceId
        )
        addSubscriptions(sdkDetails)
        appendLog(
            `Chat Conversation is started. Session id is ${sessionId}`,
            index
        )
        toggleButtons(false, index)
    } catch (e) {
        appendLog(`Conversation was not started ${e}`, index)
    }
}
async function startChatContact(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let userName = sdkDetails.settings.userName()
    let email = sdkDetails.settings.email()
    let contactId = getQueryOrInputValue(`contactId${index}`)
    let initial_message =
        getQueryOrInputValue(`initial_message${index}`) || ''

    let userDetails = {
        userName: userName,
        email: email,
        disclaimer: true,
        initialMessage: initial_message
    }
    try {
        const sessionId = await sdkDetails.sdk.startChatConversation(
            userDetails,
            contactId
        )
        addSubscriptions(sdkDetails)
        appendLog(
            `Chat Conversation is started. Session id is ${sessionId}`,
            index
        )
        toggleButtons(false, index)
    } catch (e) {
        appendLog(`Conversation was not started ${e}`, index)
    }
}
async function stopChat(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    try {
        sdkDetails.sdk.stopChat().then(result => {
            appendLog(`Chat is stopped: ${result}`, index)
            removeSubscriptions(sdkDetails)
            toggleButtons(true, index)
        })
    } catch (er) {
        appendLog(`Stop chat failed ${er}`, index)
    }
}

async function subscribeToPresence(
    current,
    nameId1,
    nameId2,
    name_serviceId1,
    name_serviceId2
) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    await sdkDetails.sdk.initPresence('signalR')

    let contactId1 = getQueryOrInputValue(nameId1)
    let contactId2 = getQueryOrInputValue(nameId2)
    let serviceId1 = getQueryOrInputValue(name_serviceId1)
    let serviceId2 = getQueryOrInputValue(name_serviceId2)

    sdkDetails.sdk.presence.on([
        {
            publicUserId: contactId1,
            callbacks: { onChanged: p => onPresenceChanged(p, sdkDetails) }
        },
        {
            publicUserId: contactId2,
            callbacks: { onChanged: p => onPresenceChanged(p, sdkDetails) }
        },
        {
            publicServiceId: serviceId1,
            callbacks: { onChanged: p => onPresenceChanged(p, sdkDetails) }
        },
        {
            publicServiceId: serviceId2,
            callbacks: { onChanged: p => onPresenceChanged(p, sdkDetails) }
        }
    ])

    appendLog('Subscribed to presence', index)
}

async function unsubscribeToPresence(
    current,
    nameId1,
    nameId2,
    name_serviceId1,
    name_serviceId2
) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let contactId1 = getQueryOrInputValue(nameId1)
    let contactId2 = getQueryOrInputValue(nameId2)
    let serviceId1 = getQueryOrInputValue(name_serviceId1)
    let serviceId2 = getQueryOrInputValue(name_serviceId2)

    await sdkDetails.sdk.presence.off([
        { publicUserId: contactId1 || defaults?.contactId },
        { publicUserId: contactId2 || defaults?.contactId },
        { publicServiceId: serviceId1 || defaults?.serviceId },
        { publicServiceId: serviceId2 || defaults?.serviceId }
    ])

    appendLog('Unsubscribed to presence', index)
}

async function changeCamera(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    const result = await sdkDetails.sdk.changeCamera()
    appendLog(`Camera was changes to ${result}`, index)
}
async function toggleCamera(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    try {
        const result = await sdkDetails.sdk.toggleVideo()
        appendLog('Video was ' + (!!result ? 'unmuted' : 'muted'), index)
    } catch (er) {
        appendLog(`Can not toggle video ${er}`, index)
    }
}

async function updateDevices(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let video = getDeviceId(`videoinput`, index)
    let microphone = getDeviceId(`audioinput`, index)
    let audio = getDeviceId(`audiooutput`, index)

    let options = {
        devices: {
            videoId: video != 0 ? video : 'default',
            speakerId: audio != 0 ? audio : 'default',
            microphoneId: microphone != 0 ? microphone : 'default'
        },
        selfVideoId: `testSelfVideo${index}`,
        videoId: `testVideo${index}`
    }
    try {
        await sdkDetails.sdk.updateDevices(options)
        appendLog('Devices was applied', index)
    } catch (err) {
        appendLog(`Devices was not applied: ${err}`, index)
    }
}

async function toggleMute(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    try {
        sdkDetails.muted = !sdkDetails.muted
        await sdkDetails.sdk.toggleMute(sdkDetails.muted)
        appendLog(
            'Conversation was ' + (sdkDetails.muted ? 'muted' : 'unmuted'),
            index
        )
    } catch (err) {
        appendLog(
            'Conversation was not ' +
            (sdkDetails.muted ? 'muted' : 'unmuted') +
            ' ' +
            err,
            index
        )
    }
}

async function sendTypingNotification(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    await sdkDetails.sdk.sendTypingNotification()
}
async function sendReadReceipt(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let messageId = getQueryOrInputValue(`receiptId${index}`)
    await sdkDetails.sdk.sendReadReceipt(messageId)
}

async function sendMessage(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    let message = getQueryOrInputValue(`message${index}`)

    try {
        let id = await sdkDetails.sdk.sendMessage({ text: message })
        appendLog(`Message was sent: ${id}`, index)
    } catch (err) {
        appendLog(`Message was not sent  ${message}`, index)
    }
}
async function editMessage(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    let messageId = getQueryOrInputValue(`message-id${index}`)
    let message = getQueryOrInputValue(`message${index}`)

    try {
        let id = await sdkDetails.sdk.editMessage(messageId, {
            text: message
        })
        appendLog(`Message was updated: ${messageId}`, index)
    } catch (err) {
        appendLog(`Message was not sent  ${message}`, index)
    }
}
async function deleteMessage(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    let messageId = getQueryOrInputValue(`message-id${index}`)

    try {
        await sdkDetails.sdk.deleteMessage(messageId)
        appendLog(`Message was deleted: ${messageId}`, index)
    } catch (err) {
        appendLog(`Message was not sent  ${message}`, index)
    }
}
async function changeScreenSharing(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    sdkDetails.activeScreenSharing = !sdkDetails.activeScreenSharing
    await sdkDetails.sdk.toggleScreenSharing(sdkDetails.activeScreenSharing)
    appendLog(
        'Screen sharing was changed to ' +
        (sdkDetails.activeScreenSharing ? "'ongoing'" : "'terminated'"),
        index
    )
}

async function sendTone(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index
    const toneValue = document.getElementById(`tone_list${index}`).value
    await sdkDetails.sdk.sendDtmfTone({
        tone: toneValue,
        sequenceId: toneSequence++
    })
}

function updateContactSettings(current) {
    let sdkDetails = getSdkDetails(current)
    let index = sdkDetails.index

    let widgetKey = getQueryOrInputValue(`widgetKey${index}`)
    let apiUrl = getQueryOrInputValue(`apiUrl${index}`)
    let contactId = getQueryOrInputValue(`contactId${index}`)

    baseSettings = {
        widgetKey: widgetKey,
        apiUrl: apiUrl
    }

    initSettings = {
        ...baseSettings,
        contactId: contactId
    }

    initPresence = {
        ...baseSettings,
        type: 'signalR'
    }
}

///// help functions
function fillListOfDevices(index) {
    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.enumerateDevices
    ) {
        appendLog('enumerateDevices() not supported.', index)
        return
    }

    // List cameras and microphones.
    navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                console.log(
                    device.kind + ': ' + device.label + ' id = ' + device.deviceId
                )
                let select =
                    device.kind === 'videoinput'
                        ? document.getElementById(`videos_list${index}`)
                        : device.kind === 'audiooutput'
                            ? document.getElementById(`audios_list${index}`)
                            : document.getElementById(`microphones_list${index}`)
                select.options[select.options.length] = new Option(
                    device.label,
                    device.deviceId,
                    false,
                    false
                )
            })
        })
        .catch(function (err) {
            console.log(err.name + ': ' + err.message)
        })
}

function getDeviceId(kind, index) {
    let select =
        kind === 'videoinput'
            ? document.getElementById(`videos_list${index}`)
            : kind === 'audiooutput'
                ? document.getElementById(`audios_list${index}`)
                : document.getElementById(`microphones_list${index}`)
    return select.value
}

function toggleButtons(isDisabled, index, chatOnly = false, isService) {
    document.getElementById(`send${index}`).disabled = isDisabled
    document.getElementById(`edit${index}`).disabled = isDisabled
    document.getElementById(`delete${index}`).disabled = isDisabled
    if (chatOnly) {
        return
    }
    // Call related buttons
    document.getElementById(`changeCamera${index}`).disabled = isDisabled
    document.getElementById(`toggleCamera${index}`).disabled = isDisabled
    document.getElementById(`toggleMute${index}`).disabled = isDisabled
    document.getElementById(`screenSharing${index}`).disabled = isDisabled
    document.getElementById(`sendTone${index}`).disabled = isService
        ? isDisabled
        : false
}

function addSubscriptions(
    sdkDetails,
    chatOnly = false,
    restoreChat = false
) {
    let index = sdkDetails.index

    sdkDetails.sdk.conversation.chat.on({
        onMessageReceived: m => onMessageReceived(m, sdkDetails),
        onTypingParticipantAdded: p =>
            onTypingParticipantAdded(p, sdkDetails),
        onTypingParticipantRemoved: p =>
            onTypingParticipantRemoved(p, sdkDetails),
        onStopChat: () => onStopChat(sdkDetails),
        onMessageDeleted: m => onMessageReceived(m, sdkDetails),
        onMessageEdited: m => onMessageReceived(m, sdkDetails)
    })
    if (chatOnly) {
        return
    }

    // // Call related subscriptions
    sdkDetails.sdk.conversation.callChanged.on({
        onStart: () => {
            if (restoreChat) {
                sdkDetails.sdk.restoreMessages()
            }

            startCallback(sdkDetails)
        },
        onStop: () => stopCallback(sdkDetails),
        onTransferStarted: () => onTransferStarted(sdkDetails),
        onTransferFinished: () => onTransferFinished(sdkDetails)
    })
    sdkDetails.sdk.conversation.participantsChanged.on({
        onAdded: p => onAdded(p, sdkDetails),
        onRemoved: p => onRemoved(p, sdkDetails)
    })
    sdkDetails.sdk.conversation.errors.on(e => onError(e, sdkDetails))
    sdkDetails.sdk.conversation.screenSharing.on({
        onScreenSharing: v => onScreenSharing(v, sdkDetails),
        onRemoteScreenSharing: v => onRemoteScreenSharing(v, sdkDetails)
    })
}

function removeSubscriptions(sdkDetails) {
    sdkDetails.sdk.conversation.chat.off()
    sdkDetails.sdk.conversation.callChanged.off()
    sdkDetails.sdk.conversation.participantsChanged.off()
    sdkDetails.sdk.conversation.errors.off()
    sdkDetails.sdk.conversation.screenSharing.off()
}

function onMessageReceived(message, sdkDetails) {
    appendLog(
        'Message was received/edited/deleted: ' + JSON.stringify(message),
        sdkDetails.index
    )
}

function onStopChat(sdkDetails) {
    appendLog('Chat was stopped: ', sdkDetails.index)
}
function startCallback(sdkDetails) {
    appendLog('Call was started', sdkDetails.index)
}
function stopCallback(sdkDetails) {
    appendLog('Call was stopped', sdkDetails.index)
    removeSubscriptions(sdkDetails)
}
function onAdded(participant, sdkDetails) {
    appendLog(
        'Participant was added ' + JSON.stringify(participant),
        sdkDetails.index
    )
}
function onRemoved(participant, sdkDetails) {
    appendLog(
        'Participant was removed ' + JSON.stringify(participant),
        sdkDetails.index
    )
}
function onError(error, sdkDetails) {
    appendLog(
        'Some error was occurred ' + JSON.stringify(error),
        sdkDetails?.index || '_1'
    )
}
function onTypingParticipantAdded(participant, sdkDetails) {
    appendLog(
        'Participant is typing ' + JSON.stringify(participant),
        sdkDetails.index
    )
}
function onTypingParticipantRemoved(participant, sdkDetails) {
    appendLog(
        'Participant isn`t typing ' + JSON.stringify(participant),
        sdkDetails.index
    )
}

function onPresenceChanged(presence, sdkDetails) {
    appendLog(
        'Participant presence changed ' + JSON.stringify(presence),
        sdkDetails.index
    )
}
function onTransferStarted(sdkDetails) {
    appendLog('Transfer was started: ', sdkDetails.index)
}
function onTransferFinished(sdkDetails) {
    appendLog('Transfer was finished: ', sdkDetails.index)
}

function onScreenSharing(isEnable, sdkDetails) {
    if (sdkDetails.activeScreenSharing === isEnable) {
        return
    }
    sdkDetails.activeScreenSharing = isEnable
    appendLog(
        'Screen sharing was ' + (isEnable ? 'started' : 'stopped'),
        sdkDetails.index
    )
}

function onRemoteScreenSharing(isActive, sdkDetails) {
    appendLog(
        'Screen sharing from the remote participant was ' +
        (isActive ? 'started' : 'stopped'),
        sdkDetails.index
    )
}

function appendLog(value, index) {
    document.getElementById(`details${index}`).append(value + '\r\n')
}

function getQueryOrInputValue(name) {
    let searchParams = new URLSearchParams(document.location.search)
    let value = searchParams.get(name)
    if (value) {
        return value
    }

    value = document.getElementById(name)?.value
    return value
}

function setInputValueFromQuery(name) {
    let searchParams = new URLSearchParams(document.location.search)
    let value = searchParams.get(name)
    if (value) {
        document.getElementById(name).value = value
    }
}