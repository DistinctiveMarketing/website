---
exclude: 'yes'
sitemap:
  exclude: 'yes'
---

{% include_relative _js/vendor/modernizr.js %}

;

{% include_relative _js/vendor/fontfaceobserver.js %}

;

{% include_relative _js/global.js %}

;

{% include_relative _js/DM.config.js %}

;

{% include_relative _js/vendor/transition.js %}

;

{% include_relative _js/vendor/modal.js %}

;

{% include_relative _js/vendor/js.cookie.js %}

;

{% include_relative _js/DM.contactForm.js %}

;

{%include_relative _js/DM.validation.js %}

;

{%include_relative _js/DM.SVGHandler.js %}

;

{% include_relative _js/DM.EUCookieChoice.js %}

;

(function($) {

    'use strict';

    $(document).ready(function() {
		DM.contactForm.init();
		DM.validation.init();
		DM.SVGHandler.init();
        DM.EUCookieChoice.init();
    });

})(jQuery);
