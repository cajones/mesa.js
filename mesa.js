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
        root: 'root tbody',
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

    function rows(root, options) {

        var r = [];
        $(options.row, root).each(function(i, e) {
            r.push(cols($(e), options));
        });
        return r;
    }

    return {

        load: function(options) {

            var o = util.defaults(options || {}, defaults);
            return rows($(o.root), o);
        },

        loadFromQuery: function(query, options) {
            
            var o = util.defaults(options || {}, defaults);
            return rows(query, o);
        }
    };  

})(jQuery, mesa.Util);

mesa.Plugin = (function($, core) {

    return {
        integrateJQuery: function() {
            
            $.fn.mesa = function(options) {
                
                return core.loadFromQuery(this, options);
            }
        }
    }

})(jQuery, mesa.Core);

mesa.Plugin.integrateJQuery();
