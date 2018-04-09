function changtextHandler(t) {
    t
        .parents(".order-main")
        .data("target-page", "order__finish");
    var a = $("#click-changetext").data("target-text");
    $("#click-changetext")
        .addClass("order-text4")
        .removeClass("btn-order")
        .text(a)
}
$(".information-nav li")
    .click(function () {
        $(this)
            .siblings()
            .removeClass("active"),
        $(this).addClass("active");
        var t = $(this).data("target-id");
        $(".click-all").hide(),
        $("#" + t).show()
    }),
$(".btn-order").click(function (t) {
    t.stopPropagation(),
    sessionStorage.change = "haschange";
    var a = $(this);
    changtextHandler(a)
}),
$(".click-changetext").click(function () {
    sessionStorage.change = "haschange"
}),
$(function () {
    if (void 0 !== sessionStorage.change) {
        var t = $(".btn-order");
        changtextHandler(t)
    }
}),
$(".chkchoose").click(function () {
    this.checked
        ? $(".choose").slideDown()
        : $(".choose").slideUp()
}),
$(".ischeck-bg").click(function () {
    $(this).hasClass("house-attr-active")
        ? $(this).removeClass("house-attr-active")
        : $(this).addClass("house-attr-active")
}),
$(".isonlycheck-bg").click(function () {
    $(this)
        .siblings()
        .removeClass("house-attr-active"),
    $(this).addClass("house-attr-active")
}),
$(".click-file").click(function () {
    var t = $(this).data("target-id");
    $("#" + t).trigger("click")
});