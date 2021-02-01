export const settings = {
    set (value) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({settings: value}, resolve);
        });
    },

    get () {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(['settings'], (value) => {
                resolve(value.settings);
            });
        });
    },
};