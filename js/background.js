import typographer from 'js-typographer';
import {sendToCurrentTab} from './utils/sendToCurrentTab';
import {insertAccent} from './utils/insertAccent';
import {createMenuItems} from './utils/createMenuItems';
import {settings} from './settings';

const menus = {
    [`Типографер`]: {
        contexts: [`page`, `editable`],

        children: {
            [`Автоматическая типографика`]: {
                onclick () {
                    sendToCurrentTab(
                        {action: `getCurrentInput`},
                        function(text) {
                            settings.get().then(
                                (options) => {
                                    const typographedContent = typographer.processHtml(text, options);
                                    sendToCurrentTab({action: `setCurrentInputContent`, value: typographedContent})
                                }
                            );
                        }
                    )
                }
            },
            [`Вставить знак ударения`]: {
                onclick () {
                    sendToCurrentTab(
                        {action: `insertAccent`},
                        function(textContext) {
                            const accentedContent = insertAccent(textContext);
                            sendToCurrentTab({action: `setCurrentInputContent`, value: accentedContent})
                        }
                    )
                }
            },
            [`Настройки и помощь`]: {
                contexts: [`page`, `editable`],
                onclick () {
                    chrome.runtime.openOptionsPage();
                }
            }
        }
    }
};

createMenuItems(menus);
