// console.log('Browser Action Triggered');
alert('hello worldsss');
// debugger;

// chrome.runtime.onConnect.addListener(function (port) {
//     port.onMessage.addListener(function (msg) {
//         port.postMessage({counter: msg.counter + 1});
//     });
// });
//
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         sendResponse({counter: request.counter + 1});
//     });





window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        // var port = chrome.runtime.connect();
        // port.postMessage(event.data.text);
        chrome.runtime.sendMessage( {type: "notification", options: {message: "Test"}} );
    }
}, false);

// chrome.runtime.onMessageExternal.addListener(
//     function(request, sender, sendResponse) {
//         console.log('===GOT EXT MESSAGE 10');
//         // if (sender.url == blocklistedWebsite)
//         //     return;  // don't allow this web page access
//         if (request.openUrlInEditor)
//             console.log('===GOT EXT MESSAGE 11');
//             // openUrl(request.openUrlInEditor);
//
//     });