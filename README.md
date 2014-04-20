## f.js

functions to make your code more readable by removing need for curly braces

## Examples

### Properties

| f.js                                      | Native 		                                            |  
| ----                                      | -----------------                                         |  
| books.map(f.property('title'))            | books.map(function(book) { return book.title; })          |  
| movies.filter(f.property('watched'))      | movies.filter(function(movie) { return movie.watched; })  |  
| movies.filter(f.property('!watched'))     | movies.filter(function(movie) { return !movie.watched; }) |  

### Methods

| f.js                                      | Native 		                                             |  
| ----                                      | -----------------                                          |  
| people.map(f.property('fullName'))        | people.map(function(person) { return person.fullName(); }) |  
| movies.filter(f.method('isGood'))         | movies.filter(function(movie) { return movie.isGood(); })  |  
| movies.filter(f.method('!isGood'))        | movies.filter(function(movie) { return !movie.isGood(); }) |  

### Identity and noop

| f.js      | Native 		            |
| ----      | -----------------         |
| f()       | function() {  }           |
| f(5)      | function() { return 5; }  |

### [Lambda / Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/arrow_functions)

| f.js                                                  | Native 		                                                  |  
| ----                                                  | -----------------                                               |  
| people.map(f.y('(person) => person.fullName()'))      | people.map(function(person) { return person.fullName(); })      |  
| movies.sort(f.y('(m1, m2) => m1.rating - m2.rating')  | movies.sort(function(m1, m2) { return m1.rating - m2.rating'; } |  

### Lambda Alternate (uses [new Function syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))

| f.js                                                  | Native 		                                                  		  |  
| ----                                                  | -----------------                                               		  |  
| people.map(f.n('person', 'person.fullName()'))        | people.map(function(person) { return person.fullName(); })      		  |  
| 														| people.map(new Function('person', 'return person.fullName();')) 		  |  
| movies.sort(f.n('m1', 'm2', 'm1.rating - m2.rating')  | movies.sort(function(m1, m2) { return m1.rating - m2.rating'; } 		  |  
|														| movies.sort(new Function('m1', 'm2', 'return m1.rating - m2.rating'); } |

## Development

			npm install
			gulp
