const URL_BASE = "http://127.0.0.1:8080/api/user";

function registerUser() {
    if (valEmptyRegister() ||
        !valSamePassword(document.getElementById('registerPassword').value,
            document.getElementById('registerRepeatPassword').value) ||
        !valEmail(document.getElementById('registerEmail').value)) {
        register();
        return;
    }

    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let name = document.getElementById("registerName").value;

    if (!email || !password || !name) {
        alert("Por favor, complete todos los campos");
        return;
    }

    let myData = {
        email: email,
        password: password,
        name: name
    };

    let dataToSend = JSON.stringify(myData);


    $.ajax({
        url: URL_BASE + "/" + encodeURIComponent(email),
        type: "GET",
        contentType: "application/JSON",
        success: function (resultado) {
            if (!resultado) {
                $.ajax({
                    url: URL_BASE + "/new",
                    type: "POST",
                    data: dataToSend,
                    contentType: "application/JSON",
                    success: function (resultado) {
                        alert("Cuenta creada de forma correcta");
                        login();
                    },
                    error: function (xhr, status) {
                        alert("No fue posible crear la cuenta");
                    }
                });
            } else {
                alert("Email ya existe");
            }
            register();
        },
        error: function (xhr, status) {
            alert("No fue posible crear la cuenta");
            register();
        }
    });
}

function getLogin() {
    email = document.getElementById("loginName").value;
    password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Por favor, complete todos los campos");
        return;
    }

    $.ajax({
        url: URL_BASE + "/" + encodeURIComponent(email) + "/" + encodeURIComponent(password),
        type: "GET",
        success: function (resultado) {
            validateLogin(resultado);
            clearScreen();
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function clearScreen() {
    $('#registerName').val("");
    $('#registerEmail').val("");
    $('#registerPassword').val("");
    $('#registerRepeatPassword').val("");
    $("#loginName").empty();
    $("#loginPassword").empty();
}

function validateLogin(user) {
    if (user.id == null) {
        alert("No existe un usuario");
    } else {
        alert(`Bienvenido ${user.name}`);
    }
}

function valEmptyRegister() {
    if ($('#registerName').val() == "" ||
        $('#registerEmail').val() == "" ||
        $('#registerPassword').val() == "" ||
        $('#registerRepeatPassword').val() == "") {
        alert("No se permiten campos vacios");
        return true;
    }
    return false;
}

function valEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        alert("El email no es válido");
        return false;
    }
    return true;
}

function valSamePassword(password, repeatPassword) {
    if (password != repeatPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }
    return true;
}

function register() {
    document.getElementById("tab-register").click();
    clearScreen();
}

function login() {
    document.getElementById("tab-login").click();
    clearScreen();
}