Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

var form = {};

function configureForm(){
	// READ FORM & TEMPLATE FILES
	const source = ``;
	form = ``;
	
	// GENERATE TEMPLATE
	const template = Handlebars.compile(source),
		  res = template(form);
	
	// DISPLAY FORM
	$("#form").html(res);
}

configureForm();