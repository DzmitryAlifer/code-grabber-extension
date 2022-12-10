window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const currentTab = tabs[0];
        const message = {from: 'popup', subject: 'codeSnippet', url: currentTab.url};

        chrome.tabs.sendMessage(currentTab.id, message, data => {
            if (!data?.code) {
                window.close();
                return;
            }
            
            const codeTextArea = document.getElementById('code');
            codeTextArea.textContent = data?.code.trim();
            codeTextArea.select();
            document.execCommand('copy');
            navigator.clipboard.writeText(codeTextArea.textContent);
            window.close();
        });
    });
});

