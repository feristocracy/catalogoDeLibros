//LOGIN//
const adminEmail = "admin@books.com";
const adminPass = "pass";
const userEmail = "dumbguy@xvideos.com";
const userPass = "mamarre";
const loginForm = document.getElementById("loginForm");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("pass");
/*-----------------------------------------*/

let superuser = false;

loginForm.addEventListener("submit", e =>   {
                                            e.preventDefault();
                                            startSession(e);
                                            });

const startSession = e =>   {
                            if (inputEmail.value == adminEmail && inputPass.value == adminPass){
                                                                                        superuser = true;
                                                                                        loginForm.reset();
                                                                                        window.location.replace('home.html');
                                                                                        return;
                                                                                        }
                            alert("Usuario no encontrado o contraseña incorrecta...");
                            loginForm.reset();
                            }
                                              