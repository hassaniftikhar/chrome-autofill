// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setChildTextNode(elementId, text) {
    document.getElementById(elementId).innerText = text;
}

// Tests the roundtrip time of sendMessage().
function testMessage() {
    setChildTextNode("resultsRequest", "running...");

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        console.log("chrome.tabs.query");
        var activeTab = tabs[0];
        console.log(activeTab);
        var activeTabId = activeTab.id; // or do whatever you need
        console.log(activeTabId);
        $x('//*[@id="stage"]/table/tbody/tr/td[1]/div/form/input[1]')[0].value = 'asdf';
    });
}

// Tests the roundtrip time of Port.postMessage() after opening a channel.
(function () {
    // if (!chrome.benchmarking) {
    //   alert("Warning:  Looks like you forgot to run chrome with " +
    //         " --enable-benchmarking set.");
    //   return;
    // }
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('#testMessage').addEventListener(
            'click', testMessage);
    });
})();
