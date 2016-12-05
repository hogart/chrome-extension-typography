var Settings = (function() {
	return {
		saveAll(json) {
			for (var key in json) {
				localStorage[key] = JSON.stringify(json[key])
			}
		},
		
		loadAll() {
			var result = {};
			for (var key in DEFAULTS) {
				if (key in localStorage) {
					result[key] = JSON.parse(localStorage[key])
				} else {
					result[key] = DEFAULTS[key]
				}
			}
			return result
		},
        
		get(key) {
			return key in localStorage ? JSON.parse(localStorage[key]) : DEFAULTS[key]
		},
        
		set(key, val) {
			localStorage[key] = JSON.stringify(val);
		}
	}
})();