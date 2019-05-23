
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    $("[name='property_search_address']").val(message);
});

