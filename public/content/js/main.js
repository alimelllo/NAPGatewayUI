$(function () {
    $('.toggle-panel-users').click(function () {
        $('.users-panel').toggleClass('open');
    });
    $('.authentication-form_item').click(function () {
        $(this).find("input").focus();
    });
});