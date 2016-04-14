var DM = DM || {};

(function( $, DM ) {

    // if Modernizr can't find SVG support, then swap each SVG source with `data-fallback` source

    'use strict';

    function _swapImgSource() {
        $("img[src$='.svg']").each( function() {
            if ( false === $(this).is('[data-fallback]') ) {
                return;
            } else {
                var fallback = $(this).data("fallback");
                $(this).attr( "src", fallback );
            }
        });
    }

    function fInit() {
        if ( ! window.Modernizr ) {
            return;
        }
        if ( ! Modernizr.svg ) {
            _swapImgSource();
        }
    }

    DM.SVGHandler = {
        init : fInit
    };

	return DM;

})( jQuery, DM );
