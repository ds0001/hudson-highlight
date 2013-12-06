// listening for an event / one-time requests

chrome.tabs.query({'active': true}, function(tabs) {
    // runs when extension is activated
    console.log('active');
});


chrome.browserAction.onClicked.addListener(function(tab) {
  // send message to content
  chrome.tabs.sendMessage(tab.id, {type: "toggleHightlight"}, function(response) {
      toggleController(tab, response.state);
  });
});


// send a message to the content script
var toggleController = function(tab, state) {
  // setting icon
  if(state === 'enable') {
    chrome.browserAction.setIcon({
        path: "images/38x38-on.png",
        tabId: tab.id
    });
  } else {
    chrome.browserAction.setIcon({
        path: "images/38x38.png",
        tabId: tab.id
    });
  }
};
