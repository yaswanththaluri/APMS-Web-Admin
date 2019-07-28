$(document).ready(function () {

    var uid = document.getElementById("adminIdNumber");
    var password = document.getElementById("passwordLogIn");

    $("#logInButton").click(function () {

        verifyAdmin(uid.value, password.value);

    });

});


function verifyAdmin(id, password) {

    firebase.database().ref("adminInfo").once("value").then(function (snapshot) {


        if(snapshot.val()["adminUID"] === id && snapshot.val()["adminPassword"] === password)
        {
            window.location.href = "dashboard.html";
        }
        else
        {
            alert("wrong credentials");
        }

    });

}