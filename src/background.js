import {attachHeadersListener} from 'chrome-sidebar'
import {hosts, iframeHosts} from './settings'

console.log('Chrome Github Trending Sidebar Extension Registered')

chrome.browserAction.onClicked.addListener(tab => {
    console.log('Browser Action Triggeredddd')
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
    console.log('===background js');
    if (request.type == "notification")
        console.log('===background js recv notification ...');
    sendResponse();
});

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log("chrome.tabs.query");
//     var activeTab = tabs[0];
//     console.log(activeTab);
//     var activeTabId = activeTab.id; // or do whatever you need
//     console.log(activeTabId);
//     $x('//*[@id="stage"]/table/tbody/tr/td[1]/div/form/input[1]')[0].value = 'asdf';
// });


