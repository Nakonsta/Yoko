import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js"
import select2 from "select2";
import imask from "imask";

$(function() {
    // Выбор дат
    $(".date").flatpickr({
        "locale": Russian
    });

    $('.date').attr('readonly', false);

    // Селекты
    $(".select").select2();

    $("#main-page-select").select2({
        placeholder: "Статус",
    });

    // Сброс фильтра
    $('body').on('click', '[data-js="reset"]', function (evt) {
        evt.preventDefault();
        $(this).closest('.order-search__form').find('.select').val('').trigger('change');
        document.querySelector('.order-search__form').reset();
        $(this).removeClass('order-search__reset--active')
    });

    // Маска для телефона
    if ($('.tel').length) {
        var element = document.querySelector('.tel');
        var maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        var mask = IMask(element, maskOptions);
    }

    // Блок выбора количества
    if ($('.quantity-block').length) {
        $(function() {

            (function quantityProducts() {
                var $quantityArrowMinus = $(".quantity-arrow-minus");
                var $quantityArrowPlus = $(".quantity-arrow-plus");
            
                $quantityArrowMinus.click(quantityMinus);
                $quantityArrowPlus.click(quantityPlus);
            
                function quantityMinus() {
                    if(!($(this).closest('.quantity-block').find('.quantity-num').attr('disabled'))) {
                        var $quantityNum = $(this).closest('.quantity-block').find('.quantity-num');
                        if ($quantityNum.val() > 1) {
                            $quantityNum.val(+$quantityNum.val() - 1);
                        }
                    }
                }
            
                function quantityPlus() {
                    if(!($(this).closest('.quantity-block').find('.quantity-num').attr('disabled'))) {
                        var $quantityNum = $(this).closest('.quantity-block').find('.quantity-num');
                        $quantityNum.val(+$quantityNum.val() + 1);
                    }
                }
            })();
          
        });

        $('.quantity-num').focus(function() {
            $(this).closest('.quantity-block').addClass('quantity-block--byhands');
        })

        $('.quantity-num').blur(function() {
            $(this).closest('.quantity-block').removeClass('quantity-block--byhands');
        })
    }

    // Появление кнопки сбросить

    if($('[data-js="filter-form"]').length) {
        $(this).find('[data-js="filter-input"]').change(function() {
            if ($(this).val() != '') {
                $('.order-search__reset').addClass('order-search__reset--active')
            }
        })
        $(this).find('.select').change(function() {
            if ($(this).val() != 'disabled') {
                $('.order-search__reset').addClass('order-search__reset--active')
            }
        })
    }

    function checkFormIsEmpty() {

    }

    // Инпуты для загрузки файлов

    $('input[type="file"]').each(function() {
        var label = $(this).parents('.form-group').find('label').text();
        label = (label) ? label : '';
    
        $(this).wrap('<div class="input-file"></div>');
        $(this).before(`<span class="btn d-flex justify-center align-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <path d="M2.14347 20.416C3.57026 21.8576 5.4438 22.5783 7.31797 22.5781C9.19179 22.578 11.0661 21.8573 12.4926 20.416L21.4716 11.344C23.5096 9.28477 23.5094 5.9343 21.4714 3.87515C20.4843 2.87762 19.1716 2.32829 17.7754 2.32829C16.3792 2.32829 15.0666 2.87762 14.0793 3.87515L5.83946 12.2003C4.61666 13.4357 4.61666 15.446 5.83946 16.6816C7.0624 17.9171 9.05212 17.917 10.2749 16.6815L15.7007 11.1995C16.1089 10.787 16.1089 10.1182 15.7007 9.70573C15.2925 9.29322 14.6305 9.29322 14.2222 9.70573L8.79648 15.1877C8.3889 15.5997 7.72562 15.5996 7.3179 15.1878C6.91033 14.7759 6.91033 14.1058 7.3179 13.694L15.5577 5.36892C16.1501 4.77044 16.9377 4.44082 17.7754 4.44082C18.6132 4.44082 19.4006 4.77044 19.993 5.36892C21.2158 6.60447 21.2159 8.61475 19.9931 9.85029L11.0142 18.9222C8.97601 20.9813 5.65986 20.9813 3.62191 18.9222C2.63461 17.9247 2.09085 16.5985 2.09085 15.1878C2.09085 13.7771 2.63461 12.4508 3.62191 11.4533L12.6007 2.38125C13.0089 1.96874 13.0089 1.29991 12.6007 0.887478C12.1925 0.475043 11.5305 0.474972 11.1223 0.887478L2.14347 9.95951C0.761278 11.356 0 13.2128 0 15.1878C0 17.1628 0.761278 19.0196 2.14347 20.416Z" fill="white"/>
                </svg>
            </span>`);
        $(this).change(function(e){
            var val = $(this).val();
            var filename = val.replace(/^.*[\\\/]/, '');
            $(this).closest('.complaint__photos-block').find('.complaint__photos-block-text').text(filename);
            $(this).closest('.complaint__photos-block').find('.complaint__photos-block-text').addClass('complaint__photos-block-file')
        });
    });
    
    $('.input-file .btn').click(function() {
        $(this).siblings('input[type="file"]').trigger('click');
    });

    // Лейблы для селектов

    $('[data-js="select-placeholder"]').change(function () {
        const t = this;
        if (!(t.closest('.form__row').querySelector('.select-span'))) {
            const placeholder = t.getAttribute('data-placeholder');
            const span = document.createElement('span');
            span.classList.add('select-span');
            span.innerText = placeholder;
            t.closest('.form__row').prepend(span);    
        }
    })
});