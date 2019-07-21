$(document).ready(function () {


    var passwordUser = document.getElementById("passwordUser");
    var emailUser = document.getElementById("emailUser");
    var nameUser = document.getElementById("nameUser");
    var idUser = document.getElementById("idUser");
    var addressUser = document.getElementById("addressUser");

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


        if (validateDetails(name, email, id, address, password))
        {
            createNewUser(email, password, name, id, address);

        }
        
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

            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode+" "+errorMessage);
        })
        .then(function () {
            alert("user successfully created");
            updateUserDetailsToDatabase(name, email, id, address);
        });

}

function updateUserDetailsToDatabase(name, email, id, address) {

    firebase.database().ref("userInfo/"+id).set(
            {
                username: name,
                emailAddress: email,
                idNumber: id,
                addressUser: address
            }
    );

    alert("updated details");
}

