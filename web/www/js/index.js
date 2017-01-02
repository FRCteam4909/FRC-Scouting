$.get("http://127.0.0.1:1338/views", function (views) {
	$('.nav-sidebar').html("");
	
	views.forEach(function(view){
		$(".nav-sidebar").append(`<li><a href="#" onclick="loadData('` + view.view + `')">` + view.name + `</a></li>`);
	});
});

function loadData(view) {
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

loadData("matches");