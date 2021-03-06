import {attachHeadersListener} from 'chrome-sidebar'
import {hosts, iframeHosts} from './settings'

// alert('background');
console.log('background');
chrome.browserAction.onClicked.addListener(tab => {
    chrome.storage.local.clear();
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
    // alert('background recv msg');
    console.log('===background js type: '+ request.type);

    chrome.tabs.query({title: 'BSI Online.'}, function(tabs) {
        console.log('===background js type: '+ request.message);
        var activeTab = tabs[0];
        var activeTabId = activeTab.id; // or do whatever you need

        // var code = '$("[name=' + "property_search_address" + ']").val('+ '"' + request.message + '"' + ');';
        // chrome.tabs.executeScript(activeTabId, {code: code})
        // var message = JSON.parse(request.message);
        // message.data['state'] = 1;
        // chrome.storage.local.set(message);
        chrome.tabs.executeScript(activeTabId, {file: 'autofill.js'}, function() {
            chrome.tabs.sendMessage(activeTabId, request.message);
        });
    });
    sendResponse();
});