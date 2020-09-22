$(document).on('mouseenter', '.advantages__item', function(){
    $(this).addClass('opened').siblings('.advantages__item').removeClass('opened');
});