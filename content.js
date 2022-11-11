const SEARCH_WORD = 'console';
const XPATH = `//body//*[contains(text(),"${SEARCH_WORD}")]`;

chrome.runtime.sendMessage({from: 'content', subject: 'showPageAction'});

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.from === 'popup' && message.subject === 'codeSnippet') {
    const code = document.evaluate(XPATH, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue
      .parentNode
      .parentNode
      .parentNode
      .parentNode
      .innerText
      .replaceAll('​', '')
      .replaceAll('console.log', 'console.info')
      .replaceAll(/\d+\n/g, '\n')
      .replaceAll(/\n\d+\n/g, '\n')
      .replaceAll('\n\n', '\n')
      .replace(/^\n/, '');
    response({code});
  }
});