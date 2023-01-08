// Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

// Call backend API for image generation
function onSubmit(event) {
  event.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#image-size").value;
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    // reset();
    const response = await fetch("/openai/generateImg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });
    if (!response.ok) {
      throw new Error("That image couldnot be generated");
    }
    const { imageUrl } = await response.json();
    document.querySelector(".generated-img").src = imageUrl;
  } catch (error) {
    hideSpinner();
    console.log(error);
  }
}

// Show spinner while waiting
function showSpinner() {
  document.querySelector(".generated-img").src = "assets/img/painting.gif";
}

// function reset() {
//   document.querySelector("#prompt").value = "";
//   document.querySelector(".generated-img").src =
//     "./assets/img/placeholder-img.png";
// }

// Listen for form submit
document
  .querySelector(".prompt-size-form")
  .addEventListener("submit", onSubmit);
