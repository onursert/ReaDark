chrome.storage.sync.get("overlay", function(data) {
    if (data.overlay != 1) {
        chrome.storage.sync.set({ overlay: 0 });
    }
});
overlayControl();

chrome.storage.sync.get("dark", function(data) {
    if (data.dark != 1) {
        chrome.storage.sync.set({ dark: 0 });
    }
});
darkControl();

document.addEventListener('mousemove', function(e) {
    darkControl();
    overlayControl();
    
    /*if (typeof chrome.app.isInstalled !== 'undefined') {
        chrome.runtime.sendMessage();
    }*/
});

function overlayControl() {
    chrome.storage.sync.get("overlay", function(data) {
        var div = document.createElement("div");
        div.setAttribute("id", "overlay4530");
        div.style.cssText = "position: fixed;" +
                            "display: none;" +
                            "width: 100%;" +
                            "height: 100%;" +
                            "top: 0;" +
                            "left: 0;" +
                            "right: 0;" +
                            "bottom: 0;" +
                            "background-color: rgba(255,215,0,0.3);" +
                            "z-index: 999999999999;" +
                            "display: block;" +
                            "pointer-events: none;";
        if (data.overlay == 1) {
            if (!document.getElementById("overlay4530")) {
                document.body.appendChild(div);
            }
        }
        else {
            if (document.getElementById("overlay4530")) {
                document.getElementById("overlay4530").remove();
            }
        }
    });
}

function darkControl() {
    chrome.storage.sync.get("dark", function(data) {
        if (data.dark == 1) {
            document.documentElement.style.filter = "invert(1)";
            document.documentElement.style.backgroundColor = "black";
            for (var i = 0; i < document.images.length; i++) { document.images[i].style.filter = "invert(1)"; }
            var x = document.querySelectorAll('*'); for (var i = 0; i < x.length; i++) { if (x[i].style.backgroundImage !== '') { x[i].style.filter = 'invert(1)'; } }
            var x = document.querySelectorAll('video'); for (var i = 0; i < x.length; i++) { x[i].style.filter = 'invert(1)'; }
        }
        else {
            document.documentElement.style.filter = "invert(0)";
            document.documentElement.style.backgroundColor = "";
            for (var i = 0; i < document.images.length; i++) { document.images[i].style.filter = "invert(0)"; }
            var x = document.querySelectorAll('*'); for (var i = 0; i < x.length; i++) { if (x[i].style.backgroundImage !== '') { x[i].style.filter = 'invert(0)'; } }
            var x = document.querySelectorAll('video'); for (var i = 0; i < x.length; i++) { x[i].style.filter = 'invert(0)'; }
        }
    });
}
