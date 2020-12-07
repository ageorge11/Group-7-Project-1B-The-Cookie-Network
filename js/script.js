
$(document).ready(function () {

    $(".userName").html(localStorage.getItem("userName"));

    $("#registerbtn").click(function (event) {

        // console.log("register clicked");

        var data = {}
        data["fname"] = $("#fname").val();
        data["lname"] = $("#lname").val();
        data["email"] = $("#email").val();
        data["userName"] = $("#userName").val();
        data["password"] = $("#psw").val();

        if (!data["email"] || !data["userName"] || !data["password"] || !data["password"] || !$("#psw").val()) {
            console.log("Fields Missing");
        }
        else if ($("#pswRepeat").val() != data["password"]) {
            console.log("Password not matching");
        }
        else {

            $("#registerbtn").prop("disabled", true);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: " http://localhost:3000/api/user/register",
                data: JSON.stringify(data),
                dataType: 'json',
                timeout: 600000,
                success: function (data) {
                    console.log("DONE");
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                }
            });

            $("#registerbtn").prop("disabled", false);
        }
    });

    $("#loginbtn").click(function (event) {

        // console.log("register clicked");

        var data = {}

        data["email"] = $("#login_email").val();
        data["password"] = $("#login_password").val();

        if (!data["email"] || !data["password"]) {
            console.log("Fields Missing");
        }
        else {

            $("#loginbtn").prop("disabled", true);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: " http://localhost:3000/api/user/login",
                data: JSON.stringify(data),
                dataType: 'json',
                timeout: 600000,
                success: function (data) {
                    console.log("Login Success");
                    console.log(data);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userName", data.userName);

                    window.location.href = "home.html";
                },
                error: function (e) {
                    console.log("ERROR: ", e);
                }
            });

            $("#loginbtn").prop("disabled", false);
        }
    });

});

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
