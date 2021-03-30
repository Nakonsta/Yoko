$(function(){
    if ($('.checkout').length) {
        $('body').on('click', '.checkout__payment-way', function(evt) {
            evt.preventDefault();
            const selector = '.checkout__block[data-payment="' + $(this).attr('data-payment') + '"]';
            $('.checkout__payment-way').removeClass('checkout__payment-way--active');
            $(this).addClass('checkout__payment-way--active')
            $('.checkout__block').removeClass('checkout__block--active');
            $(selector).addClass('checkout__block--active');
        })

        var div_top = $('.checkout__right').offset().top;

        $(window).scroll(function() {
            if ($(window).innerWidth() > 1024) {
                var window_top = $(window).scrollTop() - 0;
                var div_bottom = $('.checkout__inner').innerHeight() - 70;
                if (window_top > div_top && window_top < div_bottom) {
                    if (!$('.checkout__right').is('.sticky')) {
                        $('.checkout__right').addClass('sticky');
                    }
                } else {
                    $('.checkout__right').removeClass('sticky');
                }
            }
        });
    }
})