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
const inputNewEmail = document.getElementById("userCreate");
const roleRadio = document.querySelector('input[name="flexRadioDefault"]:checked').value;
/*-----------------------------------------*/          





let users = {};



document.addEventListener("DOMContentLoaded", () => {
                                                    if (localStorage.getItem("books"))	{// if there's an object on localStorage we retrieve it from there
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
                                        createUser(e);
                                        })                                            

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
                    const user ={
                                userEmail: inputEmail.value,
                                userPass: inputPass.value,
                                }
                    console.log(user);
                    console.log(roleRadio);

/* books[book.id] = book; // we push the book into our bookshelf */
addForm.reset(); // we reset our form
                    }                        