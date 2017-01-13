import fnd from 'fnd';
import evt from 'fnd/fnd.evt';
import typographer from 'js-typographer';
import {settings} from './settings';
import jsonForm from './jsonForm';

function setupOptionsForm() {
    const form = fnd(`form.options`)[0];

    settings.get().then((options) => {
        jsonForm.toForm(
            form,
            Object.assign({}, typographer.getDefaults(), options)
        );
    });

    evt(form, {
        submit(event) {
            event.preventDefault();

            settings.set(jsonForm.toJson(form)).then(() => console.log(`Saved new settings successfully`));

            return false
        },

        reset(event) {
            event.preventDefault();

            jsonForm.toForm(form, typographer.getDefaults());

            settings.set(jsonForm.toJson(form)).then(() => console.log(`Saved default settings successfully`));

            return false
        }
    });
}

function setupTestgroundForm() {
    const form = fnd(`form.testGround`)[0];
    const text = fnd(`textarea`, form)[0];

    evt(form, {
        submit(event) {
            event.preventDefault();

            settings.get().then(
                (options) => {
                    text.value = typographer.processText(text.value, options);
                }
            );

            return false;
        }
    })
}

window.onload = function() {
    setupOptionsForm();
    setupTestgroundForm();
};