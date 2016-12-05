var currentInput;
var cursorPosition;

function reqDispatcher(request, sender, callback) {
    currentInput = document.activeElement;
    cursorPosition = currentInput.selectionStart;

    switch (request.action) {
        case 'getCurrentInput': 
            callback(currentInput.value);
        break;
        
        case 'setCurrentInputContent':
            currentInput.value = request.value;
        break;
        
        case 'insertAccent':
            callback({text: currentInput.value, cursorPosition: cursorPosition});
        break
    }
}

chrome.extension.onRequest.addListener(reqDispatcher);