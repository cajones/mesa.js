var ContextualAssertions = {

	expectRowToHaveExpectedNumberOfColumns: function(selector, data, index) {
		
		var expectedColumns = $(':eq('+index+')', selector).children().length;
		expect(data[index].length).to.be(expectedColumns);	
	},

	all: function(times, callback) {
		for (var i = 0; i < times; i++) {
			callback(i);
		};
	}
};

describe("loading from a markup (set of divs and spans) containing data rows", function(){

	var selector = '#data';
	var expectedRows = $(selector).children().length;

	var data = mesa.Core.load({ 
								 root : selector,
								 row : 'div',
								 col : 'span'
								});

	it("should provide an array containing the same number of rows", function() {

		expect(data.length).to.be(expectedRows);
	});


	it("should provide each row with the same number of columns", function() {
				
		ContextualAssertions.all(expectedRows, function(i) {
			ContextualAssertions.expectRowToHaveExpectedNumberOfColumns(selector, data, i);
		});
	});

	it("should provide a name field", function() {
        
        ContextualAssertions.all(expectedRows, function(i) {
        	expect(data[i]).to.have.property('name');
        });
    });

    it("should provide an age field", function() {
        
        ContextualAssertions.all(expectedRows, function(i) {
            expect(data[i]).to.have.property('age');
        });
    });
});

describe("loading from a markup (set of divs and spans) containing data rows with jQuery", function(){

	var selector = '#data';
	var expectedRows = $(selector).children().length;

	var data = $(selector).mesa({
								 row : 'div',
								 col : 'span'
								});

	it("should provide an array containing the same number of rows", function() {

		expect(data.length).to.be(expectedRows);
	});


	it("should provide each row with the same number of columns", function() {
		
		ContextualAssertions.all(expectedRows, function(i) {
			expectRowToHaveExpectedNumberOfColumns(i);
		});
	});

	it("should provide a name field", function() {
        
        ContextualAssertions.all(expectedRows, function(i) {
            expect(data[i]).to.have.property('name');
        });
    });

    it("should provide an age field", function() {
        
        ContextualAssertions.all(expectedRows, function(i) {
            expect(data[i]).to.have.property('age');
        });
    });
});