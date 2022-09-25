/*-------------- CONSTANTS ------------------*/
const addForm = document.getElementById("addForm");
const bookshelf = document.getElementById("bookshelf");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
const inputTitle = document.querySelectorAll(".add")[0];
const inputAuthor = document.querySelectorAll(".add")[1];
const inputPublishing = document.querySelectorAll(".add")[2];
const inputYear = document.querySelectorAll(".add")[3];
const inputInventory = document.querySelectorAll(".add")[4];
const inputTitleEdit = document.querySelectorAll(".edi")[0];
const inputAuthorEdit = document.querySelectorAll(".edi")[1];
const inputPublishingEdit = document.querySelectorAll(".edi")[2];
const inputYearEdit = document.querySelectorAll(".edi")[3];
const inputInventoryEdit = document.querySelectorAll(".edi")[4];
const inputTitleSearch = document.querySelectorAll(".search")[0];
const inputAuthorSearch = document.querySelectorAll(".search")[1];
const inputPublishingSearch = document.querySelectorAll(".search")[2];
const inputYearSearch = document.querySelectorAll(".search")[3];
const mainMenu = document.getElementById("mainMenu");
const form = document.getElementById("form");
const newButton = document.querySelector(".btn-success");
const seeAllButton = document.querySelector(".btn-warning");
const db = document.getElementById("DB");
const loadFile = document.getElementById("loadFile"); // to import CSV
const loadFile2 = document.getElementById("loadFile2"); //
const showEditForm = document.getElementById("showEditForm"); // div of edit book
const editForm = document.getElementById("editForm"); // div of form
const searchForm = document.getElementById("searchForm"); // the first form (search)
/*----------------------------------------------*/

/*----------------- VARIABLES ----------------------*/
let tempID = 0; //temporary id for updating purposes
let books = { }; // initializing object collection
let admin = true; //initializing user admin
let clickNew = 0;
let clickShow = 0;
let queryResult = 0; //if there's no results on the searchform
/*--------------------------------------------------*/



document.addEventListener("DOMContentLoaded", () => { //actions for when the dom content has fully loaded
                                                    admin = JSON.parse(localStorage.getItem("admin"));
                                                    if (localStorage.getItem("books"))	{// if there's an object on localStorage we retrieve it from there	
                                                                                        books = JSON.parse(localStorage.getItem("books"));                                                
                                                                                        }
                                                    if (admin == false) { // if not admin, we cannot see some buttons
                                                                        document.querySelectorAll(".admin")[0].style.display = "none";
                                                                        document.querySelectorAll(".admin")[1].style.display = "none";
                                                                        document.querySelectorAll(".admin")[2].style.display = "none";
                                                                        }
                                                    });
                                                
//-------------------EXPORT--------------------//
const download = function(data) { // descarga el archivo en formato csv / we download the file on csv format
                                const blob = new Blob([data], { type: 'text/csv'});
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.setAttribute("hidden", "");
                                a.setAttribute("href", url);
                                a.setAttribute("download", "bookCatalog.csv");
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                };
//-------------------------------------------//


/*----------------EVENT LISTENERS---------------*/
loadFile2.addEventListener("click", function() { loadFile.click();}) // listens the load db button

searchForm.addEventListener("submit", e =>  { // listens the "search" button
                                            e.preventDefault();
                                            searchBook(e); // to search the book
                                            });

bookshelf.addEventListener("click", e =>{ // listens the buttons of every circle shaped button
                                        actionButtons(e);
                                        });

form.addEventListener("click", e => { // listens form buttons 
                                    menuButtons(e);
                                    });

db.addEventListener("click", e =>   { // listens buttons to export or import db below
                                    dbButtons(e);
                                    });

addForm.addEventListener("submit", e => { // listens Add button
                                        e.preventDefault(); //prevents default behavior
                                        addBook(e); // add the book
                                        });

editForm.addEventListener("submit", e => { // listens Edit button
                                        e.preventDefault(); //prevents default behavior
                                        editBook(e); // add the book
                                        });

