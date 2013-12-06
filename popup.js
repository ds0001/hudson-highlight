// popup.js
window.onload = function() {
    document.getElementById("button").onclick = function() {
        var inputs = document.getElementsByTagName('input'),
            i=0,
            keywords=[];
        for(i; i < inputs.length; i++) {
            if(inputs[i].value.length > 0) {
                keywords.push(inputs[i].value);
            }
        }
        chrome.extension.sendMessage({
            type: "toggleHightlight",
            keywords: keywords
        });
    }
}
