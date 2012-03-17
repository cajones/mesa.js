describe("a page with a table", function() {

    var ContextualAssertions = {

        expectObjectToHaveExpectedNumberOfProperties: function(selector, row, i) {
            
            var propertyCount = 0;
            for(var prop in row) {
                if(row.hasOwnProperty(prop)) {
                    propertyCount++;
                }
            }
            var expectedProperties = $('tr:has(td):eq('+i+') td', selector).length;
            expect(propertyCount).to.be(expectedProperties);
        },

        all: function(times, callback) {

            for (var i = 0; i < times; i++) {
                callback(i);
            };
        }
    };
    
    var selector = 'table tbody';
    var expectedRows = $('tr:has(td)', selector).length;

    describe("when loading", function() {

        var data = mesa.Core.load({ root : selector });
        
        it("should provide an array containing the same number of rows", function() {

            expect(data.length).to.be(expectedRows);
        });

        it("should provide each row with the same number of columns", function() {
            
            ContextualAssertions.all(expectedRows, function(i) {

                ContextualAssertions.expectObjectToHaveExpectedNumberOfProperties(selector, data[i], i);    
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

    describe("loading with jQuery", function(){
        
        var data = $(selector).mesa();
        
        it("should provide an array containing the same number of rows", function() {

            expect(data.length).to.be(expectedRows);
        });

        it("should provide each row with the same number of columns", function() {
                    
            ContextualAssertions.all(expectedRows, function(i) {

                ContextualAssertions.expectObjectToHaveExpectedNumberOfProperties(selector, data[i], i);
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
});