editForm.addEventListener("click", e => { // listens the buttons when you edit a book
                                        editMenuButtons(e);
                                        })
/*----------------------------------------------*/


/*---------------FUNCTIONS-------------------------*/
const addBook = e =>{ //adds a new book
                    const book ={
                                id: Date.now(),
                                title: inputTitle.value, // takes the input value
                                author: inputAuthor.value, //
                                publishing: inputPublishing.value, //
                                year: inputYear.value, //
                                inventory: inputInventory.value, //
                                available: true,
                                searched: true
                                }

                    books[book.id] = book; // we push the book into our bookshelf
                    addForm.reset(); // we reset our form
                    showAllBooks();
                    }

const editBook = e =>  { //edit the selected book
                        books[tempID].title = inputTitleEdit.value;
                        books[tempID].author = inputAuthorEdit.value; 
                        books[tempID].publishing = inputPublishingEdit.value;
                        books[tempID].year = inputYearEdit.value;
                        books[tempID].inventory = inputInventoryEdit.value;
                        if (books[tempID].inventory >= 1) {books[tempID].available = true;}
                        editForm.reset(); // we reset our form
                        showEditForm.style.display = "none";
                        showAllBooks();
                        }

const searchBook = e => { // to search for the book
                        queryResult = 0;
                        bookshelf.innerHTML = "";

                        Object.values(books).find(query =>  {query.searched = false;
                                                            if (inputTitleSearch.value !== "" && query.title.toLowerCase().includes(inputTitleSearch.value))
                                                                {
                                                                bookshelf.removeAttribute("style");
                                                                seeAllButton.textContent = "🗃Ocultar todos";
                                                                clickShow = 1;
                                                                const clone = template.cloneNode(true); // first we clone our template
                                                                clone.querySelector("#title").textContent = "Título: " + query.title; // we draw every field from our object
                                                                clone.querySelector("#author").textContent = "Autor: " + query.author ; 
                                                                clone.querySelector("#publishing").textContent = "Editorial: " + query.publishing; 
                                                                clone.querySelector("#year").textContent = "Año: " + query.year;
                                                                clone.querySelector("#disponibilidad").textContent = "Disponibles: " + query.inventory;
                                                                if(query.inventory == 0) {
                                                                                        query.available = false;
                                                                                        }
                                                                if (query.available == false){ // if the query isnt available
                                                                                            clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
                                                                                            clone.querySelector(".fa-plus-circle").classList.replace("fa-plus-circle", "fa-rotate-left");
                                                                                            clone.getElementById("firstB").setAttribute("title", "Devolver libro");
                                                                                            clone.querySelector(".text-success").classList.replace("text-success", "text-dark");
                                                                                            }
                                                                clone.querySelectorAll(".fas")[0].dataset.id = query.id; // references green plus button 
                                                                clone.querySelectorAll(".fas")[1].dataset.id = query.id; // references edit blue button 
                                                                clone.querySelectorAll(".fas")[2].dataset.id = query.id; // references red minus button
                                                                clone.getElementById("disponibilidad").dataset.id = query.id;
                                                                fragment.appendChild(clone);
                                                                bookshelf.appendChild(fragment);
                                                                query.searched = true;
                                                                queryResult++;
                                                                }
                                                            if (inputAuthorSearch.value !== "" && query.author.toLowerCase().includes(inputAuthorSearch.value))
                                                                {
                                                                    bookshelf.removeAttribute("style");
                                                                    seeAllButton.textContent = "🗃Ocultar todos";
                                                                    clickShow = 1;
                                                                    const clone = template.cloneNode(true); // first we clone our template
                                                                    clone.querySelector("#title").textContent = "Título: " + query.title; // we draw every field from our object
                                                                    clone.querySelector("#author").textContent = "Autor: " + query.author ; 
                                                                    clone.querySelector("#publishing").textContent = "Editorial: " + query.publishing; 
                                                                    clone.querySelector("#year").textContent = "Año: " + query.year;
                                                                    clone.querySelector("#disponibilidad").textContent = "Disponibles: " + query.inventory;
                                                                    if(query.inventory == 0) {
                                                                                            query.available = false;
                                                                                            }
                                                                    if (query.available == false){ // if the query isnt available
                                                                                                clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
                                                                                                clone.querySelector(".fa-plus-circle").classList.replace("fa-plus-circle", "fa-rotate-left");
                                                                                                clone.getElementById("firstB").setAttribute("title", "Devolver libro");
                                                                                                clone.querySelector(".text-success").classList.replace("text-success", "text-dark");
                                                                                                }
                                                                    clone.querySelectorAll(".fas")[0].dataset.id = query.id; // references green plus button 
                                                                    clone.querySelectorAll(".fas")[1].dataset.id = query.id; // references edit blue button 
                                                                    clone.querySelectorAll(".fas")[2].dataset.id = query.id; // references red minus button
                                                                    clone.getElementById("disponibilidad").dataset.id = query.id;
                                                                    fragment.appendChild(clone);
                                                                    bookshelf.appendChild(fragment);
                                                                    query.searched = true;
                                                                    queryResult++;
                                                                }
                                                            if (inputPublishingSearch.value !== "" && query.publishing.toLowerCase().includes(inputPublishingSearch.value))
                                                                {
                                                                //console.log("encontrado " + query.publishing);
                                                                bookshelf.removeAttribute("style");
                                                                seeAllButton.textContent = "🗃Ocultar todos";
                                                                clickShow = 1;
                                                                const clone = template.cloneNode(true); // first we clone our template
                                                                clone.querySelector("#title").textContent = "Título: " + query.title; // we draw every field from our object
                                                                clone.querySelector("#author").textContent = "Autor: " + query.author ; 
                                                                clone.querySelector("#publishing").textContent = "Editorial: " + query.publishing; 
                                                                clone.querySelector("#year").textContent = "Año: " + query.year;
                                                                clone.querySelector("#disponibilidad").textContent = "Disponibles: " + query.inventory;
                                                                if(query.inventory == 0) {
                                                                                        query.available = false;
                                                                                        }
                                                                if (query.available == false){ // if the query isnt available
                                                                                            clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
                                                                                            clone.querySelector(".fa-plus-circle").classList.replace("fa-plus-circle", "fa-rotate-left");
                                                                                            clone.getElementById("firstB").setAttribute("title", "Devolver libro");
                                                                                            clone.querySelector(".text-success").classList.replace("text-success", "text-dark");
                                                                                            }
                                                                clone.querySelectorAll(".fas")[0].dataset.id = query.id; // references green plus button 
                                                                clone.querySelectorAll(".fas")[1].dataset.id = query.id; // references edit blue button 
                                                                clone.querySelectorAll(".fas")[2].dataset.id = query.id; // references red minus button
                                                                clone.getElementById("disponibilidad").dataset.id = query.id;
                                                                fragment.appendChild(clone);
                                                                bookshelf.appendChild(fragment);
                                                                query.searched = true;
                                                                queryResult++;
                                                                }
                                                            if (inputYearSearch.value !== "" && query.year.toLowerCase().includes(inputYearSearch.value))
                                                                {
                                                                bookshelf.removeAttribute("style");
                                                                seeAllButton.textContent = "🗃Ocultar todos";
                                                                clickShow = 1;
                                                                const clone = template.cloneNode(true); // first we clone our template
                                                                clone.querySelector("#title").textContent = "Título: " + query.title; // we draw every field from our object
                                                                clone.querySelector("#author").textContent = "Autor: " + query.author ; 
                                                                clone.querySelector("#publishing").textContent = "Editorial: " + query.publishing; 
                                                                clone.querySelector("#year").textContent = "Año: " + query.year;
                                                                clone.querySelector("#disponibilidad").textContent = "Disponibles: " + query.inventory;
                                                                if(query.inventory == 0) {
                                                                                        query.available = false;
                                                                                        }
                                                                if (query.available == false){ // if the query isnt available
                                                                                            clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
                                                                                            clone.querySelector(".fa-plus-circle").classList.replace("fa-plus-circle", "fa-rotate-left");
                                                                                            clone.getElementById("firstB").setAttribute("title", "Devolver libro");
                                                                                            clone.querySelector(".text-success").classList.replace("text-success", "text-dark");
                                                                                            }
                                                                clone.querySelectorAll(".fas")[0].dataset.id = query.id; // references green plus button 
                                                                clone.querySelectorAll(".fas")[1].dataset.id = query.id; // references edit blue button 
                                                                clone.querySelectorAll(".fas")[2].dataset.id = query.id; // references red minus button
                                                                clone.getElementById("disponibilidad").dataset.id = query.id;
                                                                fragment.appendChild(clone);
                                                                bookshelf.appendChild(fragment);
                                                                query.searched = true;
                                                                queryResult++;
                                                                }
                                                            })
                        if (queryResult == 0)   {
                                                bookshelf.removeAttribute("style");
                                                bookshelf.innerHTML = `<div class="alert alert-light text-center">No se encontró lo que buscabas... 🍕</div>`;
                                                Object.values(books).forEach(book =>{book.searched=true;});
                                                }
                        
                        searchForm.reset();
                        }

