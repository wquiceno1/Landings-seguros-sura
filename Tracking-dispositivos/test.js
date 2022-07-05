/*## SCRIPT DAR FORMATO A PATENTE
se debe agregar el jquery.mask tambien
-------------------------------
*/



/*## SCRIPT TRACKING PATENTE
-------------------------------*/
$(document).ready(function () {
    $('.input-patente').mask('AAAA AA');
    $('.sura-loader').hide();
    $("#tracking-seguroxkm").click(function () {
        
        _Rut = $('#rut-search').val();
        _Dv = $('#dv-search').val();
        $('#patente-search').unmask();
        _Patente = $('#patente-search').val();
        
        console.log("esta es la patente: " + _Patente);
        // test = $('#patente-search').mask('AAAAAA');
        // console.log("esta es la patente: " + test.val());
        $('.sura-loader').show();
        $.ajax({
            url: 'https://seguros.sura.cl/ConsultaKudzu/ConsultaDispositivo',
            dataType: 'text',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                Rut: _Rut,
                Dv: _Dv,
                Patente: _Patente
            },
            success: function (data, textStatus, jQxhr) {
                var req = JSON.parse(data);
                if (req.URL.length > 2) {
                    location.replace(req.URL);
                } else {
                    $('.sura-loader').hide();
                    alert('Según nuestros registros no hay un dispositivo para la patente del vehículo ingresada');
                }
                // $('#response pre').html( data );
            },
            error: function (jqXhr, textStatus, errorThrown) {
                $('.sura-loader').hide();
            }
        });
    });
    $("#rut-search").on("keyup", function () {
        var cuerpoRut = $(this).val();
        var dv = dgv(cuerpoRut);
        $("#dv-search").val(dv);
    });
})

$(document).ready(function () {
    shareThis();
    dgv();
    isNumber();
    mayus();

})
/*## SHARETHIS RRSS
--------------------- */
function shareThis() {
    var twitter = $('.twitter');
    var facebook = $('.facebook');
    var whatsapp = $('.whatsapp');

    twitter.on('click', function () {
        window.open('https://twitter.com/share?url=https://www.segurossura.cl/autos/seguroxkm&amp;text=Seguros%20SURA%20&amp;hashtags=SeguroxKM');
    });
    facebook.on('click', function () {
        window.open("http://www.facebook.com/sharer.php?u=https://www.segurossura.cl/autos/seguroxkm")
    });
    whatsapp.on('click', function () {
        window.open('https://api.whatsapp.com/send?text=https://www.segurossura.cl/autos/seguroxkm');
    });
}

/*## DIGITO VERIFICADOR
--------------------- */
function dgv(T) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
    //alert(S ? S - 1 : 'k');
}
/*## IS NUMBER
--------------------- */
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        return false;
    } else {
        // CalculaDigitoVerificador()
    }
    return true;
}
/*## MAYUSCULAS
--------------------- */
function mayus(e) {
    e.value = e.value().toUpperCase();
}

//<!-- END SCRIPT TRACKING PATENTE-->
//<!-- SCRIPT LEAD COTIZADOR-->

