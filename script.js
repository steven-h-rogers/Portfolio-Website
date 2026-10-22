const formElement = document.querySelector("#contact-form");
const navbarBars = document.querySelector(".bars-button");
const navbarImg = document.querySelector("#bars-img");
const pageContainer = document.querySelector("#page-format-container");
const verticalNav = document.querySelector(".vertical-nav");
const messageInput = document.querySelector("#message-input");
const navlistElements = document.querySelectorAll(".nav-link");

const apiGatewayURL =
  "https://2j1szjlq17.execute-api.us-east-2.amazonaws.com/send";

// Send info to lambda upon submission
formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = {
    name: document.querySelector("#name-input").value,
    email: document.querySelector("#email-input").value,
    message: document.querySelector("#message-input").value,
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
  } catch (error) {
    console.error("herror hitting lambda", error);
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
