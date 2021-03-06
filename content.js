
var defautKeywords = [
    ['cannot','bold negative'],
    ['done','bold positive'],
    ['without errors','bold positive'],
    ['error','bold negative'],
    ['failure','bold negative'],
    ['running','bold positive'],
    ['success','bold positive'],
    ['warning','bold warn'],
    ['wrong','bold negative'],
    ['\[.*?[.]nytimes[.]com\]','highlight']
];

var highlight = function(keywords) {
    var $pre =  $('pre'),
        content = $pre.html(),
        i=0,
        re='';

    for(i=0;i<keywords.length;i++) {
        keywords[i] = keywords[i].split(',');
        re = new RegExp(keywords[i][0],"gi");
        content = content.replace(re, '<span class="'+keywords[i][1]+'">'+keywords[i][0]+'</span>');
    }
    content = content.replace(/\\n/ig, '<br>');
    content = content.replace(/\\"/g, '"');
    $($pre).html(content);
};

// This will run after user has clicked the browser action icon.
chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.type) {
        case "toggleHightlight":
            var $body = $(document.body);
            if($($body).hasClass("hudson-highlight")) {
              $($body).removeClass('hudson-highlight');
                sendResponse({state: "disable"});
            } else {
                $($body).addClass('hudson-highlight');
                sendResponse({state: "enable"});
                highlight(message.keywords);
            }
        break;
    }
});
