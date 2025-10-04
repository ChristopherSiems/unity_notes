document.addEventListener("DOMContentLoaded", () => {
  const noteBox = document.getElementById("noteBox");
  const postButton = document.getElementById("postButton");
  const highlightedHeader = document.getElementById("highlightedText");

  // Get highlighted text from URL query
  const params = new URLSearchParams(window.location.search);
  const highlightedText = params.get("text") || "No selection";
  highlightedHeader.textContent = highlightedText;

  postButton.addEventListener("click", async () => {
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
      return;
    }

    message.textContent = "Sending to backend...";

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note: userText,          // user input
          statement: highlightedText  // highlighted text
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post note");
      }

      const data = await response.json();
      message.textContent = `Posted successfully: ${data.note}`;
      console.log("Backend response:", data);

    } catch (err) {
      console.error(err);
      message.textContent = `Failed to send note: ${err.message}`;
    }
  });
});
