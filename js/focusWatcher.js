const isInput = (element) => element.matches(`input, textarea`);
const isRich = (element) => element.matches(`[contenteditable]`);

const actionMap = {
    getCurrentInput(request, callback, currentInput) {
        if (isInput(currentInput)) {
            callback(currentInput.value);
        } else if (isRich(currentInput)) {
            callback(currentInput.innerHTML);
        }
    },

    setCurrentInputContent(request, callback, currentInput) {
        if (isInput(currentInput)) {
            currentInput.value = request.value;
        } else if (isRich(currentInput)) {
            currentInput.innerHTML = request.value;
        }
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