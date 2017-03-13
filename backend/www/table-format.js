var table = $('#teamAverages').DataTable(),
	cols = [2,3,4,5,6,7,8,9,10],
	min = [], max = [];

cols.forEach((col, colIndex)=>{
	table.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
		var cell = table.cell({ row: rowIdx, column: col}).node(),
			cellVal = Number(cell.innerHTML);

		if(!Number.isNaN(cellVal)) {
			if(cellVal > max[colIndex] || (typeof max[colIndex] === 'undefined'))
				max[colIndex] = cellVal;
			if(cellVal <= min[colIndex] || (typeof min[colIndex] === 'undefined'))
				min[colIndex] = cellVal;
		}
	}).every( function ( rowIdx, tableLoop, rowLoop ) {
		var cell = table.cell({ row: rowIdx, column: col}).node(),
			cellVal = Number(cell.innerHTML);
			if(min[colIndex] !== max[colIndex])
				scaledVal = scaleBetween(cellVal, 0, 1, min[colIndex], max[colIndex]);
			else
				scaledVal = 0.6;

		console.log(rowIdx);
		console.log(col);
		console.log(cellVal);
		console.log(min[colIndex]);
		console.log(max[colIndex]);
		console.log(scaledVal);
		console.log("=====");

		if(scaledVal > 0.5)
			$(cell).css('background-color', 'rgba(76, 217, 100,' + (0.1 + (0.8 * scaledVal)) + ')');
		else
			$(cell).css('background-color', 'rgba(255, 59, 48,' + (0.4 - (scaledVal)) + ')');
	});
})