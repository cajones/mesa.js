describe("loading a table containing data rows", function(){
	
	var selector = 'tbody';
	var expectedRows = $(selector).children().length;
	var expectedColumns = $('tr:first', selector).children().length;

	var data = jData.Core.load({});
	
	it("should provide an array containing each row", function() {

		expect(data.length).to.be(expectedRows);
	});

	it("should provide each column", function() {

		expect(data[0].length).to.be(expectedColumns);
	});
});