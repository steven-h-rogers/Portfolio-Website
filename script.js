const formElement = document.querySelector("#contact-form");
const navbarBars = document.querySelector(".bars-button");
const navbarImg = document.querySelector("#bars-img");
const pageContainer = document.querySelector("#page-format-container");
const verticalNav = document.querySelector(".vertical-nav");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const messageInput = document.querySelector("#message-input");
const contactSection = document.querySelector("#contact");
const footer = document.querySelector("footer");

const navlistElements = document.querySelectorAll(".nav-link");

const wideScreenMediaQuery = window.matchMedia("(width >= 700px)");
const wideToNarrowMediaQuery = window.matchMedia("(width < 700px)");

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

  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
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
  } catch (error) {
    console.error("error hitting lambda", error);
  }
}

// toggle mobile navbar
navbarBars.addEventListener("click", () => {
  if (window.innerWidth < 700) {
    changeVerticalNavState();
  }
});

function changeVerticalNavState() {
  if (window.innerWidth < 700) {
    if (verticalNav.style.display !== "flex") {
      verticalNav.style.display = "flex";
      navbarImg.src = "imgs/ui_symbols/x-solid-full.svg";
    } else {
      verticalNav.style.display = "none";
      navbarImg.src = "imgs/ui_symbols/bars-solid-full.svg";
    }
    return verticalNav.style.display;
  }
}

// add click event listener to navbar elements that links to changeVerticalNavState
navlistElements.forEach((element) => {
  element.addEventListener("click", () => {
    setTimeout(() => {
      changeVerticalNavState();
    }, 100);
  });
});

messageInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.minHeight = "2rem";
  this.style.height = this.scrollHeight + "px";
});

function removeNavbarOnNarrowScreen(e) {
  if (e.matches) {
    verticalNav.style.display = "none";
    navbarImg.src = "imgs/ui_symbols/bars-solid-full.svg";

    console.log("wide to narrow detected");
  }
}

wideToNarrowMediaQuery.addEventListener("change", removeNavbarOnNarrowScreen);

function keepNavbarOnWideScreen(e) {
  if (e.matches) {
    verticalNav.style.display = "flex";
    console.log("change detected");
  }
}

wideScreenMediaQuery.addEventListener("change", keepNavbarOnWideScreen);

function setCopyright() {
  const currentYear = new Date().getFullYear();
  const copyright = document.createElement("p");
  copyright.classList.add("copyright");
  copyright.textContent = `\u00A9 ${currentYear} Steven Rogers. All rights reserved.`;

  contactSection.appendChild(copyright);
}

setCopyright();
