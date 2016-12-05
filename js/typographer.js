var Typographer = (function() {
	var options = {
        double2French: true,
        single2German: true,
        dashes2MDash: true,
        dashesBetweenNumbers: true,
        dots2Hellip: false,
        arrows: true,
        fractions: true,
        copyrights: true
    }

	var replacements = {
    	double2French: function() {
            var tmp = this

            tmp = tmp.replace(/(\S)"(\s|$|\Z|,|\?|\!|\.|»|“|')/gm, "$1»$2")
            tmp = tmp.replace(/(\s|^|\A|«|„|')"(\S)/gm, "$1«$2")
            
            return tmp
        },

        single2German: function() {
            var tmp = this
        	
            tmp = tmp.replace(/(\S)'(\s|$|\Z|,|\?|\!\.|»|“|")/gm, "$1“$2")
            tmp = tmp.replace(/(\s|^|\A|«|„|")'(\S|«|„|"|')/gm, "$1„$2")
            
            return tmp
        },

        dashes2MDash: function() {
        	return this.replace(/(\s|^)--(\s|$)/gm, "$1—$2")
        },

        dashesBetweenNumbers: function() {
        	return this.replace(/(\d)--(\d)/gm, "$1–$2")
        },

        dots2Hellip: function() {
        	return this.replace(/\.\.\./gm, '…')
        },

        arrows: function() {
        	return this.replace(/\<\-\>/gm, '↔').replace(/\-\>/gm, '→').replace(/\<\-/gm, '←')
        },

        fractions: function() {
        	return this.replace(/1\/4/gm, '¼').replace(/1\/2/gm, '½').replace(/3\/4/gm, '¾')
        },

        copyrights: function() {
        	var tmp = this.replace(/\([rR]+\)/gm, '®')
    		tmp = tmp.replace(/\([cCсС]+\)/gm, '©')
    		return tmp.replace(/\(tm|TM\)/gm, '™')
        }
    }
    
    function addRule(name, fn) {
        replacements[name] = fn
        return this
    }
    
    function removeRule(name) {
        delete replacements[name]
        return this
    }

    function processString(str) {
    	for (var key in options) {
        	if (options[key]) { // if key explicitly set to true
                if (key in replacements) {
                    str = replacements[key].call(str)
                }
                else {
                    throw "No replacement rule defined for “" + key + "” key."
                }
            }
        }
        return str
    }

    // recursive node walk
	function processNode(node) {
        var child
        var tagName
        var nodeType

        for (var i in node.childNodes) {
            child = node.childNodes[i]
			nodeType = child.nodeType

            if (nodeType == 3 || nodeType == 8) { // text node or comment node
                child.textContent = processString(child.textContent)
            }
            else if (child.nodeType == 1) {
                tagName = child.tagName.toLowerCase()
                if (tagName == 'code' || tagName == 'var') {
                    child.textContent = child.textContent.replace('<', '&lt;').replace('>', '&gt;')
                }
                else {
                    if (child.getAttribute('alt')) {
                        child.setAttribute('alt', processString(child.getAttribute('alt')))
                    }
                    if (child.getAttribute('title')) {
                        child.setAttribute('title', processString(child.getAttribute('title')))
                    }
                    if (child.getAttribute('text')) { // e.g. for LiveJournal cut tag
                        child.setAttribute('text', processString(child.getAttribute('text')))
                    }
                    typoNode(child);
                }
            }
        }

        return node
	}

    function processText(str) {
        var div = document.createElement('div')
        div.innerHTML = str
        var result = processNode(div).innerHTML

        return result
    }

    return {
        processText: processText,
        processNode: processNode,
        processString: processString,
        
        setOptions: function(params) {
            options = params
            return this
        },
        
        addRule: addRule,
        removeRule: removeRule
    }
}).call({})
