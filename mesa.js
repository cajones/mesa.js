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

mesa.FieldMapper = function(fieldNames) {
    var hasFields = fieldNames !== null && fieldNames !== undefined && fieldNames instanceof Array && fieldNames.length >= 1;
    this.getName = function(index) {
        return hasFields ? fieldNames[index] : index;
    };
};
mesa.FieldMapper.prototype.map = function(i, e){
    return {
        name: this.getName(i),
        value: $(e).text()
    };
};

mesa.Core = (function($, util, mapper){
    
    var defaults = {
        root: 'root tbody',
        row: 'tr',
        col: 'td',
        fieldNames: null,
        mapper: null
    };

    function fields(row, options) {

        var model = {};
        $(options.col, row).each(function(i, e) {
            var obj = options.mapper.map(i, e);
            model[obj.name] = obj.value;
        });
        return model;
    }

    function rows(root, options) {

        var r = [];
        $(options.row, root).each(function(i, e) {
            r.push(fields($(e), options));
        });
        return r;
    }

    function prepareMapper(options) {
        options.mapper = options.mapper || new mapper(options.fieldNames);
        return options;
    }

    return {

        load: function(options) {

            var o = util.defaults(options || {}, defaults);
            return rows($(o.root), prepareMapper(o));
        },

        loadFromQuery: function(query, options) {
            
            var o = util.defaults(options || {}, defaults);
            return rows(query, prepareMapper(o));
        }
    };  

})(jQuery, mesa.Util, mesa.FieldMapper);

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
