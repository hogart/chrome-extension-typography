const actionMap = {
    getCurrentInput(request, callback, currentInput) {
        callback(currentInput.value);
    },

    setCurrentInputContent(request, callback, currentInput) {
        currentInput.value = request.value;
    },

    insertAccent(request, callback, currentInput) {
        callback({
            text: currentInput.value,
            cursorPosition: currentInput.selectionStart,
        });
    },
};

function messageDispatcher(request, sender, callback) {
    actionMap[request.action](request, callback, document.activeElement);
}

chrome.runtime.onMessage.addListener(messageDispatcher);