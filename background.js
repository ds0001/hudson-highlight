// send a message to the content script
var toggleHightlight = function(tab, state) {
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

// listening for an event / one-time requests
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "toggleHightlight":
            chrome.tabs.query({'active': true}, function(tabs) {
              console.log('keywords',request.keywords);
              chrome.tabs.sendMessage(tabs[0].id, {type: "toggleHightlight", keywords: request.keywords}, function(response) {
                  toggleHightlight(tabs[0], response.state);
                  console.log('toggleHightlight');
              });
            });
        break;
    }
    return true;
});

chrome.tabs.query({'active': true}, function(tabs) {
    // runs when extension is activated
    console.log('active');
});


chrome.browserAction.onClicked.addListener(function(tab) {
  // send message to content
  chrome.tabs.sendMessage(tab.id, {type: "toggleHightlight"}, function(response) {
      toggleHightlight(tab, response.state);
  });
});
