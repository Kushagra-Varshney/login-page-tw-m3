const singupBtn = document.querySelector("#signup-btn");
const colorDiv = document.querySelector(".color-bg");
const greetingHeading = document.querySelector("#greeting-heading");
const greetingImage = document.querySelector("#signup-image");
const accountText = document.querySelector("#account-status-text");
const formImageDiv = document.querySelector(".form-image");
const formContainer = document.querySelector(".form-container");
const multistepForm = document.querySelector(".multistep-form");
const circles = document.querySelectorAll(".circle");
const progressBar = document.querySelector(".indicator");
const buttons = document.querySelectorAll(".buttons");
const formSteps = document.querySelectorAll(".form-step");
const form = document.querySelector("#multistep-form");
const inputs = document.querySelectorAll("md-filled-text-field");
const loginSubmitBtn = document.querySelector("#login-submit-btn");
const loginForm = document.querySelector("#login-form");
const pwd = document.querySelector("#login-pwd");
const email = document.querySelector("#login-email");
const pwdErrorText = document.querySelector(".pwd-error-text");
const emailErrorText = document.querySelector(".email-error-text");
const errorModal = document.querySelector(".error-modal")
const loginInputs = document.querySelectorAll("md-outlined-text-field")


let currentStep = 1;

addValidationOnInputs();

const updateSteps = (e)=> {
    if(e.target.id == "next" && currentStep === 3) {
        if(form.reportValidity()) {
            multistepForm.classList.add("hidden")
            form.submit();
            window.location.href = "http://127.0.0.1:5501/homepage.html"
        }
        else {
            errorModal.classList.remove("hidden");
            return;
        }
    }
    errorModal.classList.add("hidden");
   currentStep = e.target.id === "next" ? ++currentStep : --currentStep;

   circles.forEach((circle, index) => {
        if(index < currentStep) {
            circle.classList.remove("border-gray-300");
            circle.classList.remove("bg-white");
            circle.classList.add("border-[#019898]");
            circle.classList.add("bg-[#019898]");
            circle.classList.add("text-white");
        }
        else {
            circle.classList.add("border-gray-300");
            circle.classList.add("bg-white");
            circle.classList.remove("border-[#019898]");
            circle.classList.remove("bg-[#019898]");
            circle.classList.remove("text-white");
        }
    });

    progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;


    if (currentStep === circles.length) {
        buttons[1].textContent = "Submit";
    } else if (currentStep === 1) {
        buttons[0].disabled = true;
        buttons[1].textContent = "Next";
    } else {
        buttons.forEach((button) => (button.disabled = false));
        buttons[1].textContent = "Next";
    }

    formSteps.forEach((form, index)=> {
        if(index == currentStep-1) {
            form.classList.remove("hidden");
        }
        else {
            form.classList.add("hidden")
        }
    });

};

buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
});

singupBtn.addEventListener("click", ()=> {
    formContainer.classList.toggle("translate-y-[200%]");
    formImageDiv.classList.toggle("translate-x-[101%]");
    multistepForm.classList.toggle("translate-y-[-200%]");
    formImageDiv.classList.toggle("rounded-r-3xl");
    formImageDiv.classList.toggle("rounded-l-3xl");
    changeTextContent();
});

loginSubmitBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    if(email.value.trim().length == 0) {
        emailErrorText.classList.remove("hidden");
        email.classList.add("border-red-500");
    }
    if(pwd.value != "password123") {
        pwdErrorText.classList.remove("hidden");
        pwd.classList.add("border-red-500");
    }
    else {
        loginForm.submit();
        window.location.href = "http://127.0.0.1:5501/homepage.html"
    }
});

pwd.addEventListener('change', ()=> {
    pwdErrorText.classList.add("hidden");
    pwd.classList.remove("border-red-500");
});

email.addEventListener('change', ()=> {
    emailErrorText.classList.add("hidden");
    email.classList.remove("border-red-500");
})

function changeTextContent() {
    console.log(formImageDiv.dataset.signup);
    if(formImageDiv.dataset.signup == "1") {
        greetingHeading.textContent = "Sign Up to access all Features";
        accountText.textContent = "Already an existing user?";
        singupBtn.textContent = "Log In";
        formImageDiv.dataset.signup = "0";
        greetingImage.src = "/assets/asset 21.png";
    }
    else {
        greetingHeading.textContent = "Welcome Back!";
        accountText.textContent = "Not an existing user?";
        singupBtn.textContent = "Sign Up";
        formImageDiv.dataset.signup = "1";
        greetingImage.src = "/assets/asset 24.png";
    }
}

function addValidationOnInputs() {
    inputs.forEach((input)=> {
        input.addEventListener('blur', ()=>{
            input.reportValidity();
        })
    });
    loginInputs.forEach((input)=> {
        input.addEventListener('blur', ()=>{
            input.reportValidity();
        })
    });
}

