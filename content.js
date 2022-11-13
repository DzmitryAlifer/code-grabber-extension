const SEARCH_WORD = 'console';
const XPATH = `(//body//*[contains(text(),"${SEARCH_WORD}")][not(self::script)])[1]`;

chrome.runtime.sendMessage({from: 'content', subject: 'showPageAction'});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const codeNode = document.evaluate(XPATH, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const hasConsoleCode = !!codeNode.singleNodeValue;

    if (message.from === 'background' && ['tabUpdated', 'tabActivated'].includes(message.subject)) {
        sendResponse({hasConsoleCode});
    }

    if (hasConsoleCode && message.from === 'popup' && message.subject === 'codeSnippet') {
        const code = codeNode.singleNodeValue
            .parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.parentNode.parentNode
            .innerText
            .replaceAll('​', '')
            .replaceAll('console.log', 'console.info')
            .replaceAll(/\d+\n/g, '\n')
            .replaceAll(/\n\d+\n/g, '\n')
            .replaceAll('\n\n', '\n')
            .replace(/^\n/, '');
        sendResponse({code});
    }
});