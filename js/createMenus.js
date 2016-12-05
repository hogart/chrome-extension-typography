var configuration = {
    "Типографер": {
        contexts: ['page', 'editable'],
        children: {
            "Автоматическая типографика": {
                onclick () {
                    sendToCurrentTab(
                        {action: 'getCurrentInput'}, 
                        function(text) {
                            const typographedContent = Typographer.processText(text);
                            sendToCurrentTab({action: 'setCurrentInputContent', value: typographedContent})
                        }
                    )
                }
            },
            "Вставить знак ударения": {
                onclick (params) {
                    sendToCurrentTab(
                        {action: 'insertAccent'},
                        function(textContext) {
                            const accentedContent = textContext.text.substring(0, textContext.cursorPosition) + '\u0301' + textContext.text.substring(textContext.cursorPosition)
                            sendToCurrentTab({action: 'setCurrentInputContent', value: accentedContent})
                        }
                    )
                }
            },
            "Настройки и помощь": {
                contexts: ['page', 'editable'],
                onclick () {
                    chrome.tabs.create({url: chrome.extension.getURL('options.html'), selected: true})
                }
            }
        }
    }
};

function createItems(conf, parent) {
    var itemId, itemProperties;
    
    for (var title in conf) {
        itemProperties = {
            title: title,
            onclick: conf[title].onclick,
            contexts: conf[title].contexts || ['editable'],
            documentUrlPatterns: ["http://*/*", "https://*/*"]
        };
        if (parent) {
            itemProperties.parentId = parent
        }
        
        itemId = chrome.contextMenus.create(itemProperties);
        
        if ('children' in conf[title]) {
            createItems(conf[title].children, itemId)
        }
    }
}

createItems(configuration);