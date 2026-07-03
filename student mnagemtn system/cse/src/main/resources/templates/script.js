// saving the registration details from signup page
let signupForm = document.getElementById("signupForm");

if(signupForm){
    signupForm.addEventListener("submit", function(event){
        // this will prevent the page from reloading
        event.preventDefault();
        // reading the data from the input boxes
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Validate the Inpugt
        let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$&!?])(?=.*\d).{8,}$/

        if(name == "" || email == "" || password == ""){
            alert("All Fields Requiered");
            return ;
        }

        if(!pattern.test(password)){
            alert("Password Must Contain Atleast 1 Capital Letter, 1 Small Letter, 1 Special Character, 1 Digit and minimum 8 length");
            return ;
        }
    
        // javascript object creation
        let user = {name : name, email : email, password : password};
    
        localStorage.setItem("user", JSON.stringify(user));
    
        alert("SignedUp Successfully!");
        // redirect the page to Login Page (login.html)
            window.location.href = "login.html";
    });
}

let loginForm = document.getElementById("loginForm")

if(loginForm){
    loginForm.addEventListener("submit", function(event){
        // this will prevent the page from reloading
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // reading the data from local storage
        let user = JSON.parse(localStorage.getItem("user"));

        // comparing data from local storage with entered data
        if(email == user.email && password == user.password){
            alert("Login Successfull!");
            localStorage.setItem("isLoggedIn", "true");
            // redirect the page to Home (index.html)
            window.location.href = "index.html";
        }else{
            alert("Invalid Email or Password!");
        }
    });
}

//javaScript for changing the HEading after loggin
let heading = document.getElementById("welcomeMessage");

if(heading){
    // first get the user details
    let user = JSON.parse(localStorage.getItem("user"));
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    // if the user exists then change the welcom message
    if(user && isLoggedIn == "true"){
        heading.innerHTML = "Welcome " + user.name + "!";
    }
}

// Protecting the Tasks.html from opening without log in
let currentPage = window.location.pathname;

if(currentPage.includes("tasks.html")){
    let loginStatus = localStorage.getItem("isLoggedIn");

    if(loginStatus != "true"){
        alert("Please Log In First!")
        window.location.href = "login.html";
    }
}

// Logout Btn Logic
let LogoutButton = document.getElementById("logoutBtn");

if(LogoutButton){
    LogoutButton.addEventListener("click", function(){
        localStorage.removeItem("isLoggedIn");
        alert ("Logged Out Successfully!");
        window.location.href = "index.html";
    });
}

// Dynamic NavBar Logic

let signupLink = document.getElementById("signuplink");
let loginLink = document.getElementById("loginlink");
let logoutBtn = document.getElementById("logoutBtn");

// checking if the login is true or false!
let loginStatus = localStorage.getItem("isLoggedIn");

if(loginStatus == "true"){
    if(signupLink){
        signupLink.style.display = "none";
    }
    if(loginLink){
        loginLink.style.display = "none";
    }
}else{
    if(logoutBtn){
        logoutBtn.style.display = "none";
    }
}

// Dynamically adding Tasks in tasks.html
let addButton = document.getElementById("addTaskBtn")

if(addButton){
    showTasks();
    addButton.addEventListener("click", function(){
        let task = document.getElementById("taskInput").value;
        if(task == ""){
            alert("Enter the Task First!");
            return ;
        };
        // find "tasks" key in local storage if not found create empty array
        let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
        taskArray.push(task);
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        taskInput.value = "";
        showTasks();
    })
}

function showTasks(){
    let taskList = document.getElementById("taskList");
    
    if(!taskList){
        return ;
    }

    taskList.innerHTML = "";
    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    for(let i=0; i<taskArray.length; i++){
        taskList.innerHTML +=  `
        <tr>
            <td>${taskArray[i]}</td>
            <td>
                <button onclick="deleteTask(${i})">Delete</button>
            </td>
        </tr>
        `;
    }
}

function deleteTask(index){
    let taskArray = JSON.parse(localStorage.getItem("tasks"));
    taskArray.splice(index,1);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    showTasks();
}