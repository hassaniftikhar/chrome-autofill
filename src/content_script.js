// alert('content script');
console.log('content script');
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        chrome.runtime.sendMessage( {type: "notification", message: event.data.text } );
    }
}, false);

function determineState() {
    var ccn = window.location.href.split('szCCN=')[1];
    var message = chrome.storage.local.get([ccn]);
}