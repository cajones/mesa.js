# mesa.js

experimental javascript library to load models from markup

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

mesa.Core.load() will return 
	
	[
		['A', 'The First Letter'],
		['B', 'The Second Letter']
	]

Given the markup
	
	<div id="model">
		<div>
			<span>A</span>
			<span>The First Letter</span> 
		</div>
		<div>
			<span>B</span>
			<span>The Second Letter</span>
		</divv>
	</div>

mesa.Core.load({ table:'#model', row:'div', col:'span' }) will return 
	
	[
		['A', 'The First Letter'],
		['B', 'The Second Letter']
	]