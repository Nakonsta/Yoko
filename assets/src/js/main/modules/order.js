$(function(){
    $('body').on('click', '.order__action-hide', function(){
        $(this).closest('.content-entry').removeClass('open');
        $(this).closest('.accordion-content').slideUp(300);
    })
})