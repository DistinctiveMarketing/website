var DM = DM || {};

(function($, DM, d, Cookies) {

	// handles ajax form submission to Formspree endpoint
	// sets session cookie on success

	'use strict';

	if ( 'function' !== typeof Cookies ) {
		return;
	}

	var defaults = {
		formID : 'contact-form'
	};

	var opts = $.extend( {}, defaults, DM.config );

	var $contactForm = $('#' + opts.formID);

	if ( $contactForm.length < 1 ) {
		return;
	}

	var $btnSubmit = $contactForm.find('input[type=submit]');

	var $containerModal = $contactForm.closest('.modal');

	var messages = [
		'Sending message…',
		'Message sent!',
		'Oops, there was an error.',
		'You may only submit this contact form once per visit.'
	];

	function _isAlreadySent() {
		if ( "true" === Cookies.get('contacted') ) {
			return true;
		} else {
			return false;
		}
	}

	function _processForm(el,event) {
	    event.preventDefault();

		if ( true === _isAlreadySent() ) {
			return;
		}

		var $el = $(el);

		$.ajax({
			url: opts.formEndPoint,
			method: 'post',
			data: $el.serialize(),
			dataType: 'json',
			beforeSend: function() {
				$contactForm.append('<div class="alert alert--loading">' + messages[0] + '</div>');
			}
		})
		.done(function(data) {
			$contactForm.find('.alert').hide();
			$contactForm.append('<div class="alert alert--success">' + messages[1] + '</div>');
			Cookies.set('contacted', 'true', { path: '' });
			setTimeout( function() {
				_cleanUp();
				_disable();
			}, 2500);
		})
		.fail(function(err) {
			$contactForm.find('.alert').hide();
			$contactForm.append('<div class="alert alert--error">' + messages[2] + '</div>');
		});
	}

	function _disable() {
		$btnSubmit.prop('disabled', true);
	}

	function _enable() {
		$btnSubmit.prop('disabled', false);
	}

	function _cleanUp() {
		d.getElementById(opts.formID).reset();
		//$contactForm.find('.alert').remove();
		$containerModal.modal('hide');
	}

	function _sendOnceOnly() {
        if ( true === _isAlreadySent() ) {
            $contactForm.find('.alert').hide();
            $contactForm.append('<div class="alert alert--error">' + messages[3] + '</div>');
            _disable();
        }
    }

	function _bindEvents() {
		$(document).ready( _sendOnceOnly );
		$contactForm.on( 'submit', function(event) {
			_processForm( this, event );
		});
	}

	function fInit() {
		if ( $contactForm.length < 1 ) {
			return;
		}
		_bindEvents();
	}

	DM.contactForm = {
		init : fInit,
		enable : _enable,
		disable : _disable,
		isAlreadySent : _isAlreadySent
	};

	return DM;

})(jQuery, DM, document, Cookies);
