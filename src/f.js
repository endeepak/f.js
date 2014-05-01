(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.f = factory();
    }
})(this, function () {
	var lambdaRegex = /^(\((.*)\)|([^\(\),.]*))?[\s]*=>[\s]*(.+)/;
	var expanderRegex = /^(\!?)([^\(\).]+)(\(\))?$/;
	function f(x) { return function() { return x; } };
	f.x = function(expression) {
		var match = expanderRegex.exec(expression);
		var isNegated = match[1];
		var propertyName = match[2];
		var isMethod = match[3];
		if(isNegated)
			return isMethod ? function(obj) { return !obj[propertyName](); } : function(obj) { return !obj[propertyName]; };
		else
			return isMethod ? function(obj) { return obj[propertyName](); } : function(obj) { return obj[propertyName]; };
	}
	f.n = function() {
		var args = arguments;
		if(args.length) args[args.length - 1] = "return " + args[args.length - 1];
		return Function.apply({}, args);
	}
	f.y = function(expression){
		var match = lambdaRegex.exec(expression);
		if (!match) throw new Error('Error in lambda syntax : ' + expression);
		var argsString = match[2] || match[3];
		var body = match[4];
		var args = argsString.split(',').map(f.x('trim()'));
		return f.n.apply(f, args.concat(body));
	}
	return f;
});