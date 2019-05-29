// alert('content script');
console.log('content script');
window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        chrome.runtime.sendMessage({type: "fill_bsi", message: event.data.text});
    }
}, false);

window.addEventListener("load", function () {
    console.log('event: load');
    console.log('activateProcess');
    var ccn = window.location.href.split('szCCN=')[1];
    console.log('autofill ccn from url: ' + ccn);
    if(ccn) {
        chrome.storage.local.get(['data'], function(result) {
            console.log('Value currently is ' + result.data);
            chrome.runtime.sendMessage({type: "fill_bsi", message: JSON.stringify(result)});
        });
    }
});

// function activateProcess() {
// }
//
// activateProcess();