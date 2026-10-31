// =====================================
// PINDAH LOGIN DAN DAFTAR
// =====================================

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");


showRegister.addEventListener("click", () =>{
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
});

showLogin.addEventListener("click", () => {
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
});


// =====================================
// TAMPILKAN / SEMBUNYIKAN PASSWORD
// =====================================
document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.target);

        if (target.type === "password") {
            target.type = "text";
            button.textContent = "Sembunyikan";
        } else {
            target.type = "password";
            button.textContent = "Lihat"
        }
    });
});



// =====================================
// FORM LOGIN DAN DAFTAR
// =====================================




