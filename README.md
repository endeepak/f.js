## f.js [![Build Status](https://travis-ci.org/endeepak/f.js.png)](https://travis-ci.org/endeepak/f.js)

Write less code for functions returning single line expression

## Examples

### [Lambda / Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions)

			//people.map(function(person) { return person.fullName(); })
			people.map(f.y('(person) => person.fullName()'))
			//movies.sort(function(m1, m2) { return m1.rating - m2.rating'; }
			movies.sort(f.y('(m1, m2) => m1.rating - m2.rating'))

### Properties and Methods

			//books.map(function(book) { return book.title; })
			books.map(f.x('title'))
			//movies.filter(function(movie) { return !movie.watched; })
			movies.filter(f.x('!watched'))

			//people.map(function(person) { return person.fullName(); })
			people.map(f.x('fullName()'))
			//movies.filter(function(movie) { return !movie.isGood(); })
			movies.filter(f.x('!isGood()'))

### Identity and noop

			f(5) //function() { return 5; } 
			f() //function() {  }

### Lambda Alternate (uses [new Function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))

			//people.map(function(person) { return person.fullName(); })
			people.map(f.n('person', 'person.fullName()'))
			//movies.sort(function(m1, m2) { return m1.rating - m2.rating'; }
			movies.sort(f.n('m1', 'm2', 'm1.rating - m2.rating')


## Development

			npm install
			gulp
