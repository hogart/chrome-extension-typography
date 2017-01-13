export function sendToCurrentTab(params, callBack) {
    function onGetTab(tab) {
        const requestParams = [tab.id, params];
        if (callBack) {
            requestParams.push(callBack)
        }
        chrome.tabs.sendMessage(...requestParams);
    }

    chrome.tabs.getSelected(null, onGetTab)
}