const showAllBooks = e =>   { //show all books in bookshelf
                            bookshelf.removeAttribute("style");
                            seeAllButton.textContent = "🗃Ocultar todos";
                            clickShow = 1;
                            localStorage.setItem("books", JSON.stringify(books)); // we save our bookshelf on the local storage
                            if (Object.values(books).length === 0)  { // if we dont have any book
                                                                    bookshelf.innerHTML = `<div class="alert alert-light text-center">No hay libros... 🎮</div>`;
                                                                    return;
                                                                    }
                            bookshelf.innerHTML = ""; // we delete the object
                            Object.values(books).forEach(book =>{if(book.searched == true){
                                                                const clone = template.cloneNode(true); // first we clone our template
                                                                clone.querySelector("#title").textContent = "Título: " + book.title; // we draw every field from our object
                                                                clone.querySelector("#author").textContent = "Autor: " + book.author ; 
                                                                clone.querySelector("#publishing").textContent = "Editorial: " + book.publishing; 
                                                                clone.querySelector("#year").textContent = "Año: " + book.year;
                                                                clone.querySelector("#disponibilidad").textContent = "Disponibles: " + book.inventory;
                                                                if(book.inventory == 0) {
                                                                                        book.available = false;
                                                                                        }
                                                                if (book.available == false){ // if the book isnt available
                                                                                            clone.querySelector(".alert").classList.replace("alert-warning", "alert-secondary");
                                                                                            clone.querySelector(".fa-plus-circle").classList.replace("fa-plus-circle", "fa-rotate-left");
                                                                                            clone.getElementById("firstB").setAttribute("title", "Devolver libro");
                                                                                            clone.querySelector(".text-success").classList.replace("text-success", "text-dark");
                                                                                            }
                                                                clone.querySelectorAll(".fas")[0].dataset.id = book.id; // references green plus button 
                                                                clone.querySelectorAll(".fas")[1].dataset.id = book.id; // references edit blue button 
                                                                clone.querySelectorAll(".fas")[2].dataset.id = book.id; // references red minus button
                                                                clone.getElementById("disponibilidad").dataset.id = book.id;
                                                                if (admin == false) { // if the user isnt admin these buttons doesnt show
                                                                                    clone.getElementById("edit").style="display: none;"
                                                                                    clone.getElementById("delete").style="display: none;"
                                                                                    }
                                                                fragment.appendChild(clone);
                                                                /* if (admin == false) {
                                                                    document.getElementById("edit").style.display = "none";
                                                                    document.getElementById("delete").style.display = "none";
                                                                    } */
                                                                }});
                            
                            bookshelf.appendChild(fragment);
                            }

