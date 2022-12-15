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
    hideSpinner();
  } catch (error) {
    hideSpinner();
    console.log(error);
  }
}

function showSpinner() {
  document.querySelector(".spinner-container").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner-container").classList.remove("show");
}

// function reset() {
//   document.querySelector("#prompt").value = "";
//   document.querySelector(".generated-img").src =
//     "./assets/img/placeholder-img.png";
// }

document
  .querySelector(".prompt-size-form")
  .addEventListener("submit", onSubmit);
