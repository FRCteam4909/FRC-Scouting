// Handlebars Helpers

// http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

// http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

// Make Form JSON Global
var form = {};

function configureForm(){
	window.plugins.simpleFile.external.read(config.receiveFolder + "form.json", function(data) {
		// Parse Form JSON
		form = JSON.parse(data);
		
		window.plugins.simpleFile.external.read(config.receiveFolder + "template.html", function(source) {
			
			// GENERATE TEMPLATE
			const template = Handlebars.compile(source),
				  res = template(form);
			
			// DISPLAY FORM
			$("#form").html(res);

			// Click Handler for Submit Button
			$(".submit-button").click(function(event){
				var match = {};

				for(key in form.match_record){
                    inputType = form.match_record[key].split(":")[0];
                    inputId = form.match_record[key].split(":")[1];
                    
                    switch(inputType){
                        case "number":
                        case "text":
                            match[key] = $(inputId).val();
                            break;
                        case "checkbox":
                            match[key] = Number($(inputId)[0].checked);
                            break;
                        case "incr":
                            match[key] = $(inputId).val();
                            break;
                    }
				}

				console.dir(match);

				// Send data to Hub
				dataTransfer.send(config, match);

				// Reset and repopulate form
				configureForm();
			});
			
		}, dataTransfer.handleError);
		
	}, dataTransfer.handleError);
}