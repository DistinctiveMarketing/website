(function($, d) {

	'use strict';

	// handles font loading classes, depends vendor/fontfaceobserver.js (https://github.com/bramstein/fontfaceobserver)
    //
	if ( 'function' !== typeof FontFaceObserver ) {
		return false;
	}

	var observed = ['Abel', 'dm'];

	var watchedFonts = {};

	$.each( observed, function( index, value ) {
		watchedFonts[index] = new FontFaceObserver( observed[index] );
		if ( 'dm' === observed[index] ) {
			watchedFonts[index].check(' ').then( function () {
				d.documentElement.className += " " + value + "-font-loaded";
			});
		} else {
			watchedFonts[index].check().then( function () {
				d.documentElement.className += " " + value + "-font-loaded";
			});
		}
	});

    // substitutes label for placeholder if browser supports it & hides the label - to match design
    //
	if ( 'object' === typeof window.Modernizr && true === Modernizr.placeholder ) {
        $("label").each( function() {
            var $label = $(this);
            var placeholder = $label.text();
            $label.addClass('sr-only');
            $label.closest(".field").find("input, textarea").not(':input[type=submit]').attr("placeholder", placeholder).val("").focus().blur();
        });
    }

})(jQuery, document);

