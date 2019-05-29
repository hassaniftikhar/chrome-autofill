/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
/******/ })
/************************************************************************/
/******/ ({

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// alert('autofill');
console.log('autofill');

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // alert('autofill recv msg');
    console.log('autofill recv msg' + message);
    var values = JSON.parse(message);
    console.log('autofill recv val' + values);
    // if (message.type == 'fill_bsi') {
    processes(values);
    // }
    sendResponse();
});

function customerPage(message) {
    console.log('customerPage got msg: ' + message);
    // console.log(JSON.parse(message));
    // var values = JSON.parse(message);
    message.data.state += 1;
    chrome.storage.local.set(message);
    console.log('autofill: saving with new state ' + JSON.stringify(message));

    $("[name='property_search_address']").val(message.data.line1);
    $("[name='property_search_ccn']").val(message.data.ccn);
    $("[type='submit']").click();
}

function processes(message) {
    console.log('processes: message: ' + message);
    message.data.state = message.data.state || 1;
    if (message.data.state == 1) {
        console.log('state 1');
        customerPage(message);
    } else if (message.data.state == 2) {
        if (message.data.replaced_device == true) {
            waitForElement("tr.has-data", function () {
                console.log("devices-table loaded");
                replaceDevice(message.data);
            });
        }
    }
}

function waitForElement(elementPath, callBack) {
    window.setTimeout(function () {
        if ($(elementPath).length) {
            callBack(elementPath, $(elementPath));
        } else {
            waitForElement(elementPath, callBack);
        }
    }, 500);
}

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

function replaceDevice(data) {
    console.log('replaceDevice msg: ' + JSON.stringify(data));
    var serial = '06706'; //data.replaced_serial;
    var manufacturer = data.manufacturer;
    var model = data.model;
    var size = data.size;
    var line1 = data.line1;
    var testDate = data.test_date;

    alert('before');
    var key = "td[title*='" + serial + "']";

    console.log('serial div length ' + $(key).length);
    $(key).click();

    $("input[value='replace device']").click();
    var val = $("select[name='previous-idHazard'] option:selected").val();
    $("select[name='idHazard']").val(val).change();
    val = $("select[name='idManufacturer'] option:contains(" + manufacturer + ")").val();
    $("select[name='idManufacturer']").val(val).change();
    val = $("select[name='idModel'] option:contains(" + model + ")").val();
    $("select[name='idModel']").val(val).change();
    // idSize
    val = $("select[name='idSize'] option:contains(" + size + ")").val();
    $("select[name='idSize']").val(val).change();
    $("input[name='szSerialNumber']").val(serial);
    $("textarea[name='txtLocation']").val(line1);
    // alert('continue');
    // $("input[name='save-button']").click();
    // click enter button

    // 'enter test'
    // $("input[value='enter test']").click();
    // wait(5000);
    $("input[name='date']").val(testDate);
    // click go button
    alert('continue');
    // $("input[name='go-button']").click();

    test_page(data);
}

function test_page(data) {
    if (data.device_type_name == 'PVB') {
        fill_in_pvb_fields(data);
    }

    var val = $("select[name='idTester'] option:contains(" + data.tester_name + ")").val();
    $("select[name='idTester']").val(val).change();

    val = $("select[name='idTestKit'] option:contains(" + data.test_kit + ")").val();
    $("select[name='idTestKit']").val(val).change();

    $("textarea[name='txtComment']").val(data.test_comments);

    //@test.passed? || retest? ? 'pass' : 'fail'
    val = data.passed || data.retest ? 'PASS' : 'FAIL';
    $("label:contains('" + val + "')").click();
}

function fill_in_pvb_fields(data) {
    var check1 = data.check1 == true ? 'Opened' : 'Did Not Open';
    $("input[name='TestCheckValues[0][fInitialValue]']").val(data.check1_psi);
    $(".states span:contains('" + check1 + "')").click();

    var check2 = data.check2 == true ? 'Closed Tight/Held' : 'Leaked';
    $("input[name='TestCheckValues[1][fInitialValue]").val(data.check2_psi);
    $(".states span:contains('" + check2 + "')").click();

    if (data.retest) {
        $('input[name="repaired-button"]').trigger('click');

        check1 = data.retest_check1 == true ? 'Opened' : 'Did Not Open';
        $("input[name='TestCheckValues[0][fFinalValue]']").val(data.retest_check1_psi);
        $(".layout.final_test_table span:contains('" + check1 + "')").click();

        check1 = data.retest_check2 == true ? 'Closed Tight/Held' : 'Leaked';
        $("input[name='TestCheckValues[1][fInitialValue]").val(data.retest_check2_psi);
        $(".layout.final_test_table span:contains('" + check1 + "')").click();
    }
}

function determineState() {
    console.log('determineState');
    // var ccn = window.location.href.split('szCCN=')[1];
    // console.log('autofill ccn from url: ' + ccn);
    var message;
    chrome.storage.local.get(['data'], function (result) {
        console.log('Value currently is ' + result.data);
        message = result;
    });
    console.log('autofill key from stroge: ' + message);
    processes(message);
}

/***/ })

/******/ });