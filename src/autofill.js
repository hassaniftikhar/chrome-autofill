alert('autofill');
console.log('autofill');

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    console.log(JSON.parse(message));
    var values = JSON.parse(message);
    if(values.data.state == 1) {
        values.data.state += 1;
        chrome.storage.local.set({message: JSON.stringify(values)});
        console.log('autofill: saving with new state ' + JSON.stringify(values));

        $("[name='property_search_address']").val(values.data.line1);
        $("[name='property_search_ccn']").val(values.data.ccn);
        $("[type='submit']").click();
    } else if(values.data.state == 2) {

    }

});

