describe("a page with a set of divs and spans, containing name and age values", function() {

    var ContextualAssertions = {

        expectObjectToHaveExpectedNumberOfProperties: function(selector, row, i) {
            
            var propertyCount = 0;
            for(var prop in row) {
                if(row.hasOwnProperty(prop)) {
                    propertyCount++;
                }
            }
            var expectedProperties = $('div:has(span):eq('+i+') span', selector).length;
            expect(propertyCount).to.be(expectedProperties);
        },

        all: function(times, callback) {

            for (var i = 0; i < times; i++) {
                callback(i);
            };
        }
    };
    
    var selector = '#data';
    var expectedRows = $('div:has(span)', selector).length;
    var options = { root : selector, row: 'div', col:'span', fieldNames:['name', 'age'] };
    
    describe("when loading", function() {

        var data = mesa.Core.load(options);
        
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
        
        var data = $(selector).mesa(options);
        
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