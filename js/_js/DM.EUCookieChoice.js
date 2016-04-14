var DM = DM || {};

(function( $, DM, Cookies ) {

    // checks for presence of `eucookie` consent cookie
    // if not found, then prompt user
    // if user accepts then store acceptance in cookie for one year

    'use strict';

    function _cookieName() {
        var name = "marketing.distinctive";
        var n = name + '.eucookie';
        return n;
    }

    var cookiename = _cookieName();

    function _showChooser() {
        if ( ! Cookies.get(cookiename) ) {
            _showBanner();
        }
    }

    function _setUp() {
        Cookies.set(cookiename, 'true', { expires: 365, path: '/' });
        $('#eucookielaw').remove();
    }

    function _bindEvents() {
        $('body').on( 'click', '#acceptcookies', _setUp );
    }

    function _hideAfterDelay() {
        setTimeout(function(){
            _setUp();
        }, 9000)
    }

    function _showBanner() {
        $('#eucookielaw').show();
    }

    function fInit() {
        _showChooser();
        _bindEvents();
        _hideAfterDelay();
    }

    DM.EUCookieChoice = {
        init : fInit
    };

    return DM;

})( jQuery, DM, Cookies );
