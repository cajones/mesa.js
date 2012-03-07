window.mesa = window.mesa || {};

mesa.Util = {

	defaults: function(obj) {

		var args = Array.prototype.slice.call(arguments, 1)

		for (var i = args.length - 1; i >= 0; i--) {
			for (var prop in args[i]) {
	        	if (obj[prop] == null) obj[prop] = args[i][prop];
	      	}
		};
	    return obj;
	}

};

mesa.Core = (function($, util){

	var defaults = {
		table: 'table tbody',
		row: 'tr',
		col: 'td'
	};

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

			util.defaults(options, defaults);

			return rows($(options.table), options);
		}
	};	

})(jQuery, mesa.Util);

mesa.Plugin = (function($) {

	return {

		integrateJQuery: function() {
			
		}
	}

})(jQuery);

mesa.Plugin.integrateJQuery();
