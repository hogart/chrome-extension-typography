var JsonForm = (function(){
	function getType(node) {
		if (node.tagName != 'INPUT') {
			return node.tagName.toLower()
		}
		else {
			return node.type;
		}
	}
	
	var getData = {
		'select': function(node) {
			return node.value;
		},
		'text': function(node) {
			return node.value;
		},
		'number': function(node) {
			return JSON.parse(node.value);
		},
		'checkbox': function(node) {
			return node.checked
		},
		'textarea': function(node) {
			return node.innerHTML
		}
	}
	
	
	var setData = {
		'select': function(node, val) {
			node.value = val;
		},
		'text': function(node, val) {
			node.value = val;
		},
		'number': function(node, val) {
			node.value = val;
		},
		'checkbox': function(node, val) {
			node.checked = (val == 'true' || (val + '') == 'true');
		},
		'textarea': function(node, val) {
			node.innerHTML = val;
		}
	}
	
	function toForm(frm, json) {
		for (var key in json) {
			if (key in frm) {
				setData[getType(frm[key])](frm[key], json[key])
			}
		}
	}
	function fromForm(frm) {
		var json = {};
		var inputs = [].slice.call(frm.querySelectorAll('input, select, textarea'), 0);
		inputs.forEach(function(node) {
			json[node.name] = getData[getType(node)](node);
		})
		
		return json
	}
	return {
		toForm: toForm,
		fromForm: fromForm
	}
})();