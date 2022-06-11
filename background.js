const getTabId = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id;
};

document.addEventListener("DOMContentLoaded", async () => {
    const tabId = await getTabId();

    chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        files: ["overlay.js"],
    });

    chrome.storage.sync.get("overlay", (data) => {
        if (data.overlay == 1) {
            document.getElementById("readingCheckBox").checked = true;
        } else {
            chrome.storage.sync.set({ overlay: 0 });
            document.getElementById("readingCheckBox").checked = false;
        }
    });
    chrome.storage.sync.get("dark", (data) => {
        if (data.dark == 1) {
            document.getElementById("darkCheckBox").checked = true;
        } else {
            chrome.storage.sync.set({ dark: 0 });
            document.getElementById("darkCheckBox").checked = false;
        }
    });

    const link = document.getElementById("readingCheckBox");
    link.addEventListener("click", () => {
        if (document.getElementById("readingCheckBox").checked) {
            chrome.storage.sync.get("overlay", (data) => {
                if (data.overlay == 0) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => {
                            if (!document.getElementById("overlay4530")) {
                                document.body.appendChild(div);
                            }
                        },
                    });
                }
                chrome.storage.sync.set({ overlay: 1 });
            });
        } else {
            chrome.storage.sync.get("overlay", (data) => {
                if (data.overlay == 1) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => {
                            if (document.getElementById("overlay4530")) {
                                document.getElementById("overlay4530").remove();
                            }
                        },
                    });
                }
                chrome.storage.sync.set({ overlay: 0 });
            });
        }
    });

    const link2 = document.getElementById("darkCheckBox");
    link2.addEventListener("click", () => {
        if (document.getElementById("darkCheckBox").checked) {
            chrome.storage.sync.get("dark", (data) => {
                if (data.dark == 0) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => (document.documentElement.style.filter = "invert(1)"),
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () =>
                            (document.documentElement.style.backgroundColor = "black"),
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () =>
                        (document.documentElement.style.height =
                            Math.max(
                                document.body.scrollHeight,
                                document.body.offsetHeight,
                                document.documentElement.clientHeight,
                                document.documentElement.scrollHeight,
                                document.documentElement.offsetHeight
                            ) + "px"),
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => {
                            for (let i = 0; i < document.images.length; i++) {
                                document.images[i].style.filter = "invert(1)";
                            }
                        },
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => {
                            let x = document.querySelectorAll("video");
                            for (let i = 0; i < x.length; i++) {
                                x[i].style.filter = "invert(1)";
                            }
                        },
                    });
                }
                chrome.storage.sync.set({ dark: 1 });
            });
        } else {
            chrome.storage.sync.get("dark", (data) => {
                if (data.dark == 1) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => (document.documentElement.style.filter = "invert(0)"),
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => (document.documentElement.style.backgroundColor = ""),
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => {
                            for (let i = 0; i < document.images.length; i++) {
                                document.images[i].style.filter = "invert(0)";
                            }
                        },
                    });
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        func: () => {
                            let x = document.querySelectorAll("video");
                            for (let i = 0; i < x.length; i++) {
                                x[i].style.filter = "invert(0)";
                            }
                        },
                    });
                }
                chrome.storage.sync.set({ dark: 0 });
            });
        }
    });
});
