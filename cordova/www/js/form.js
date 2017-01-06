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
	window.plugins.simpleFile.external.read(config.receiveFolderFolder + "form.json", function(data) {
		// Parse Form JSON
		form = JSON.parse(data);
		
		window.plugins.simpleFile.external.read(config.receiveFolderFolder + "template.html", function(source) {
			
			// GENERATE TEMPLATE
			const template = Handlebars.compile(source),
				  res = template(form);
			
			// DISPLAY FORM
			$("#form").html(res);
			
		}, dataTransfer.handleError);
		
	}, dataTransfer.handleError);
}