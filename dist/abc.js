// console.log('Browser Action Triggered');
console.log('hello worldsss');

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        chrome.runtime.sendMessage( {type: "notification", options: {message: event.data.text}} );
    }
}, false);
