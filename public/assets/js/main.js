function onSubmit(event) {
  event.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#image-size").value;
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
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
    console.log(error);
  }
}

document
  .querySelector(".prompt-size-form")
  .addEventListener("submit", onSubmit);
