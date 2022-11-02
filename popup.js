const setCode = info => {
    const codeTextArea = document.getElementById('code');
    codeTextArea.textContent = info.code;
    codeTextArea.select();
    document.execCommand('copy');
    navigator.clipboard.writeText(info.code);
};

window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'codeSnippet' }, setCode);
    });
});

