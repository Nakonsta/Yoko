$(function(){
    $('.header__catalog-nav-link').hover(function() {
        let dataAttr = $(this).closest('.header__catalog-nav-item').attr('data-cata');
        let selector = '.header__catalog-info[data-cata="' + dataAttr + '"]';
        $('.header__catalog-nav-item').removeClass('header__catalog-nav-item--active');
        $(this).closest('.header__catalog-nav-item').addClass('header__catalog-nav-item--active');
        $('.header__catalog-info').removeClass('header__catalog-info--active');
        $(selector).addClass('header__catalog-info--active');
    })

    $('[data-js="header__search-fake"]').on('click', function() {
        $('[data-js="header__search-fake"]').addClass('header__search-fake--hided');
        $('.header__search-mask').addClass('header__search-mask--active');
        var value = $('#header__search').val();
        $('#header__search-w').val(value);
        $('#header__search-w').focus();
        $('.header__search-close').removeClass('header__search-close--hided');
    })

    if ($('.header').length) {
        var element1 = document.querySelector('#header__search-w');
        var maskOptions1 = {
            mask: 'W000',
        };
        var element2 = document.querySelector('#header__search-h');
        var maskOptions2 = {
            mask: 'H00',
        };
        var element3 = document.querySelector('#header__search-r');
        var maskOptions3 = {
            mask: 'R00',
        };
        var element4 = document.querySelector('#header__search-q');
        var maskOptions4 = {
            mask: Number,
            max: 999,
        };
        var mask1 = IMask(element1, maskOptions1);
        var mask2 = IMask(element2, maskOptions2);
        var mask3 = IMask(element3, maskOptions3);
        var mask4 = IMask(element4, maskOptions4);
    }

    $('body').on('click', '.header__search-close', function(evt) {
        evt.preventDefault();
        $(this).addClass('header__search-close--hided');
        $('[data-js="header__search-fake"]').removeClass('header__search-fake--hided');
        $('.header__search-mask').removeClass('header__search-mask--active');
        $('#header__search').val('');
        $('#header__search-w').val('');
        $('#header__search-h').val('');
        $('#header__search-r').val('');
        $('#header__search-q').val('');
    })

    $('.header__catalog-svg').click(function (evt) {
        evt.preventDefault();
        if($(window).innerWidth() < 768) {
            $('.header__catalog-dropdown').slideDown(300);
            $('.header__catalog-svg').hide();
            $('.header__catalog-svg-close').show();
        }
    })

    $('.header__catalog-svg-close').click(function (evt) {
        evt.preventDefault();
        $('.header__catalog-dropdown').slideUp(300);
        $('.header__catalog-svg').show();
        $('.header__catalog-svg-close').hide();
    })
});