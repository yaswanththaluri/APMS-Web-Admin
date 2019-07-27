$(document).ready(function () {

    checkSlotAvailibility();

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

}