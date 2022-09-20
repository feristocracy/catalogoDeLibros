//LOGIN//
const adminEmail = "admin@books.com";
const adminPass = "pass";
const userEmail = "dumbguy@xvideos.com";
const userPass = "mamarre";
const loginForm = document.getElementById("loginForm");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("pass");
/*-----------------------------------------*/          

let users = {};

document.addEventListener("DOMContentLoaded", () => {
                                                    if (localStorage.getItem("books"))	{// if there's an object on localStorage we retrieve it from there
                                                                                        users = JSON.parse(localStorage.getItem("users"));
                                                                                        //Test place                                                                                     
                                                                                        }
                                                    });



loginForm.addEventListener("submit", e =>   { // listens the submit button of the page
                                            e.preventDefault();
                                            startSession(e);
                                            });

const startSession = e =>   {
                            if (inputEmail.value == users[1].email && inputPass.value == users[1].password) { // if the mail and password matches
                                                                                                loginForm.reset();
                                                                                                users[3].adminRole = true;
                                                                                                localStorage.setItem("users", JSON.stringify(users));
                                                                                                window.location.replace('home.html');
                                                                                                return;
                                                                                                }
                            if (inputEmail.value == users[2].email && inputPass.value == users[2].password) { // if the mail and password matches
                                                                                                loginForm.reset();
                                                                                                users[3].adminRole = false;
                                                                                                localStorage.setItem("users", JSON.stringify(users));
                                                                                                window.location.replace('home.html');
                                                                                                return;
                                                                                                }                                                                            
                                                                                                
                            alert("Usuario no encontrado o contraseña incorrecta...");
                            loginForm.reset();
                            }
                                              