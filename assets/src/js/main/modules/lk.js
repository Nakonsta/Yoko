import validate from "jquery-validation";

$(function(){

    jQuery.extend(jQuery.validator.messages, {
        required: "Поле обязательно для заполнения",
    });

    if ($('.lk').length) {
        $('body').on('click', '.lk__tabs-item', function(evt) {
            evt.preventDefault();
            const selector = '.lk__section[data-lk="' + $(this).attr('data-lk') + '"]';
            $('.lk__tabs-item').removeClass('lk__tabs-item--active');
            $(this).addClass('lk__tabs-item--active')
            $('.lk__section').removeClass('lk__section--active');
            $(selector).addClass('lk__section--active');
        })
    }

    // Валидация формы создания рекламации

    if ($('#complaint-form').length) {
        $('#complaint-form').validate({
            rules: {
                company: {
                    required: true
                },
                inn: {
                    required: true
                },
                person: {
                    required: true
                },
                mail: {
                    required: true
                },
                phone: {
                    required: true
                },
                upd: {
                    required: true
                },
                tireTread: {
                    required: true
                },
            },
        })
    
        $('#complaint-form #company').valid();
        $('#complaint-form #inn').valid();
        $('#complaint-form #person').valid();
        $('#complaint-form #mail').valid();
        $('#complaint-form #phone').valid();
    
    }


    // Переключение видов дефектов в создании рекламации

    $('[data-js="complaint-defect"]').click((evt) => {
        evt.preventDefault();
        $('[data-js="complaint-defect"]').removeClass('complaint__defect--active');
        $(this).addClass('complaint__defect--active');
    })
})