function sendToCurrentTab(params, callBack) {
    function onGetTab(tab) {
        var requestParams = [tab.id, params];
        if (callBack) {
            requestParams.push(callBack)
        }
        chrome.tabs.sendRequest.apply(chrome.tabs, requestParams)
    }
    chrome.tabs.getSelected(null, onGetTab)
}

var DOM = (function() {
    /**
     * DOM traversing
     */
    function find(selector, context) {
        return [].slice.call(
            document.querySelectorAll(selector, context),
            0
        )
    }
    
    /**
     * Event binding
     */
    function _bind(node, type, callBack, isLive) {
        node.addEventListener(type, callBack, isLive);
        return node
    }
    
    function bind(nodes, evtTypes, callBack, isLive) {
        var nodeList = nodes;
    
        if (!('slice' in nodes)) {
            nodeList = [nodes]
        }
        
        if (evtTypes.indexOf(' ') > -1) {
            evtTypes = evtTypes.split(' ')
        }
        else {
            evtTypes = [evtTypes]
        }
        
        for (var elemIndex = 0, elemLen = nodeList.length; elemIndex < elemLen; elemIndex++) {
            for (var evtTypeIndex = 0, evtTypeLen = evtTypes.length; evtTypeIndex < evtTypeLen; evtTypeIndex++) {
                _bind(
                    nodeList[elemIndex],
                    evtTypes[evtTypeIndex],
                    callBack,
                    isLive
                )
            }
        }
        
        return nodes
    }
    
    function bindLive(nodes, evtTypes, callBack) {
        return bind(nodes, evtTypes, callBack, true)
    }
    
    /**
     * classNames manipulation
     */
    function _addClass(node, className) {
        if (node.className.indexOf(className) == -1) {
            node.className = node.className + ' ' + className
        }
    }
    
    function _removeClass(node, className) {
        if (node.className.indexOf(className) > -1) {
            node.className = node.className.replace(
                new RegExp('(^|\\s)' + className + '($|\\s)', 'gm'), 
                " "
            )        
        }

        return node
    }
    
    function addClass(nodes, className) {
        var nodeList = nodes;
        if (!('slice' in nodes)) {
            nodeList = [nodes]
        }
        for (var nodeIndex = 0, nodesLen = nodeList.length; nodeIndex < nodesLen; nodeIndex++) {
            _addClass(nodeList[nodeIndex], className)
        }
        
        return nodes
    }
    
    function removeClass(nodes, className) {
        var nodeList = nodes;
        if (!('slice' in nodes)) {
            nodeList = [nodes]
        }
        for (var nodeIndex = 0, nodesLen = nodeList.length; nodeIndex < nodesLen; nodeIndex++) {
            _removeClass(nodeList[nodeIndex], className)
        }
        
        return nodes
    }
    
    return {
        find: find,
        bind: bind,
        bindLive: bindLive,
        
        addClass: addClass,
        removeClass: removeClass
    }
})();