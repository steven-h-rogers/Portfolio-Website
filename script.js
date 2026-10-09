const formElement = document.getElementById("contact-form");

const lambdaBaseURL =
  "https://m53gxsh46yvr67igvtwnwbcfz40netas.lambda-url.us-east-2.on.aws/";

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-input").value;
  const email = document.querySelector("#email-input").value;
  const message = document.querySelector("#message-input").value;

  console.log(name, email, message);

  const payload = new URLSearchParams({
    name: name,
    email: email,
    message: message,
  });
  hitLambda(payload);
});

async function hitLambda(payload) {
  try {
    const response = await fetch(`${lambdaBaseURL}?${payload.toString()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log("lambda response", data);
  } catch (error) {
    console.error("herror hitting lambda", error);
  }
}
