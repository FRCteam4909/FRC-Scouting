var activeView = "";

$.get("http://127.0.0.1:1338/views", function (views) {
	$('.nav-sidebar').html("");
	
	views.forEach(function(view){
		$(".nav-sidebar").append(`<li data-view="` + view.view + `"><a href="#" onclick="loadData('` + view.view + `')">` + view.name + `</a></li>`);
	});
	
	loadData(views[0].view);
});

function loadData(view) {
	if(!view)
		view = activeView
	else
		activeView = view;
	
	$("li[data-view]").removeClass("active");
	$("li[data-view=" + view + "]").addClass("active");
	
	$.get("http://127.0.0.1:1338/data/" + view, function (views) {
		views.forEach(function (view) {
			var table = `<div class="table-responsive"><table class="table table-striped"><thead><tr>`;

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

			table += `</tbody></table></div>`

			$(".main").html(table);
			
			 $('table').DataTable({
				"order": []
			 });
		});
	});
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
