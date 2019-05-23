import {attachHeadersListener} from 'chrome-sidebar'
import {hosts, iframeHosts} from './settings'

// console.log('Chrome Github Trending Sidebar Extension Registered')
// alert('Chrome Github Trending Sidebar Extension Registered')

chrome.browserAction.onClicked.addListener(tab => {
    // console.log('Browser Action Triggeredddd')
    // alert('Browser Action Triggeredddd')
    // for the current tab, inject the "inject.js" file & execute it
    chrome.tabs.executeScript(tab.id, {
        file: 'entry.js'
    });

});

attachHeadersListener({
    webRequest: chrome.webRequest,
    hosts,
    iframeHosts,
    overrideFrameOptions: true
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('===background js type: '+ request.type);

    chrome.tabs.query({title: 'BSI Online.'}, function(tabs) {
        console.log('===background js type: '+ request.message);
        var activeTab = tabs[0];
        var activeTabId = activeTab.id; // or do whatever you need
        var code = '$("[name=' + "property_search_address" + ']").val('+ '"' + request.message + '"' + ');';
        // chrome.tabs.executeScript(activeTabId, {file: "autofill.js"})
        chrome.tabs.executeScript(activeTabId, {code: code})
    });
    sendResponse();
});




// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.external == true){
//             if(request.conversationMode == true){
//                 $.ajax({
//                     url: request.src,
//                     dataType: 'text',
//                     timeout: 30000,
//                     success: function (data, textStatus, jqXHR) {
//                         sendResponse({status: true, success: true, data:data});
//                     },
//                     error: function(jqXHR, textStatus) {
//                         return jsLog.error({
//                             type: 'Inf070',
//                             statusCode: jqXHR.status,
//                             textStatus: textStatus,
//                             url:request.src
//                         });}
//                 });
//             }
//             else if (request.stripe == true){
//                 $.ajax({
//                     type: 'POST',
//                     dataType: "json",
//                     url: request.src,
//                     data: request.data,
//                     success: function(data) {
//                         if (data.success) {
//                             $('body').removeClass('loading');
//                             sendResponse({status: true, success: true});
//                         } else {
//                             $('body').removeClass('loading');
//                             sendResponse({status: true, message: data.message});
//                         }
//                     },
//                     error: function(data) {
//
//                     }
//                 });
//
//             }else{
//                 var src = request.src;
//                 var data = request.data;
//                 var xhr;
//                 xhr = new XMLHttpRequest;
//                 xhr.onreadystatechange = function() {
//                     var _ref;
//                     if (xhr.readyState === XMLHttpRequest.DONE) {
//                         if ((200 <= (ref = xhr.status) && ref < 300) || xhr.status === 304) {
//                             sendResponse({status: true, data: xhr.responseText});
//                         } else {
//                             sendResponse({status: false});
//                         }
//                     }
//                 };
//                 xhr.open('POST', src, true);
//                 xhr.setRequestHeader('Content-Type', 'application/json');
//                 xhr.withCredentials = true;
//                 xhr.send(data);
//             }
//
//         }
//         return true;
//     });