const showSearch = e => { //shows the "add book" menu
                        if (clickNew == 0)  {
                                            showForm.removeAttribute("style");
                                            newButton.textContent = "🔙Cancelar";
                                            clickNew = 1;
                                            return;
                                            }
                        if (clickNew ==1)   {
                                            showForm.style.display = "none";
                                            newButton.textContent = "➕Nuevo";
                                            clickNew = 0;
                                            return;
                                            }
                        } 
/*---------------------------------------------------*/


//-------------IMPORT CSV------------//
const storageContent = content =>	{
                                    books = JSON.parse(content);
                                    showAllBooks();
                                    }

const readFile = e => 	{
                        const file = e.target.files[0];
                        if (!file) {return;}
                        const reader = new FileReader();
                        reader.onload = e =>{
                                    const content = e.target.result;
                                    storageContent(content);
                                    };
                                    reader.readAsText(file);
                        }
document.getElementById("loadFile").addEventListener("change", readFile, false);
//----------------------------------//


/*----------------ACTION BUTTONS----------------*/
const actionButtons = e =>  { // we set the action for every circle button
                            if (e.target.classList.contains("fa-plus-circle"))  { // if we click green plus button
                                                                               /*  if (books[e.target.dataset.id].inventory == 0) { // if there's no books, is not available
                                                                                                                        books[e.target.dataset.id].available = false;
                                                                                                                        showAllBooks();
                                                                                                                        return;
                                                                                                                                } */
                                                                                
                                                                                books[e.target.dataset.id].inventory--;
                                                                                books[e.target.dataset.id].available = false;
                                                                                showAllBooks();
                                                                                return;
                                                                                }
                            if (e.target.classList.contains("fa-rotate-left")) { // if we click blue edit button
                                                                        books[e.target.dataset.id].available = true;
                                                                        books[e.target.dataset.id].inventory++;

                                                                        showAllBooks();
                                                                        return;
                                                                        }
                            if (e.target.classList.contains("fa-circle-minus")) { // if we click red minus button
                                                                                delete books[e.target.dataset.id];
                                                                                showAllBooks();
                                                                                return;
                                                                                }
                            if (e.target.classList.contains("fa-edit")) { // if we click edit button // BUG-----------
                                                                        showEditForm.removeAttribute("style");
                                                                        editForm.querySelectorAll("input")[0].value = books[e.target.dataset.id].title;
                                                                        editForm.querySelectorAll("input")[1].value = books[e.target.dataset.id].author;
                                                                        editForm.querySelectorAll("input")[2].value = books[e.target.dataset.id].publishing;
                                                                        editForm.querySelectorAll("input")[3].value = books[e.target.dataset.id].year;
                                                                        editForm.querySelectorAll("input")[4].value = books[e.target.dataset.id].inventory;
                                                                        tempID = e.target.dataset.id;
                                                                        }
                            }

