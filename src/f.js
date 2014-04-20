var f = function(x) { return function() {return x}; ; };
var lambdaRegex = /\((.*)\)[\s]*=>[\s]*(.+)/;
f.property = function(propertyName) {
	if(propertyName[0] === '!')
		return function(obj) { return !obj[propertyName.substring(1)]; };
	else
		return function(obj) { return obj[propertyName]; };
}
f.method = function(methodName) {
	if(methodName[0] === '!')
		return function(obj) { return !obj[methodName.substring(1)](); };
	else
		return function(obj) { return obj[methodName](); };
}
f.n = function() {
	var args = arguments;
	if(args.length) args[args.length - 1] = "return " + args[args.length - 1];
	return Function.apply({}, args);
}
f.y = function(expression){
	var match = lambdaRegex.exec(expression);
	var argsString = match[1];
	var body = match[2];
	var args = argsString.split(',').map(f.method('trim'));
	return f.n.apply(f, args.concat(body));
}