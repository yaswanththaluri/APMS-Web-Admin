$(document).ready(function () {

    var uid = document.getElementById("adminIdNumber");
    var password = document.getElementById("passwordLogIn");

    $("#logInButton").click(function () {
        $("#loader_parent").css("display", "flex");
        verifyAdmin(uid.value, password.value);

    });

});


function verifyAdmin(id, password) {

    firebase.database().ref("adminInfo").once("value").then(function (snapshot) {


        if(snapshot.val()["adminUID"] === id && snapshot.val()["adminPassword"] === password)
        {
            $("#loader_parent").css("display", "none");
            window.location.href = "dashboard.html";
        }
        else
        {
            $("#loader_parent").css("display", "none");
            alert("wrong credentials");
        }

    });

}