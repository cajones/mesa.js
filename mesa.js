window.jData = window.jData || {};

jData.Util = {


	extend: function(obj) {

		var args = Array.prototype.slice.call(arguments, 1)

		for (var i = args.length - 1; i >= 0; i--) {
			for (var prop in args[i]) {
	        	obj[prop] = args[i][prop];
	      	}
		};
	    return obj;
	}
};

jData.Core = (function($){

	var defaults = {
		table: 'table tbody',
		row: 'tr',
		col: 'td'
	};

	// function cols(row, options) {
	// 	return $(options.col, row)
	// 				.map(value)
	// 				.makeArray();
	// }

	function cols(row, options) {

		var c = [];
		$(options.col, row).each(function(i, e) {
			c.push($(e).text());
		});
		return c;
	}

	function rows(table, options) {

		var r = [];
		$(options.row, table).each(function(i, e) {
			r.push(cols($(e), options));
		});
		return r;
	}

	return {

		load: function(options) {

			jData.Util.extend(options, defaults);

			return rows($(options.table), options);
		}
	};	

})(jQuery);

jData.Plugin = (function($) {

	return {

		integrateJQuery: function() {
			
		}
	}

})(jQuery);

jData.Plugin.integrateJQuery();
