(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.f = factory();
    }
})(this, function () {
	function f(x) { return function() { return x; } };
	f.x = function(expression) {
		var fnExpr = expression[0] === '!' ? expression.replace('!', '!o.') : 'o.' + expression; 
		return f.n('o', fnExpr);
	}
	f.n = function() {
		var args = arguments;
		if(args.length) args[args.length - 1] = "return " + args[args.length - 1];
		return Function.apply({}, args);
	}
	var lambdaRegex = /^(\((.*)\)|([^\(\),.]*))?[\s]*=>[\s]*(.+)/;
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