(function () {
    var parentElement = document.getElementById('seguroxkm-lead0');
    if (!parentElement) return;
    var base = 'https://sura.seguroxkm.cl';

    function tag(name, attributes, childs) {
        attributes = attributes || {}
        childs = childs || []
        var el = document.createElement(name)
        for (i in attributes) {
            i == 'text' ? (el.textContent = attributes[i]) : el.setAttribute(i, attributes[i])
        }
        childs.map(function (child) {
            el.appendChild(child)
        })
        return el;
    }
    parentElement.appendChild(
        tag('div', {
            class: 'seguroxkm-lead0-container'
        }, [
            tag('form', {
                id: 'seguroxkm-lead0-form',
                autocomplete: 'off',
                method: 'post'
            }, [
                tag('fieldset', {}, [
                    tag('input', {
                        type: 'text',
                        id: 'seguroxkm-rut',
                        name: 'rut',
                        placeholder: 'RUT 11222333',
                        class: 'seguroxkm-input',
                        maxlength: 8,
                        tabindex: 1,
                        autocomplete: 'off',
                        style: 'max-width:231px;'
                    }),
                    //tag('input', {type: 'text', id: 'seguroxkm-rutMuestra', name: 'rut', placeholder:'', class: 'seguroxkm-input', maxlength: 8, tabindex: 1, autocomplete: 'off',style:'max-width:231px;display: none'}),
                    tag('input', {
                        type: 'text',
                        id: 'seguroxkm-dv',
                        name: 'dv',
                        placeholder: 'K',
                        class: 'seguroxkm-input',
                        maxlength: 1,
                        tabindex: 1,
                        autocomplete: 'off',
                        style: 'max-width: 50px; margin-left:15px',
                        readonly: "readonly"
                    }),
                    tag('input', {
                        type: 'tel',
                        id: 'seguroxkm-fono',
                        name: 'fono',
                        placeholder: 'Celular (9 dígitos)',
                        onkeypress: 'return isNumber(event)',
                        class: 'seguroxkm-input',
                        maxlength: 9,
                        tabindex: 2,
                        autocomplete: 'off'
                    }),
                    tag('input', {
                        type: 'email',
                        id: 'seguroxkm-mail',
                        name: 'mail',
                        placeholder: 'Email',
                        class: 'seguroxkm-input',
                        maxlength: 75,
                        tabindex: 3,
                        autocomplete: 'off'
                    }),
                    tag('button', {
                        type: 'button',
                        id: 'seguroxkm-submit',
                        class: 'btn-submit',
                        text: 'Cotizar',
                        tabindex: 4
                    }),
                    tag('span', {
                        class: 'error-container'
                    }, [
                        tag('span', {
                            class: 'error',
                            id: 'seguroxkm-missing-fields',
                            text: 'Dato inválido'
                        })
                    ])
                ])
            ]),
        ])
    )
    var form = document.getElementById('seguroxkm-lead0-form')
    var rut = document.getElementById('seguroxkm-rut')
    var dv = document.getElementById('seguroxkm-dv');
    var mail = document.getElementById('seguroxkm-mail')
    var fono = document.getElementById('seguroxkm-fono')
    var send = document.getElementById('seguroxkm-submit')
    var missing = document.getElementById('seguroxkm-missing-fields')

    rut.oninput = function (evt) {
        evt = evt || window.event;
        if (!/[0-9kK]/.test(evt.key)) {
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        }
    }
    fono.oninput = function (evt) {
        evt = evt || window.event;
        if (!/[0-9]/.test(evt.key)) {
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
        }
    }

    var mailRegexp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    function highlightError(element, message) {
        if (window.mostrarErrorLead) {
            window.mostrarErrorLead(message ||
                "Faltan campos por completar. Debes registrar tus datos para poder cotizar un seguro para tu auto"
            );
        } else {
            $('#seguroxkm-missing-fields').text(message);
            $('#seguroxkm-missing-fields').css({
                color: 'red',
                textAlign: 'center'
            });
            missing.classList.add('visible');
        }
        element.focus();
        element.classList.add('error');
    }

    function clearError(event) {
        if (window.limpiarErrorLead) {
            window.limpiarErrorLead();
        } else {
            missing.classList.remove('visible');
        }
        this.classList.remove('error');
    }
    rut.onkeyup = function () {
        dv.value = $.rut.dv(rut.value);
    }

    rut.addEventListener('input', clearError);
    mail.addEventListener('input', clearError);
    fono.addEventListener('input', clearError);
    send.addEventListener('click', function (event) {
        var rutTexto = rut.value;
        var rutLimpio;
        if (rutTexto.indexOf('-') != -1) {
            rutLimpio = rutTexto.slice(0, -2);
            //alert("la letra - encontrada"+rutLimpio);
        } else {
            rutLimpio = rutTexto;
        }
        //debugger;
        var r = rutLimpio + '-' + dv.value;
        //var r = rut.value + '-' + dv.value;
        rut.value = r;
        if (!rut.value || $.rut.validar(r)) {
            $('#seguroxkm-rut').val(rutLimpio);
            return highlightError(rut, 'Por favor completa o revisa el RUT ingresado');
        }
        if (!fono.value || fono.value.length != 9 || !/^[0-9]+$/.test(fono.value)) {
            $('#seguroxkm-rut').val(rutLimpio);
            return highlightError(fono, 'Por favor completa o revisa el teléfono');
        }
        if (!mail.value || !mailRegexp.test(mail.value)) {
            $('#seguroxkm-rut').val(rutLimpio);
            return highlightError(mail, 'Por favor completa o revisa el email ingresado');
        }
        //$('#seguroxkm-rut').css("display","none");
        //$('#seguroxkm-rutMuestra').show();
        form.method = 'POST';
        form.action = 'https://api01.jooycar.com/api/v1/sura/seguroxkm/lead0';
        form.target = '_top'
        form.submit()
    });
})();


