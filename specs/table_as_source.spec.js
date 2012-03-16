var ContextualAssertions = {

    expectRowToHaveExpectedNumberOfColumns: function(selector, data, index) {
        
        var expectedColumns = $('tr:eq('+index+') td', selector).length;
        expect(data[index].length).to.be(expectedColumns);  
    },

    all: function(times, callback) {

        for (var i = 0; i < times; i++) {
            callback(i);
        };
    }
};

describe("loading a table containing headings and data rows", function() {
    
    var selector = 'table tbody';
    var expectedRows = $('tr:has(td)', selector).length;

    var data = mesa.Core.load({ root : selector, fieldNames: 'th' });
    
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

describe("loading a table containing data rows with jQuery", function(){
    
    var selector = 'table tbody';
    var expectedRows = $('tr:has(td)', selector).length;

    var data = $(selector).mesa();
    
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