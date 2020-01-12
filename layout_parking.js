$(document).ready(function () {

    checkSlotAvailibility();


    var closeDetails = document.getElementById("close_slot_details");

    closeDetails.addEventListener("click", function () {
        $("#slotDetails").toggle();
        document.getElementById("user_slot_name").innerText = "";
        document.getElementById("user_id_slot").innerText = "";
        document.getElementById("user_slot_email").innerText = "";
    });

});


function checkSlotAvailibility() {

    var len = document.getElementsByClassName("isFilled").length;
    var slotFilled = document.getElementsByClassName("isFilled");
    var cards = document.getElementsByClassName("card");

    for(var i=0; i<len; i++)
    {
        firebase.database().ref("slotsInfo/slot"+(i+1)).once("value").then(function (snapshot) {

            if(snapshot.val()["isFilled"] === "yes")
            {
                slotFilled[(snapshot.val()["slotNumber"])-1].innerText = "Filled";
                cards[(snapshot.val()["slotNumber"])-1].style.borderColor = "red";
            }
            else if(snapshot.val()["isFilled"] === "no")
            {
                slotFilled[(snapshot.val()["slotNumber"])-1].innerText = "Not Filled";
                cards[(snapshot.val()["slotNumber"])-1].style.borderColor = "green";
            }

        });
    }

    $(".card-link").bind("click", function(){
        var divs = $(".card-link");
        $("#slotDetails").toggle();
        var curIdx = divs.index($(this));
        getDetailsOfParticularSlot(curIdx);
    });

}


function getDetailsOfParticularSlot(ind)
{
    firebase.database().ref("slotsInfo/slot"+(ind+1)).once("value").then(
        function (snapshot) {
            var slotData = snapshot.val();
            userInSlotDetails(slotData);
        });
}


function userInSlotDetails(slotData)
{
    var uid = slotData["userInSlot"];
    firebase.database().ref("userInfo/"+uid).once("value").then(
        function (snapshot) {
            document.getElementById("user_slot_name").innerText = "User name : "+snapshot.val()["username"];
            document.getElementById("user_id_slot").innerText = "User UID : "+snapshot.val()["idNumber"];
            document.getElementById("user_slot_email").innerText = "User Email : "+snapshot.val()["emailAddress"];
        });

}