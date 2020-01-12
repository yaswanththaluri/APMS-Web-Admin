$(document).ready(function()
{
    var database = firebase.database();

    var ref = database.ref('userInfo').orderByChild('username');

    ref.on('value', function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            addUserToSelectMenu(childData);
        })
    });

    var filOption = document.getElementById("usersOptionsFilter");
    filOption.onchange = function () {
        var id = filOption.options[filOption.selectedIndex].value;
        var parDiv = document.getElementById("time_items");
        parDiv.innerHTML = "";
        fetchDataForSelectedUser(id);
    }
});


function addUserToSelectMenu(childData)
{
    var selectEle = document.getElementById("usersOptionsFilter");
    var option = document.createElement("option");
    option.text = childData["username"];
    option.value = childData["idNumber"];
    selectEle.add(option);
}

function fetchDataForSelectedUser(id)
{
    var database = firebase.database();
    var ref = database.ref('UsersHistory').child(id);
    ref.on('value', function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            addHistoryItem(childData);
        })
    });
}

function addHistoryItem(data)
{
    var parDiv = document.getElementById("time_items");
    var newDiv = document.createElement("div");
    // language=HTML
    newDiv.innerHTML = "<h4> Status :"+data["parkStatus"]+"</h4>\n" +
        "                <hr style=\"width: 100%\"/>\n" +
        "                <div class=\"item_data\">\n" +
        "                    <p style=\"margin: 0px\">Slot Number"+data["slotNo"]+ "</p>\n" +
        "                    <p style=\"margin: 0px\">Time"+data["time"]+ "</p>\n" +
        "                </div>";

    newDiv.classList.add("item_parking");
    parDiv.appendChild(newDiv);
}