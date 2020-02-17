$(document).ready(function () {


    var passwordUser = document.getElementById("passwordUser");
    var emailUser = document.getElementById("emailUser");
    var nameUser = document.getElementById("nameUser");
    var idUser = document.getElementById("idUser");
    var addressUser = document.getElementById("addressUser");

    var database = firebase.database();

    var ref = database.ref('userInfo').orderByChild('username');
    $("#loader_parent").css("display", "flex");

    ref.on('value', function(snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            addUserToSelectMenu(childData);
        })
    });

    var filOption = document.getElementById("usersFilter");
    filOption.onchange = function () {
        $("#loader_parent").css("display", "flex");
        var id = filOption.options[filOption.selectedIndex].value;
        displayDetails(id);
    };

    $("#closeUserCreation").click(function () {

        $("#newUserCreationDiv").hide("slow");

    });
    
    

    $("#addNewUser").click(function () {

        $("#newUserCreationDiv").show("slow");

    });
    
    

    $("#showDetails").click(function () {
        $("#userFullDetails").slideToggle("slow");
    });
    
    

    $("#generatePassword").click(function () {
        
        var password = generatePassword();
        console.log(password);
        passwordUser.value = password;
        
        $("#passwordUser").prop("disabled", true);
        $("#generatePassword").hide();
        
    });

    
    
    $("#submitUserDetails").click(function () {
        
        var email = emailUser.value;
        var password = passwordUser.value;
        var id = idUser.value;
        var address = addressUser.value;
        var name = nameUser.value;

        $("#loader_parent").css("display", "flex");
        if (validateDetails(name, email, id, address, password))
        {
            createNewUser(email, password, name, id, address);

        }
        
    });

    $("#checkUser").click(function () {

        displayDetails(document.getElementById("UIDInput").value);
        $("#checkUser").hide();
        $("#resetField").show();
        $("#UIDInput").prop("disabled", true);

    });

    $("#resetField").click( function () {

        document.getElementById("UIDInput").value = "";
        $("#checkUser").show();
        $("#resetField").hide();
        $("#userDetailsDisplay").hide();
        $("#UIDInput").prop("disabled", false);
    });


});



function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^*0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function validateDetails(name, email, id, address, password) {

    if(name.length > 3 && email.length >6 && id.length === 12 && address.length > 3 && password.length > 6)
    {
        return true;
    }
    else
    {
        return false;
    }

}

function createNewUser(email, password, name, id, address) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            $("#loader_parent").css("display", "none");
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode+" "+errorMessage);
        })
        .then(function (data) {
            alert("user successfully created");
            console.log(data.user.uid);
            updateUserDetailsToDatabase(name, email, data.user.uid, address);
        });

}

function updateUserDetailsToDatabase(name, email, id, address) {

    firebase.database().ref("userInfo/"+id).set(
            {
                username: name,
                emailAddress: email,
                idNumber: id,
                addressUser: address,
                slotNumber : "None"
            }
    );

    $("#loader_parent").css("display", "none");
    alert("updated details");
}


function displayDetails(userId)
{
    var name = document.getElementById("userNameDisplay");
    var email = document.getElementById("userEmailDisplay");
    var uid = document.getElementById("userUIDDisplay");
    var address = document.getElementById("userAddressDisplay");

    firebase.database().ref("userInfo/"+userId).once("value").then(function (snapshot) {

        name.innerHTML = snapshot.val()["username"];
        email.innerHTML = snapshot.val()["emailAddress"];
        uid.innerHTML = snapshot.val()["idNumber"];
        address.innerHTML = snapshot.val()["addressUser"];

        $("#userDetailsDisplay").show();
        $("#loader_parent").css("display", "none");
    });


}

function addUserToSelectMenu(childData)
{
    $("#loader_parent").css("display", "none");
    var selectEle = document.getElementById("usersFilter");
    var option = document.createElement("option");
    option.text = childData["username"];
    option.value = childData["idNumber"];
    selectEle.add(option);
}