const menuButtons = e =>{ // setting action for main menu buttons
                        if (e.target.classList.contains("btn-warning")) {
                                                if (clickShow == 0){
                                                                    seeAllButton.textContent = "🗃Ocultar todos";
                                                                    showAllBooks();
                                                                    clickShow = 1;
                                                                    return;
                                                                    }
                                                if (clickShow == 1){
                                                                    seeAllButton.textContent = "📚Ver todos";
                                                                    bookshelf.style.display = "none";
                                                                    Object.values(books).forEach(book =>{book.searched=true;}); // we set all books to "searched" status
                                                                    clickShow = 0;
                                                                    return;
                                                                    }
                                                                        }
                        if (e.target == newButton) {
                                                    showSearch();
                                                    return
                                                    }
                        e.stopPropagation();
                        }

const dbButtons = e =>  { // sets action for db buttons below
                        if (e.target.classList.contains("btn-outline-dark")){ // if exports DB
                                                                            download(JSON.stringify(books));
                                                                            return;
                                                                            }
                        e.stopPropagation();
                        }

const editMenuButtons = e =>{ // if we click on a button of the edit book menu
                            if (e.target.classList.contains("cancelButton")){ // if we click cancel button
                                                                            showEditForm.style.display = "none";
                                                                            }
                            }
/*---------------------------------------------*/
