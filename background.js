chrome.tabs.executeScript({
    file: "overlay.js"
});

chrome.storage.sync.get("overlay", function(data) {
    if (data.overlay == 1) {
        document.getElementById("readingCheckBox").checked = true;
    }
    else {
        chrome.storage.sync.set({ overlay: 0 });
        document.getElementById("readingCheckBox").checked = false;
    }
});
chrome.storage.sync.get("dark", function(data) {
    if (data.dark == 1) {
        document.getElementById("darkCheckBox").checked = true;
    }
    else {
        chrome.storage.sync.set({ dark: 0 });
        document.getElementById("darkCheckBox").checked = false;
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var link = document.getElementById("readingCheckBox");
    link.addEventListener("click", function() {
        if (document.getElementById("readingCheckBox").checked) {
            chrome.storage.sync.get("overlay", function(data) {
                if (data.overlay == 0) {
                    chrome.tabs.executeScript({
                        code: "if (!document.getElementById('overlay4530')) { document.body.appendChild(div); }"
                    });
                }
                chrome.storage.sync.set({ overlay: 1 });
            });
        }
        else {
            chrome.storage.sync.get("overlay", function(data) {
                if (data.overlay == 1) {
                    chrome.tabs.executeScript({
                        code: "if (document.getElementById('overlay4530')) { document.getElementById('overlay4530').remove(); }"
                    });
                }
                chrome.storage.sync.set({ overlay: 0 });
            });
        }
    });

    var link2 = document.getElementById("darkCheckBox");
    link2.addEventListener("click", function() {
        if (document.getElementById("darkCheckBox").checked) {
            chrome.storage.sync.get("dark", function(data) {
                if (data.dark == 0) {
                    chrome.tabs.executeScript({
                        code: "document.documentElement.style.filter = 'invert(1)';"
                    });
                    chrome.tabs.executeScript({
                        code: "document.documentElement.style.backgroundColor = 'black';"
                    });
                    chrome.tabs.executeScript({
                        code: "document.documentElement.style.height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) + 'px';"
                    });
                    chrome.tabs.executeScript({
                        code: "for (var i = 0; i < document.images.length; i++) { document.images[i].style.filter = 'invert(1)'; }"
                    });
                    chrome.tabs.executeScript({
                        code: "var x = document.querySelectorAll('video'); for (var i = 0; i < x.length; i++) { x[i].style.filter = 'invert(1)'; }"
                    });
                }
                chrome.storage.sync.set({ dark: 1 });
            });
        }
        else {
            chrome.storage.sync.get("dark", function(data) {
                if (data.dark == 1) {
                    chrome.tabs.executeScript({
                        code: "document.documentElement.style.filter = 'invert(0)';"
                    });
                    chrome.tabs.executeScript({
                        code: "document.documentElement.style.backgroundColor = '';"
                    });
                    chrome.tabs.executeScript({
                        code: "for (var i = 0; i < document.images.length; i++) { document.images[i].style.filter = 'invert(0)'; }"
                    });
                    chrome.tabs.executeScript({
                        code: "var x = document.querySelectorAll('video'); for (var i = 0; i < x.length; i++) { x[i].style.filter = 'invert(0)'; }"
                    });
                }
                chrome.storage.sync.set({ dark: 0 });
            });
        }
    });
});
