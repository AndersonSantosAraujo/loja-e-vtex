// Inform the background page that
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction",
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    var urlVtex = document.URL.indexOf("vtex.com");
    var urlVtex2 = document.URL.indexOf("myvtex.com");
    var vtex = document.documentElement.outerHTML.indexOf("vtex");
    var fastStore = document.querySelector("#___gatsby");
    var fastStore2 = document.querySelector("#__next");
    var ioStore = document.querySelector(".render-provider");
    var vtexStore = document.documentElement.outerHTML.indexOf("vtex.cmc");

    var storeType1, storeType2, classType;

    if (urlVtex >= 0 && urlVtex2 < 0) {
      storeType1 = "VTEX";
      storeType2 = "Site Oficial";
      classType = "yes";
    } else if ((fastStore || fastStore2) && vtex >= 0) {
      storeType1 = "Sim";
      storeType2 = "é FastStore";
      classType = "yes";
    } else if (ioStore && vtex >= 0) {
      storeType1 = "Sim";
      storeType2 = "é IO";
      classType = "yes";
    } else if (vtexStore >= 0) {
      storeType1 = "Sim";
      storeType2 = "é Legacy";
      classType = "yes";
    } else {
      storeType1 = "Não";
      storeType2 = " é VTEX!";
      classType = "no";
    }

    var domInfo = {
      preBodyClass: storeType1,
      bodyClass: storeType2,
      typeClass: classType,
    };

    // Directly respond to the sender (popup),
    // through the specified callback.
    response(domInfo);
  }
});
