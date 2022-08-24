/*-------------- CONSTANTS ------------------*/
const form = document.getElementById("form");
const bookshelf = document.getElementById("bookshelf");
const template = document.getElementById("template");
const fragment = document.createDocumentFragment();
const input = document.querySelector("input");
/*----------------------------------------------*/

let books = { }; // initializing object collection

books.addEventListener("click", e =>{
                                    form.addEventListener("submit", e =>{ // listens search button
                                                                        e.preventDefault(); //prevents default behavior
                                                                        searchBook(e); // look up for the book
                                                                        });
                                    });

const addBook = e =>{
                    if(input.value.trim() === "") {console.log("nothing searched..."); return;}
                    const book ={
                                id: Date.now(),
                                title: input.value, //ver cómo tomar un dato de cada celda
                                author: input.value, //
                                publishing: input.value, //
                                year: input.value, //
                                available: true
                                }

                    books[book.id] = book; // we push the book into our bookshelf
                    alert("Añadido exitosamente!"); // we let the user its done
                    form.reset(); // we reset our form
                    input.focus(); // set cursor back to input
                    }

const showAllBooks = e =>   {
                            if (Object.values(books).length === 0)  { // if we dont have any book
                                                                        bookshelf.innerHTML = `<div class="alert alert-light text-center">No books yet 🎮</div>`;
                                                                        return;
                                                                        }
                            bookshelf.innerHTML = ""; // we delete the object
                            Object.values(books).forEach(book =>{
                                                                const clone = template.cloneNode(true); // first we clone our template
                                                                clone.getElementById("title").textContent = book.title; // we draw every field from our object
                                                                clone.getElementById("author").textContent = book.author ; 
                                                                clone.getElementById("publishing").textContent = book.publishing; 
                                                                clone.getElementById("year").textContent = book.year; 
                                                                if (book.available == false){ // if the book isnt available
                                                                                            clone.querySelector(".alert").classList.replace("alert-warning", "alert-light");
                                                                                            clone.querySelector(".text-success").classList.replace("fa-plus-circle", "fa-rotate-left");
                                                                                            clone.querySelector(".text-success").classList.replace("text-success", "text-dark");
                                                                                            }
                                                                clone.querySelectorAll(".fas")[0].dataset.id = task.id; // references green plus button 
                                                                clone.querySelectorAll(".fas")[1].dataset.id = task.id; // references edit blue button 
                                                                clone.querySelectorAll(".fas")[2].dataset.id = task.id; // references red minus button
                                                                fragment.appendChild(clone);
                                                                });
                            bookshelf.appendChild(fragment); 
                            }

const actionButtons = e =>  { // we set the action for every circle button
                            if (e.target.classList.contains("fa-plus-circle"))  { // if we click green plus button
                                                                                books[e.target.dataset].status = false;
                                                                                showAllBooks();
                                                                                return;
                                                                                }
                            if (e.target.classList.contains("fa-rotate-left")) { // if we click blue edit button
                                                                        books[e.target.dataset].status = true;
                                                                        showAllBooks();
                                                                        return;
                                                                        }
                            if (e.target.classList.contains("fa-circle-minus")) { // if we click red minus button
                                                                                delete books[e.target.dataset.id];
                                                                                showAllBooks();
                                                                                return;
                                                                                }
                            e.stopPropagation();
                            }