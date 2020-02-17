$(document).ready(function () {

    $("#icon1").click(function () {
        $("#loader_parent").css("display", "flex");
        window.location.href = "users.html";
    });

    $("#history").click(function () {
        window.location.href = "History.html";
    });

    $("#icon2").click(function () {
        $("#loader_parent").css("display", "flex");
        window.location.href = "layout_parking.html";
    });

});