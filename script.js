const formElement = document.querySelector("#contact-form");
const navbarBars = document.querySelector(".bars-button");
const pageContainer = document.querySelector("#page-format-container");

const apiGatewayURL =
  "https://2j1szjlq17.execute-api.us-east-2.amazonaws.com/send";

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

navbarBars.addEventListener("click", () => {
  changeNavButtonState();

  if (navbarBars.classList.contains("show-nav")) {
    /* if show-nav is in class list, make a new element with a z index of 1000 and a clamped width
    and populate it with the actual vertical navbar element. Can do html as a string using a template literal
    and use insertAdjacentHTML to make it less dangerous*/
  }
});

function changeNavButtonState() {
  if (navbarBars.classList.contains("show-nav")) {
    navbarBars.classList.remove("show-nav");
  } else {
    navbarBars.classList.add("show-nav");
  }
}

const verticalNavHTML = `      
      <ul class="vertical-nav list" id="mobile-nav-list">
        <li class="nav-item"><a id="home-link" href="#">Home</a></li>
        <li class="nav-item">
          <a id="about-link" href="#about">About</a>
        </li>
        <li class="nav-item">
          <a id="projects-link" href="#">Projects</a>
        </li>
        <li class="nav-item">
          <a id="contact-link" href="#">Contact</a>
        </li>
        <li class="nav-item">
          <a id="download-resume-link" href="#">Download Resume</a>
        </li>
      </ul>`;
