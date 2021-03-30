import validate from "jquery-validation";

$(function(){

    // Замена контента на странице валидации
    $('body').on('click', '.auth__call-btn', function(evt) {
        evt.preventDefault();
        $('.modal-page__bg--call').addClass('active');
        $('.footer-modal__right').fadeOut(0);
        $('.auth__block').fadeOut(0);
        $('.call').fadeIn(500);
    });

    $('body').on('click', '.call__return', function(evt) {
        evt.preventDefault();
        $('.modal-page__bg--call').removeClass('active');
        $('.modal-page__bg--login').removeClass('active');
        $('.call').fadeOut(0);
        $('.login__block-forgot').fadeOut(0);
        $('.login__block').fadeOut(0);
        $('.auth__block').fadeIn(500);
        $('.footer-modal__right').fadeIn(500);
        $('.header-modal__auth').fadeIn(500);
    });

    $('body').on('click', '.header-modal__auth-text', function(evt) {
        evt.preventDefault();
        $('.modal-page__bg--call').removeClass('active');
        $('.modal-page__bg--login').addClass('active');
        $('.footer-modal__right').fadeOut(0);
        $('.auth__block').fadeOut(0);
        $('.header-modal__auth').fadeOut(0);
        $('.call').fadeOut(0);
        $('.login__block-forgot').fadeOut(0);
        $('.login__block').fadeIn(500);
    });

    $('body').on('click', '.modal-page__forgot', function(evt) {
        evt.preventDefault();
        $('.login__block').fadeOut(0);
        $('.login__block-forgot').fadeIn(500);
    });

    // Валидация

    $('#auth-form').validate({
        rules: {
            login: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            login: 'Поле Логин обязательно для заполнения',
            password: 'Поле Пароль обязательно для заполнения'
        }
    })

});