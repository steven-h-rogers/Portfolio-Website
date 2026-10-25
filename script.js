const formElement = document.querySelector("#contact-form");
const navbarBars = document.querySelector(".bars-button");
const navbarImg = document.querySelector("#bars-img");
const pageContainer = document.querySelector("#page-format-container");
const verticalNav = document.querySelector(".vertical-nav");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const messageInput = document.querySelector("#message-input");

const navlistElements = document.querySelectorAll(".nav-link");

const apiGatewayURL =
  "https://2j1szjlq17.execute-api.us-east-2.amazonaws.com/send";

// Send info to lambda upon submission
//! add clear on successful submissionks
formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formData);

  hitLambda(formData);
});

// hit the lambda endpoint with the form data
async function hitLambda(formData) {
  try {
    const response = await fetch(`${apiGatewayURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("lambda response", data);
    // there's probably a better way to do this but it makes sure that it only clears if it hits successfully
    // consider a more fleshed out response packet from the lambda function
    // also, figure out a more robust rate limiting where duplicate messages can't be sent
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  } catch (error) {
    console.error("error hitting lambda", error);
  }
}

// toggle mobile navbar
navbarBars.addEventListener("click", () => {
  changeVerticalNavState();
});

function changeVerticalNavState() {
  if (verticalNav.style.display == "none") {
    verticalNav.style.display = "flex";
    navbarImg.src = "imgs/ui_symbols/x-solid-full.svg";
  } else {
    verticalNav.style.display = "none";
    navbarImg.src = "imgs/ui_symbols/bars-solid-full.svg";
  }
  return verticalNav.style.display;
}

// add click event listener to navbar elements that links to changeVerticalNavState
navlistElements.forEach((element) => {
  element.addEventListener("click", () => {
    changeVerticalNavState();
  });
});

messageInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
