describe("loading a table containing data rows", function(){
	
	var selector = 'table tbody';
	var expectedRows = $(selector).children().length;

	var data = mesa.Core.load({ table : selector });
	
	it("should provide an array containing the same number of rows", function() {

		expect(data.length).to.be(expectedRows);
	});


	it("should provide each row array with the same number of columns", function() {
		
		function expectRowToHaveExpectedColumns(index) {
			
			var expectedColumns = $('tr:eq('+index+')', selector).children().length;
			expect(data[index].length).to.be(expectedColumns);	
		}
		
		for (var i = 0; i < expectedRows.length; i++) {
			expectRowToHaveExpectedColumns(i);
		};
	});
});