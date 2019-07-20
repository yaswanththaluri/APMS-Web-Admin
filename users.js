$(document).ready(function () {


    $("#closeUserCreation").click(function () {

        $("#newUserCreationDiv").hide("slow");

    });

    $("#addNewUser").click(function () {

        $("#newUserCreationDiv").show("slow");

    });

    $("#showDetails").click(function () {
        $("#userFullDetails").slideToggle("slow");
    })

});


