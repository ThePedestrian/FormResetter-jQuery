/**
* jQuery Form Resetter Plugin 1.0.0
*
* Copyright (c) 2012 Uffaz Nathaniel
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function ($) {

    $.fn.formResetter = function (method) {

        var methods = {

            init: function (options) {
                this.formResetter.settings = $.extend({}, this.formResetter.defaults, options);

                var that = this;
                var settings = this.formResetter.settings;
                var dataKeyName = 'formResetter_defaultFieldValue_' + (new Date().getTime());
                var inputTypesToSkip = ['hidden', 'image', 'file', 'button', 'reset'];

                that.each(function () {
                    var $parent = $(this);
                    var $fields = $parent.find(settings.fieldSelector);

                    // Get the default value
                    $fields.each(function (index) {
                        var $that = $(this);
                        var typeOfInput = utility.typeOfInput($that).toLowerCase();
                        var defaultValue = '';

                        // Skip input types like hidden, image, and file
                        if ($.inArray(typeOfInput, inputTypesToSkip) != -1) return;

                        switch (typeOfInput) {
                            case 'radio':
                                defaultValue = $that.attr('checked');
                                break;
                            case 'checkbox':
                                defaultValue = $that.attr('checked');
                                break;
                            default:
                                defaultValue = $that.val();
                                break;
                        }

                        $that.data(dataKeyName, defaultValue);
                    });

                    // Click event
                    $parent.find(settings.submitSelector).click(function (event) {
                        // If the values should not be reset
                        $fields.each(function (index) {
                            var $that = $(this);
                            var defaultValue = $that.data(dataKeyName);
                            var typeOfInput = utility.typeOfInput($that).toLowerCase();

                            // Skip input types like hidden, image, and file
                            if ($.inArray(typeOfInput, inputTypesToSkip) != -1) return;

                            if (settings.clearValues) {
                                if (typeOfInput == 'radio' || typeOfInput == 'checkbox') {
                                    $that.attr('checked', '');
                                } else {
                                    $that.val('');
                                }

                                return;
                            }

                            switch (typeOfInput) {
                                case 'radio':
                                    $that.attr('checked', defaultValue);
                                    break;
                                case 'checkbox':
                                    $that.attr('checked', defaultValue);
                                    break;
                                default:
                                    $that.val(defaultValue);
                                    break;
                            }

                            return;
                        });

                        if (settings.preventDefaultBehavior) event.preventDefault();
                    });

                });

                return this;
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist in jQuery.formReset plugin!');
        }
    }

    var utility = {
        typeOfInput: function ($that) {
            return $that.attr('type');
        }
    }

    $.fn.formResetter.defaults = {
        fieldSelector:          '.form-reset-field',
        submitSelector:         '.form-reset-submit-button',
        clearValues:            false,
        preventDefaultBehavior: false
    }

})(jQuery);