$(document).ready(function() {
    $("input[type='text'], input[type='email'], input[type='password']").focus(function() {
        var label = $("label[for='"+$(this).attr('id')+"']");
        label.css("margin-top", "-8px");
    });
});
    