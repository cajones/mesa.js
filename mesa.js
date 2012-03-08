window.mesa = window.mesa || {};

mesa.ObjectFactory = (function() {
    
    var container = {};
    return {
        register: {
            instance: function(obj, named) {
    
                container[named] = obj;
            }
        },
        create: function(name) {

            if(!container.hasOwnProperty(name)) throw 'Object factory does not contain an instance named \'' + name + '\''; 
            return container[name];
        }
    };
})();

mesa.Util = {

    defaults: function(obj) {

        var args = Array.prototype.slice.call(arguments, 1)

        for (var i = args.length - 1; i >= 0; i--) {
            for (var prop in args[i]) {
                if (obj[prop] == null) obj[prop] = args[i][prop];
            }
        };
        return obj;
    },
    SelectorEngine: function() {
        
        throw "jQuery or Zepto is required as a selector engine.";
    }
};

mesa.FieldMapper = function(fieldNames) {
    
    var hasFields = fieldNames !== null && fieldNames !== undefined && fieldNames instanceof Array && fieldNames.length >= 1;
    this.getName = function(index) {
    
        return hasFields  ? fieldNames[index] : index;
    };
};
mesa.FieldMapper.prototype.map = function(i, e){
    
    return {
        name: this.getName(i),
        value: $(e).text()
    };
};

mesa.init = function() {

    mesa.ObjectFactory.register.instance(window['jQuery'] || window['Zepto'] || mesa.Util.SelectorEngine, 'selector engine');
    mesa.ObjectFactory.register.instance(window['_'] || mesa.Util, 'utility');
    mesa.ObjectFactory.register.instance(mesa.FieldMapper, 'field mapper');
};

mesa.construct = function() {

    mesa.Core = (function($, util, mapper){
    
        var defaults = {
            root: 'table tbody',
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

        function ensureOptionsAreInitialised(options) {
            var options = util.defaults(options || {}, defaults);
            options.mapper = options.mapper || new mapper(options.fieldNames);
            return options;
        }

        return {

            load: function(options) {

                return rows($(options.root), ensureOptionsAreInitialised(options));
            },

            loadFromQuery: function(query, options) {
                
                return rows(query, ensureOptionsAreInitialised(options));
            }
        };  

    })(mesa.ObjectFactory.create('selector engine'), mesa.ObjectFactory.create('utility'), mesa.ObjectFactory.create('field mapper'));

    mesa.Plugin = (function($, core) {

        return {
            integrateJQuery: function() {
                
                $.fn.mesa = function(options) {
                    
                    return core.loadFromQuery(this, options);
                }
            }
        }

    })(mesa.ObjectFactory.create('selector engine'), mesa.Core);

    mesa.Plugin.integrateJQuery();
};

mesa.init();
mesa.construct();