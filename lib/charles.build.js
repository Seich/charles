charles.build = (function () {
	function build(child) {
		var Class = function() {};

		if ("private" in child) {
			console.log(1);
		}

	}

	return build;
})(); 