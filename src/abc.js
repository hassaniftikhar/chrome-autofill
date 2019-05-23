console.log('Browser Action Triggered');
alert('hello worlds2');
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

var port = chrome.runtime.connect();

window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }
}, false);


// if (navigator.userAgent.indexOf('Chrome')) //isnt -1
//     chrome.runtime.sendMessage({src: ajaxCallUrl, data: data, external: true, stripe: true}, function (response) {
//         if (response != undefined && response.status != undefined)
//             if (response.success)
//                 $('body').removeClass('loader')
//                 creditCardPaymentSuccessfull(plan)
//             else
//             $('body').removeClass('loader');
//             formErrorMessage(response.message)
//         else
//         $('body').removeClass('loader');
//         formErrorMessage('Something went wrong, Please contact us', "errorMessage")
//         return;
//     });