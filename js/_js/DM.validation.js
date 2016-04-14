var DM = DM || {};

(function($, DM) {

	// validates email address field

	'use strict';
	
	var defaults = {
		formID : 'contact-form'
	};
	
	var opts = $.extend( {}, defaults, DM.config );

	var $contactForm = $('#' + opts.formID);
	
	if ( $contactForm.length < 1 ) {
		return;
	}
	
	var $emailField = 'input[type=email]';
		
	var validations = {
		email: [
			/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 
			'Please enter a valid email address'
		]
	};
			
	function _validateEmail() {
		var validation = new RegExp( validations['email'][0] );
		if ( ! validation.test( this.value ) ) {
			this.setCustomValidity( validations['email'][1] );
			$contactForm.find('.alert').hide();
			$contactForm.append('<div class="alert alert--error">' + validations['email'][1] + '</div>');
			DM.contactForm.disable();
			return false;
		} else {
			this.setCustomValidity('');
			$contactForm.find('.alert').hide();
			DM.contactForm.enable();
		}
	}
	
    function _bindEvents() {
		$contactForm.on( 'change', $emailField, _validateEmail );
	}
	
	function fInit() {
		_bindEvents();
	}

	DM.validation = {
		init : fInit
	};

	return DM;

})(jQuery, DM);
