# mesa.js

Experimental javascript library to load models from markup.

Currently has a dependency on jQuery and it comes bundled with a plugin (.mesa).
	
	$(selector).mesa(opts)

Given a table
	
	<table>
		<tbody>
			<tr>
				<td>A</td>
				<td>The First Letter</td> 
			</tr>
			<tr>
				<td>B</td>
				<td>The Second Letter</td>
			</tr>
		</tbody>
	</table>

mesa.Core.load({ fieldNames:['name', 'age'] }) will return 
	
	[
		{ name:'A', age:'The First Letter'},
		{ name:'B', age:'The Second Letter'}
	]

Given the markup
	
	<div id="models">
		<div>
			<span>A</span>
			<span>The First Letter</span> 
		</div>
		<div>
			<span>B</span>
			<span>The Second Letter</span>
		</divv>
	</div>

mesa.Core.load({ 
	root:'#models',
	row:'div',
	col:'span',
	fieldNames:['name', 'age'] })

will return 
	
	[
		{ name:'A', age:'The First Letter'},
		{ name:'B', age:'The Second Letter'}
	]

# Options

mesa.Core.load and the jQuery plugin take the following options:

- root: *jQuery selector* the element to load a list of models from. Default is 'table tbody'.
- rows: *jQuery selector* the element to load each model from. Default is 'tr'.
- col: *jQuery selector* the element to load each property of the model from. Default is 'td'.
- fieldNames: *Array* an array of string values to use as property names for the fields. If not provided then the model is loaded as an array like object.
- mapper: *mesa.FieldMapper object* an instance of a FieldMapper to be used when deserialising fields.  

# Running tests

Open specs/specrunner.html in a browser.
