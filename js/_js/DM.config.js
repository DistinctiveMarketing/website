var DM = DM || {};

(function( $, DM ) {

    // site configuration object

    'use strict';

    DM.config = {
        'formEndPoint' : '//formspree.io/{{ site.email }}', // formspree contact form config
        'formID' : 'contact-form'
    };

    return DM;

})( jQuery, DM );
