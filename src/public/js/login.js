let password = document.getElementById("password");
let username = document.getElementById("username");
let submit = document.getElementById("submit");

check();

document.addEventListener("keyup", () => {
    check();
});

function check() {
    if (username.value.length <= 3 || password.value.length <= 3) {
        submit.disabled = true;
        submit.style.cursor = "unset";
    } else {
        submit.disabled = false;
        submit.style.cursor = "pointer";
    }
}
