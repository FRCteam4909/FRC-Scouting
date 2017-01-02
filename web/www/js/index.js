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
					table += "<td>" + getDescendantProp(datum, header.value) + "</td>";
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

setInterval(function(){
	loadData();
}, 1000);