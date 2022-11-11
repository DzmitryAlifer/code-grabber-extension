const setCode = data => {
    const codeTextArea = document.getElementById('code');
    codeTextArea.textContent = data?.code;
    codeTextArea.select();
    document.execCommand('copy');
    navigator.clipboard.writeText(data?.code);
};

window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'codeSnippet' }, setCode);
    });
});

