$.ajaxSetup({
  async: false
});

var activeView = 0,
    loadedViews = [];

$.get("http://127.0.0.1:1338/views", function (ajaxViews) {
    loadedViews = ajaxViews;
    
	$('.nav-sidebar').html("");
	
	loadedViews.forEach(function(view, index){
		$(".nav-sidebar").append(`<li data-view="` + index + `"><a href="#" onclick="loadData('` + index + `')">` + view.name + `</a></li>`);
	});
	
    loadData(0);
});

function loadData(index) {
	if(!index)
		index = activeView
	else
		activeView = index;
	
	$("li[data-view]").removeClass("active");
	$("li[data-view=" + index + "]").addClass("active");
    
    $(".main").html("");
    
	loadedViews[index].views.forEach(function(rootView){
        $.get("http://127.0.0.1:1338/data/" + rootView.name, function (views) {
            views.forEach(function (view) {
                var table = `<h3>` + view.name + `</h3>`;
                table += `<div class="table-responsive"><table class="table table-striped" id="` + rootView.name + `"><thead><tr>`;

                view.headers.forEach(function (header) {
                    table += "<th>" + header.text + "</th>";
                });

                table += `</tr></thead><tbody>`;

                view.data.forEach(function (datum) {
                    table += `<tr>`;

                    view.headers.forEach(function (header) {
                        var val = getDescendantProp(datum, header.value);

                        table += "<td>" + renderTypes(val) + "</td>";
                    });

                    table += `</tr>`;
                });

                table += `</tbody></table></div><hr>`;

                $(".main").append(table);

                  var table = $('table#' + rootView.name).DataTable({
                    "paging": rootView.disablePaging ? !rootView.disablePaging : true,
                    "searching": rootView.disableSearching ? !rootView.disableSearching : true,
                    "info": rootView.disableInfo ? !rootView.disableInfo : true,
                     "search": {
                        "regex": true
                      },
                    "lengthMenu": rootView.lengthMenu ? rootView.lengthMenu : null,
                    "order": [],
                    "columnDefs": [
                        { "searchable": true, "targets": 0 }, // Team Number
                        { "searchable": true, /*"visible": false,*/ "targets": 1 }, // Event Key
                        { "searchable": false, "targets": "_all" },
                    ]
                 }),
                    cols = view.cols,
                    min = [], max = [];

                if(rootView.colorcode)
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
                            /*
                            console.log(rowIdx);
                            console.log(col);
                            console.log(cellVal);
                            console.log(min[colIndex]);
                            console.log(max[colIndex]);
                            console.log(scaledVal);
                            console.log("=====");
                            */

                            if(scaledVal > 0.5)
                                $(cell).css('background-color', 'rgba(76, 217, 100,' + (0.1 + (0.8 * scaledVal)) + ')');
                            else
                                $(cell).css('background-color', 'rgba(255, 59, 48,' + (0.4 - (scaledVal)) + ')');
                        });
                    });
            });
            
            searchColumn(0, $("#findTeamNumber").val());
            searchColumn(1, $("#findEvent").val());
        });
    });
}

$('#findTeamNumber').bind('input', function() {
    searchColumn(0, $(this).val());
});

$('#findEvent').bind('input', function() {
    searchColumn(1, $(this).val());
});

function searchColumn(col, value){
    if(value == "")
        $.fn.dataTable.tables( { api: true } )
            .columns(col)
                .search("")
                .draw();
    else
        $.fn.dataTable.tables( { api: true } )
            .columns(col)
                .search("^" + value + "$", true, false, true)
                .draw();
}

/* http://stackoverflow.com/a/8052100 */
function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while(arr.length && (obj = obj[arr.shift()]));
    return obj;
}

/* http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places */
function renderTypes(num) {
	const numCast = +(Math.round(num + "e+2")  + "e-2");
	
	if(!Number.isNaN(numCast))
		return numCast;
	else
		return num;
}

/* http://stackoverflow.com/a/31687097 */
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}