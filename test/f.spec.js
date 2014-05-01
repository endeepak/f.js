describe("f", function() {
	var Person = function(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.fullName = function() { return firstName + ' ' + lastName; };
	}

	var Movie = function(name, rating) {
		this.name = name;
		this.rating = rating;
	}
	Movie.prototype.isGood = function() { return this.rating >= 7.5; }

	var books = [{title: 'JS is Fun', price: 20}, {title: 'JS for dummies', price: 10}];
	var bookTitles = ["JS is Fun", "JS for dummies"];

	var people = [new Person('John', 'Doe'), new Person('Ram', 'Singh')];
	var fullNames =["John Doe", "Ram Singh"];

	var movies = [new Movie('X-Men', 8), new Movie('Z-Men', 6), new Movie('BatMan', 9)];
	var moviesSortedByrating = [new Movie('Z-Men', 6), new Movie('X-Men', 8), new Movie('BatMan', 9)];
	var goodMovies = [new Movie('X-Men', 8), new Movie('BatMan', 9)];
	var badMovies = [new Movie('Z-Men', 6)];

	var shows = [{name: 'Simpsons', watched: true}, {name: 'Mad Cows', watched: false}, {name: 'South Park', watched: true}];
	var watchedShows = [{name: 'Simpsons', watched: true}, {name: 'South Park', watched: true}];
	var unWatchedShows = [{name: 'Mad Cows', watched: false}];

	describe("f", function() {
		it("should return no op when called without args", function() {
			var nativeNoop = function(){};
			var fNoop = f();
			
			expect(fNoop()).toEqual(nativeNoop());
		});

		it("should return identity function when called with arg", function() {
			var get5 = f(5);
			var getFoo = f('foo');

			expect(get5()).toEqual(5);
			expect(getFoo()).toEqual('foo');
		});
	});

	describe("x", function() {
		it("should return property function", function() {
			expect(books.map(f.x('title'))).toEqual(bookTitles);
			expect(shows.filter(f.x('watched'))).toEqual(watchedShows);
		});

		it("should return negated property function when ! is present at begining", function() {
			expect(shows.filter(f.x('!watched'))).toEqual(unWatchedShows);
		});

		it("should return method function", function() {
			expect(people.map(f.x('fullName()'))).toEqual(fullNames);
			expect(movies.filter(f.x('isGood()'))).toEqual(goodMovies);
		});

		it("should return negated method function when ! is present at begining", function() {
			expect(movies.filter(f.x('!isGood()'))).toEqual(badMovies);
		});
	});

	describe("n", function() {
		it("should create new function with return statement", function() {
			expect(books.map(f.n('book', 'book.title'))).toEqual(bookTitles);
			expect(shows.filter(f.n('movie', 'movie.watched'))).toEqual(watchedShows);
			expect(shows.filter(f.n('movie', '!movie.watched'))).toEqual(unWatchedShows);	
			expect(people.map(f.n('person', 'person.fullName()'))).toEqual(fullNames);
			expect(movies.filter(f.n('movie', 'movie.isGood()'))).toEqual(goodMovies);
			expect(movies.filter(f.n('movie', '!movie.isGood()'))).toEqual(badMovies);
			expect(movies.sort(f.n('m1', 'm2', 'm1.rating - m2.rating'))).toEqual(moviesSortedByrating);
		});
	});

	describe("y", function() {
		it("should create new function parsing lambda syntax", function() {
			expect(books.map(f.y('book => book.title'))).toEqual(bookTitles);
			expect(shows.filter(f.y('(movie) => movie.watched'))).toEqual(watchedShows);
			expect(shows.filter(f.y('(movie) => !movie.watched'))).toEqual(unWatchedShows);	
			expect(people.map(f.y('person  => person.fullName()'))).toEqual(fullNames);
			expect(movies.filter(f.y('(movie) => movie.isGood()'))).toEqual(goodMovies);
			expect(movies.filter(f.y('(movie) => !movie.isGood()'))).toEqual(badMovies);
			expect(movies.sort(f.y('(m1, m2) => m1.rating - m2.rating'))).toEqual(moviesSortedByrating);
		});

		it("should throw error for wrong lambda syntax", function() {
			expect(function() { f.y('(book => book.title')})
				.toThrow(new Error('Error in lambda syntax : (book => book.title'));
			expect(function() { f.y('book) => book.title')})
				.toThrow(new Error('Error in lambda syntax : book) => book.title'));
			expect(function() { f.y('m1, m2 => m1.rating - m2.rating')})
				.toThrow(new Error('Error in lambda syntax : m1, m2 => m1.rating - m2.rating'));
		});
	});
});