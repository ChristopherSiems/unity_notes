document.addEventListener("DOMContentLoaded", () => {
  const noteBox = document.getElementById("noteBox");
  const postButton = document.getElementById("postButton");
  const highlightedHeader = document.getElementById("highlightedText");

  // Get the highlighted text from URL query parameter
  const params = new URLSearchParams(window.location.search);
  const highlightedText = params.get("text") || "No selection";
  highlightedHeader.textContent = highlightedText;

  postButton.addEventListener("click", () => {
    const userText = noteBox.value.trim();

    // Remove input UI
    noteBox.remove();
    postButton.remove();

    // Create message element
    const message = document.createElement("div");
    message.style.fontFamily = "Arial, sans-serif";
    message.style.padding = "10px";
    message.style.textAlign = "center";
    document.body.appendChild(message);

    if (!userText) {
      message.textContent = "Please enter some text before posting.";
    } else {
      message.textContent = `Posted successfully: ${userText}`;
    }
  });
});
