function floor() {
    var a = $(this).scrollTop();
    a >= 250 ? ($(".contain-top").addClass("upflow-contain-top"), $(".contain-nav-box").addClass("upflow-contain-nav"), $(".all-contain").addClass("upflow-all-contain"), $("#return-top").addClass("up-top"), $(".footer").addClass("upflow-footer")) : ($(".contain-top").removeClass("upflow-contain-top"), $(".contain-nav-box").removeClass("upflow-contain-nav"), $(".all-contain").removeClass("upflow-all-contain"), $("#return-top").removeClass("up-top"), $(".footer").removeClass("upflow-footer"))
}
var mySwiper = new Swiper(".swiper-container", {
    pagination: ".swiper-pagination",
    autoplay: 3e3,
    speed: 500
});
$(".text-search").click(function () {
    $(".search-show").css("display", "block"), $("input").val("")
}), $(".search-show-text").click(function () {
    $(".search-show").hide()
}), $("#home").scroll(floor), $("#return-top").click(function () {
    $(".page-box").animate({
        scrollTop: 0
    }, 100)
}), $(".contain-love").click(function () {
    $(this).hasClass("contain-love-active") ? $(this).removeClass("contain-love-active") : $(this).addClass("contain-love-active")
}), $(".contain-love2").click(function () {
    $(this).hasClass("contain-love2-active") ? $(this).removeClass("contain-love2-active") : $(this).addClass("contain-love2-active")
}), $(".contain-nav li").click(function () {
    $(this).siblings().removeClass("contain-nav-li");
    var a = $(this).attr("id");
    $("." + a).siblings().hide(0), $("." + a).toggle(), $(this).hasClass("contain-nav-li") ? $(this).removeClass("contain-nav-li") : $(this).addClass("contain-nav-li")
}), $(".contain-nav-select li").click(function () {
    if ($(this).parent().hasClass("contain-nav-li")) {
        $(this).parent().hide();
        var a = $(this).parent().data("target-id");
        $("#" + a).removeClass("contain-nav-li")
    }
}), $(function () {
    $(".more-click,.district-click").css("display", "none"), $("#minhan,#underground").css("display", "block")
}), $(".all-more li").click(function () {
    $(".contain-nav-select").hide(), $(".contain-nav li").removeClass("contain-nav-li")
}), $(".more-ul1 li").bind("click", function () {
    var a = $(this).data("target-id");
    $("#" + a).show(0), $("#" + a).siblings().hide(0)
});