/* KEYPRESS MAIL */
$("#seguroxkm-mail").keypress(function (event) {
    if (event.which == 13) {
        $("#seguroxkm-submit").trigger("click");
    }
});



! function (a) {
    function b(a, b) {
        a.closest(".rut-container").append(b)
    }
    a.fn.rut = function (c) {
        var d = a.extend({
            error_html: '<span class="rut-error">Rut incorrecto</span>',
            formatear: !0,
            on: "blur",
            required: !0,
            placeholder: !0,
            fn_error: function (a) {
                b(a, d.error_html)
            },
            fn_validado: function (a) {}
        }, c);
        return this.each(function () {
            var b = a(this);
            b.wrap('<div class="rut-container"></div>'), b.attr("pattern",
                    "[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}").attr("maxlength", 12), d
                .required && b.attr("required", "required"), d.placeholder && b.attr(
                    "placeholder", "12.345.678-5"), d.formatear && b.on("blur",
                    function () {
                        b.val(a.rut.formatear(b.val()))
                    }), b.on(d.on, function () {
                    a(".rut-error").remove(), a.rut.validar(b.val()) && "" != a.trim(b
                        .val()) ? d.fn_validado() : d.fn_error(b)
                })
        })
    }
}(jQuery), jQuery.rut = {
    validar: function (a) {
        if (!/[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9Kk]{1}/.test(a)) return !1;
        var b = a.split("-"),
            c = b[1],
            a = b[0].split(".").join("");
        return "K" == c && (c = "k"), $.rut.dv(a) == c
    },
    dv: function (a) {
        for (var b = 0, c = 1; a; a = Math.floor(a / 10)) c = (c + a % 10 * (9 - b++ % 6)) % 11;
        return c ? c - 1 : "k"
    },
    formatear: function (a) {
        for (var b = this.quitar_formato(a), a = b.substring(0, b.length - 1), c = ""; a
            .length > 3;) c = "." + a.substr(a.length - 3) + c, a = a.substring(0, a.length -
            3);
        return "" == $.trim(a) ? "" : a + c + "-" + b.charAt(b.length - 1)
    },
    quitar_formato: function (a) {
        return a = a.split("-").join("").split(".").join("")
    }
};


/*## SCRIPT BTN CLOSE COTIZADOR
--------------------------------*/

$(document).ready(function () {
    $('.slider-atributos').slick({
        fade: true
    });
    $('.slider-how').slick();
});
//new WOW().init();

$(".fixed-btn-top").click(function (e) {
    e.preventDefault();
    $(".leadZero").toggleClass("slide-up-lead");
    $(this).toggleClass("active")
    $(".btn-close-lead").show()
});

$(".btn-close-lead").click(function (e) {
    e.preventDefault();
    $(".leadZero").toggleClass("slide-up-lead");
    $(this).hide();
    $(".fixed-btn-top").toggleClass("active")
});

// END SCRIPT BTN CLOSE COTIZADOR

// SCRIPT AFFIX - LEAD COTIZADOR
/*## AFFIX LEAD 0 SEGUN VIEWPORT
---------------------------------*/
var onresize = function (e) {
    width = e.target.outerWidth;
    height = e.target.outerHeight;

    if (width > 768) {
        $('.leadZero').affix({
            offset: {
                top: 70,
                bottom: 750
            }
        });
    } else {
        $('.leadZero').affix({
            offset: {
                top: 70,
                bottom: 1600
            }
        });
    }
}
window.addEventListener("resize", onresize);

if (jQuery(window).width() > 768) {
    $('.leadZero').affix({
        offset: {
            top: 70,
            bottom: 750
        }
    });
} else {
    $('.leadZero').affix({
        offset: {
            top: 70,
            bottom: 1600
        }
    });
}
/* LEAD COTIZADOR */


/*## Toogle Siniestro
--------------------------------------*/
$('.toggle-content').click(function (e) {
    e.preventDefault();
    $(this).parents(".section-expand").toggleClass('expanded');
    $(this).toggleClass('aria-expanded');
});


/*## Init Slider no quitar*/
$('#cascade-slider').cascadeSlider({});


/*## HIDDEN LOST FOCUS MODAL VIDEO YOUTUBE*/
$("#videoModalOne").on('hidden.bs.modal', function (e) {
    $("#videoModalOne iframe").attr("src", $("#videoModalOne iframe").attr("src"));
});

/*## HIDDEN LOST FOCUS MODAL VIDEO YOUTUBE*/
$("#videoModalTwo").on('hidden.bs.modal', function (e) {
    $("#videoModalTwo iframe").attr("src", $("#videoModalTwo iframe").attr("src"));
});