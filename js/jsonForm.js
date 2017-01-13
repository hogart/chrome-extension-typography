import fnd from 'fnd';

function getType(node) {
    const tagName = node.tagName.toLowerCase();
    if (tagName !== `input`) {
        return tagName;
    } else {
        return node.type;
    }
}

const getData = {
    select(node) {
        return node.value;
    },
    text(node) {
        return node.value;
    },
    number(node) {
        return JSON.parse(node.value);
    },
    checkbox(node) {
        return node.checked
    },
    textarea(node) {
        return node.innerHTML
    }
};

const setData = {
    select(node, val) {
        node.value = val;
    },
    text(node, val) {
        node.value = val;
    },
    number(node, val) {
        node.value = val;
    },
    checkbox(node, val) {
        node.checked = (val === true || val.toString === 'true');
    },
    textarea(node, val) {
        node.innerHTML = val;
    }
};

const jsonForm = {
    toForm(frm, json) {
        for (let key in json) {
            if (key in frm) {
                const element = frm[key];
                setData[getType(element)](element, json[key])
            }
        }
    },

    toJson(frm) {
        const json = {};
        const inputs = fnd(`input, select, textarea`, frm);
        inputs.forEach((node) => {
            json[node.name] = getData[getType(node)](node);
        });

        return json
    },
};

export default jsonForm;