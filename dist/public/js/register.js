function checkloginform() {
    var e = $("#username").val(),
        a = $("#password").val(),
        t = $("#form-login").data("target-id");
    "" != e && "" != a
        ? $("#" + t)
            .removeAttr("disabled")
            .addClass("btn-orange")
        : $("#" + t)
            .attr("disabled", "")
            .removeClass("btn-orange")
}
function checkregisterform() {
    var e = $("#usernameregister").val(),
        a = $("#ipt-getcode").val(),
        t = $("#write-password").val(),
        r = $("#sure-password").val(),
        s = $("#ipt-data2").val(),
        i = $("#form-register").data("target-id");
    "" != e && "" != a && "" != t && "" != r && "" != s
        ? $("#" + i)
            .removeAttr("disabled")
            .addClass("btn-orange")
        : $("#" + i)
            .attr("disabled", "")
            .removeClass("btn-orange")
}
$(".get-code")
    .click(function () {
        function e() {
            if (s >= r) 
                i.removeAttr("disabled"),
                i.text(a),
                clearInterval(l);
            else {
                var e = r - s,
                    d = t.replace("{d}", e + "");
                i.text(d)
            }
            s++
        }
        var a = $(this).text();
        $(this).data("data-cachelabel", a),
        $(this).attr("disabled", "disabled");
        var t = $(this).data("loading"),
            r = $(this).data("time") - 0,
            s = 0,
            i = $(this);
        e();
        var l = setInterval(e, 1e3)
    }),
$("#username").keyup(function (e) {
    var a = $(this).val();
    a = a.replace(/[^\d]/g, ""),
    $(this).val(a),
    a.length > 10 && $(this).val(a.substring(0, 10))
}),
$("#form-login input").keyup(checkloginform),
$("#form-register input").keyup(checkregisterform);