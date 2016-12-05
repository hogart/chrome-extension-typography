const fnd = require('fnd');
const evt = require('fnd/fnd.evt');

class DlTabs {
    constructor(root) {
        this.root = root;

        this.headers = fnd('dt.tabs-header', this.root);
        this.panes = fnd('dt.tabs-pane', this.root);

        for (let [header, i] of this.headers.entries()) {
            header.dataset.tabindex = i;
            this.panes[i].dataset.tabindex = i;
        }

        this.bindListeners();
    }

    bindListeners() {
        evt(
            this.root,
            {
                'click dt.tabs-header': 'onTabChange',
            },
            this
        );
    }

    onTabChange(event) {
        this.unselectAll();

        var index = event.target.dataset.tabindex;
        this.setByIndex(index)
    }

    unselectAll() {
        this.headers.forEach((el) => el.classList.remove('selected'));
        this.panes.forEach((el) => el.classList.remove('selected'));
    }

    setByIndex(index) {
        this.headers[index].classList.add('selected');
        this.panes[index].classList.add('selected');
    }
}