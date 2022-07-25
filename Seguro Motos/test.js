< script type = "text/javascript" >
    (function ($) {
        $(function () {
            var container = document.getElementById("defaultForm");
            if (container === null)
                return;
            var inputs = container.querySelectorAll("input, textarea, select");
            var allInputs = document.forms["aspnetForm"].querySelectorAll('input, textarea', 'select');
            var widgetValidators = [];
            for (var i = 0; i < allInputs.length; i++) {
                if ($(allInputs[i]).data('widget-validator')) {
                    widgetValidators.push($(allInputs[i]).data('widget-validator'));
                }
                allInputs[i].addEventListener("invalid", function (event) {
                    if (Array.indexOf(inputs, document.activeElement) >= 0 && Array.indexOf(inputs, event.target) < 0)
                        event.preventDefault();
                }, true);
            }
            var submitClick = function (sender) {
                var isValid = true;
                for (var i = 0; i < inputs.length; i++) {
                    if (typeof inputs[i].willValidate !== "undefined" && inputs[i].willValidate)
                        isValid = inputs[i].validity.valid && isValid;
                    if (isValid && typeof ($(inputs[i]).data('sfvalidator')) === 'function')
                        isValid = $(inputs[i]).data('sfvalidator')();
                    if (typeof $ !== "undefined" && typeof $.validator !== "undefined")
                        isValid = $(inputs[i]).valid() && isValid;
                }
                if (isValid) {
                    sender.preventDefault();

                    var deferreds = [];
                    for (var i = 0; i < widgetValidators.length; i++) {
                        deferreds.push(widgetValidators[i]());
                    }

                    $.when.apply($, deferreds).done(function () {
                        for (var i = 0; i < widgetValidators.length; i++) {
                            if (!arguments[i]) {
                                return false;
                            }
                        }

                        var form = document.createElement("form");
                        form.style.display = "none";
                        form.setAttribute("action", "/acceso/administrador/recuperar-clave");
                        form.setAttribute("method", "POST");
                        if (container.getAttribute("enctype"))
                            form.setAttribute("enctype", container.getAttribute("enctype"));
                        else
                            form.setAttribute("enctype", document.forms["aspnetForm"].getAttribute("enctype"));
                        form.setAttribute("encoding", document.forms["aspnetForm"].getAttribute("encoding"));

                        form.appendChild(container);

                        sender = sender.target || sender.srcElement;
                        if (sender) {
                            var submitHiddenInput = document.createElement("input");
                            submitHiddenInput.setAttribute("type", "hidden");
                            submitHiddenInput.setAttribute("name", sender.name);
                            submitHiddenInput.setAttribute("value", sender.value || "Submit");
                            form.appendChild(submitHiddenInput);
                        }

                        document.body.appendChild(form);
                        // We prevent kendo upload widget from submitting empty inputs.
                        var kInputs = container.querySelectorAll(".k-upload input[type='file']");
                        for (var i = 0; i < kInputs.length; i++) {
                            var kInput = kInputs[i];
                            if (!kInput.value) {
                                // Prevent submitting an empty input
                                kInput.setAttribute("disabled", "disabled");
                                window.setTimeout(function () {
                                    kInput.removeAttribute("disabled");
                                }, 0);
                            }
                        }

                        if (typeof MarketoSubmitScript !== 'undefined') {
                            MarketoSubmitScript._populateFormId($('input[data-sf-role="form-id"]').val());
                            var newSubmitButtons = $(form).find(MarketoSubmitScript._settings.externalFormSubmitButtonsQuery);
                            if (newSubmitButtons.length > 0)
                                MarketoSubmitScript._formFields = MarketoSubmitScript._getExternalFormFields(newSubmitButtons[0]);
                            if (MarketoSubmitScript._formFields && MarketoSubmitScript._formFields.length === 0)
                                MarketoSubmitScript._populateFieldsFromLabels(form);
                            MarketoSubmitScript._formSubmitHandler(form.parentElement);
                        }

                        form.submit();
                        return false;
                    });
                }
            };
            var handleFormSubmitElements = function (elementName) {
                var allSubmitElements = container.getElementsByTagName(elementName);
                var elementCount = allSubmitElements.length;
                while (elementCount) {
                    typeAttr = allSubmitElements[elementCount - 1].getAttribute("type");
                    if (typeAttr == "submit") {
                        var currentClick = allSubmitElements[elementCount - 1].onclick;
                        if (currentClick)
                            allSubmitElements[elementCount - 1].onclick = function () {
                                if (currentClick()) return submitClick();
                                else return false;
                            };
                        else
                            allSubmitElements[elementCount - 1].onclick = submitClick;
                    }
                    elementCount--;
                }
            };
            handleFormSubmitElements("input");
            handleFormSubmitElements("textarea");
            handleFormSubmitElements("select");
            handleFormSubmitElements("button");
        })
    })(jQuery); 
</script>