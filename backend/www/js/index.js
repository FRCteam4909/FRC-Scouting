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

                 $('table#' + rootView.name).DataTable({
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
