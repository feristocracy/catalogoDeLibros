//LOGIN//
const adminEmail = "admin@books.com";
const adminPass = "pass";
const userEmail = "dumbguy@xvideos.com";
const userPass = "mamarre";
const loginForm = document.getElementById("loginForm");
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("pass");
const createNewUser = document.getElementById("createNewUser");
const inputNewPass = document.getElementById("passCreate");
const inputNewPass2 = document.getElementById("passCreate2");
const inputNewEmail = document.getElementById("userCreate");
const radio = document.getElementsByName("Role");
const passCreate2 = document.getElementById("passCreate2");
const flexRadioDefault1 = document.getElementById("flexRadioDefault1");
const flexRadioDefault2 = document.getElementById("flexRadioDefault2");
/*-----------------------------------------*/          





let users = {};



document.addEventListener("DOMContentLoaded", () => {
                                                    if (localStorage.getItem("users"))	{// if there's an object on localStorage we retrieve it from there
                                                                                        users = JSON.parse(localStorage.getItem("users"));
                                                                                        //Test place                                                                                     
                                                                                        }
                                                    });

createNewUser.addEventListener("submit", e => { // listens Add button
                                        e.preventDefault(); //prevents default behavior
                                        addUser(e); // add the book
                                        });

loginForm.addEventListener("submit", e =>   { // listens the submit button of the page
                                            e.preventDefault();
                                            startSession(e);
                                            });

loginForm.addEventListener("click", e =>{
                                        createNewUser.reset();
                                        createUser(e);
                                        })                                            

const startSession = e =>   {
                             Object.values(users).find(query => {
                                                                if(query.userEmail == inputEmail.value && query.userPass == inputPass.value)
                                                                {
                                                                    users[0] = query.admin;
                                                                    localStorage.setItem("users", JSON.stringify(users));
                                                                    window.location.replace('home.html');
                                                                    return;
                                                                }
                                                                })

                            loginForm.reset();
                            alert("Usuario no encontrado o contraseña incorrecta...");
                            }
                                              

const createUser = e => {
                        if (e.target.classList.contains("btn-warning")) { 
                                                                        (function(){
                                                                            $(function(){
                                                                                $("#modalUser").modal()
                                                                            });
                                                                        }());
                                                                        return;
                                                                        }
                        }                            

const addUser = e =>{

                    passCreate2.placeholder = "Repite la contraseña";

                    if (inputNewPass.value !== inputNewPass2.value) {
                            inputNewPass2.value = "";
                            passCreate2.placeholder = "las contraseñas no coinciden";
                            return;
                    }
                    let roleRadio;
                    const user ={
                                id: Date.now(),
                                userEmail: inputNewEmail.value,
                                userPass: inputNewPass.value,
                                admin: flexRadioDefault2.checked,
                                }
                                
                    $('#modalUser').modal('hide');
                    createNewUser.reset(); // we reset our form

                    users[user.id] = user;
                    users[0] = user.admin;
                    localStorage.setItem("users", JSON.stringify(users));
                    console.log(users);

                    }                        