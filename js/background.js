import typographer from 'js-typographer';
import {sendToCurrentTab} from './utils/sendToCurrentTab';
import {insertAccent} from './utils/insertAccent';
import {createMenuItems} from './utils/createMenuItems';
import {settings} from './settings';
import { emulateFormatting, formatting } from './utils/emulateFormatting';

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
            [`Форматирование`]: {
                children: {
                    [`Вставить знак ударения`]: {
                        onclick() {
                            sendToCurrentTab(
                                { action: `insertAccent` },
                                function (textContext) {
                                    const accentedContent = insertAccent(textContext);
                                    sendToCurrentTab({
                                        action: `setCurrentInputContent`,
                                        value: accentedContent
                                    })
                                }
                            )
                        }
                    },

                    [`з̶а̶ч̶е̶р̶к̶н̶у̶т̶ы̶й̶`]: {
                        onclick() {
                            sendToCurrentTab(
                                { action: `replaceText` },
                                function (textContext) {
                                    const textToFormat = textContext.text.substring(textContext.selectionStart, textContext.selectionEnd);

                                    const newContent =
                                        textContext.text.substring(0, textContext.selectionStart) +
                                        emulateFormatting(textToFormat, formatting.strikethrough) +
                                        textContext.text.substring(textContext.selectionEnd);

                                    sendToCurrentTab({
                                        action: `setCurrentInputContent`,
                                        value: newContent
                                    })
                                }
                            )
                        }
                    },

                    [`͟п͟о͟д͟ч͟е͟р͟к͟н͟у͟т͟ы͟й͟`]: {
                        onclick() {
                            sendToCurrentTab(
                                { action: `replaceText` },
                                function (textContext) {
                                    const textToFormat = textContext.text.substring(textContext.selectionStart, textContext.selectionEnd);

                                    const newContent =
                                        textContext.text.substring(0, textContext.selectionStart) +
                                        emulateFormatting(textToFormat, formatting.underline) +
                                        textContext.text.substring(textContext.selectionEnd);

                                    sendToCurrentTab({
                                        action: `setCurrentInputContent`,
                                        value: newContent
                                    })
                                }
                            )
                        }
                    },
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
