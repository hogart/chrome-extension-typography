export function createMenuItems(config, parent = null) {
    Object.keys(config).forEach((title) => {
        const configItem = config[title];
        const itemProperties = {
            title,
            onclick: configItem.onclick,
            contexts: configItem.contexts || [`editable`],
            documentUrlPatterns: [`http://*/*`, `https://*/*`]
        };

        if (parent) {
            itemProperties.parentId = parent;
        }

        const itemId = chrome.contextMenus.create(itemProperties);

        if (configItem.hasOwnProperty('children')) {
            createMenuItems(configItem.children, itemId);
        }
    });
}