describe("loading a table containing data rows", function(){
    
    var selector = 'table tbody';
    var expectedRows = $(selector).children().length;

    var data = mesa.Core.load({ root : selector, fieldNames: ['name','age'] });
    
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

    it("should provide an name field", function() {
        
        for (var i = 0; i < expectedRows.length; i++) {
            expect(data[i]).to.have.property('name');
        };
    });

    it("should provide an age field", function() {
        
        for (var i = 0; i < expectedRows.length; i++) {
            expect(data[i]).to.have.property('age');
        };
    });
});

describe("loading a table containing data rows with jQuery", function(){
    
    var selector = 'table tbody';
    var expectedRows = $(selector).children().length;

    var data = $(selector).mesa();
    
    it("should provide an array containing the same number of rows", function() {

        expect(data.length).to.be(expectedRows);
    });


    it("should provide each row with the same number of fields", function() {
        
        function expectRowToHaveExpectedColumns(index) {
            
            var expectedColumns = $('tr:eq('+index+')', selector).children().length;
            expect(data[index].length).to.be(expectedColumns);  
        }
        
        for (var i = 0; i < expectedRows.length; i++) {
            expectRowToHaveExpectedColumns(i);
        };
    });

    it("should provide an name field", function() {
        
        for (var i = 0; i < expectedRows.length; i++) {
            expect(data[i]).to.have.property('name');
        };
    });

    it("should provide an age field", function() {
        
        for (var i = 0; i < expectedRows.length; i++) {
            expect(data[i]).to.have.property('age');
        };
    });
});

