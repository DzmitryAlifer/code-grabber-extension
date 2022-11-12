chrome.tabs.onUpdated.addListener(() => sendSubjectMessage('tabUpdated')); 
chrome.tabs.onActivated.addListener(() => sendSubjectMessage('tabActivated'));

function sendSubjectMessage(subject) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        if (!tabs?.length) {
            setInactiveIcon();
        } else {
            chrome.tabs.sendMessage(tabs[0].id, {from: 'background', subject}, data => {
                data?.hasConsoleCode ? setActiveIcon() : setInactiveIcon();
            });
        }
    });
}

function setActiveIcon() {
    chrome.action.setIcon({
        path: {
            "16": "icons/js_icon_16.png",
            "32": "icons/js_icon_32.png",
            "64": "icons/js_icon_64.png"
        }
    });
}

function setInactiveIcon() {
    chrome.action.setIcon({
        path: {
            "16": "icons/js_icon_grey_16.png",
            "32": "icons/js_icon_grey_32.png",
            "64": "icons/js_icon_grey_64.png"
        }
    });
}