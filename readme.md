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

Mesa.Core.load() will return 
	
	[
		['A', 'The First Letter'],
		['B', 'The Second Letter']
	]