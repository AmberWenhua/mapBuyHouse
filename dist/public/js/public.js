!function (i) {
    function t(i) {
        var t = i.data("target-page"),
            a = i.data("target-doc"),
            n = a + "/" + t + ".html";
        location.pathname = n
    }
    i(function () {
        var t = location
                .pathname
                .split("/"),
            a = t.length - 1,
            n = t[a];
        if ("index.html" == n) {
            setTimeout(function () {
                i("#welcome").trigger("click")
            }, 3e3)
        }
    }),
    i(".click-return").click(function () {
        history.go(-1)
    }),
    i(".btnclick").click(function () {
        var a = i(this);
        t(a),
        "btn-login" == i(this).attr("id") && (sessionStorage.user = i("#username").val()),
        "exit-login" == i(this).attr("id") && sessionStorage.clear()
    }),
    i(".click-pop").click(function () {
        var t = i(this).data("target-id");
        i("#" + t).css("display", "block"),
        i("#btn-pop-time").css("display", "block"),
        i("#btn-pop-time")
            .siblings()
            .css("display", "none")
    }),
    i(".click-cancelpop").click(function () {
        var t = i(this).data("target-id");
        i("#" + t).css("display", "none")
    }),
    i(".click-surepop").click(function () {
        var t = i(this).data("target-id");
        i("#" + t).css("display", "block"),
        i("#" + t)
            .siblings()
            .css("display", "none")
    }),
    i(".click-select").click(function () {
        var t = i(this).data("target-id");
        i("#" + t).slideToggle(),
        i("#" + t + " li").click(function () {
            i("#" + t).slideUp();
            var a = i(this).text(),
                n = i("#" + t).data("target-id");
            i("#" + n).val(a)
        })
    })
}(jQuery),
window.onload = function () {
    var i = location
            .pathname
            .split("/"),
        t = i.length - 2,
        a = i[t];
    $("#" + a)
        .siblings()
        .removeClass("footer-nav-li"),
    $("#" + a).addClass("footer-nav-li"),
    void 0 !== sessionStorage.user
        ? ($(".no-login").css("display", "none"), $(".no-login").siblings().css("display", "block"), $(".mybox-inf2").text(sessionStorage.user), $("#welcome").data("target-page", "home"), $("#welcome").data("target-doc", "index"))
        : ($(".no-login").css("display", "block"), $(".no-login").siblings().css("display", "none"), $("#welcome").data("target-page", "login"), $("#welcome").data("target-doc", "login"))
};