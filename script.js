const formElement = document.getElementById("contact-form");

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
