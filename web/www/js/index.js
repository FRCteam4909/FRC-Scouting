var views = [];

function loadData() {
	$.get("http://127.0.0.1:1338/data", function (views) {
		window.views = views;

		views.forEach(function (view) {
			var table = `<div class="table-responsive"><table class="table table-striped"><thead><tr>`;

			view.headers.forEach(function (header) {
				table += "<th>" + header + "</th>";
			});

			table += `</tr></thead><tbody>`;

			view.data.forEach(function (datum) {
				table += `<tr>`;

				view.headers.forEach(function (header) {
					table += "<td>" + datum[header] + "</td>";
				});

				table += `</tr>`;
			});

			table += `</tbody></table></div>`

			$(".main").append(table);
		});
	});
}


loadData();