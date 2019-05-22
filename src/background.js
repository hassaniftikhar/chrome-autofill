import {attachHeadersListener} from 'chrome-sidebar'
import {hosts, iframeHosts} from './settings'

console.log('Chrome Github Trending Sidebar Extension Registered')

chrome.browserAction.onClicked.addListener(tab => {
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
    console.log(request);
    console.log('===background js');
});