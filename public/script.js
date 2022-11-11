document.addEventListener("DOMContentLoaded", function () {
  const copyBtn = document.getElementById("copy-text-btn");
  const textToCopy = document.querySelector(".generated-atag");
  copyToClipBoard(copyBtn, textToCopy);
  submitWhenFileSelected();
});

function submitWhenFileSelected() {
  document.getElementById("form").onchange = function () {
    document.getElementById("form").submit();
  };
}

function copyToClipBoard(copyBtn, textToCopy) {
  if (!textToCopy) return;
  copyBtn.addEventListener("click", async (event) => {
    if (!navigator.clipboard) {
      // Clipboard API not available
      return;
    }
    const text = textToCopy?.textContent;
    try {
      await navigator.clipboard.writeText(text);
      event.target.textContent = "Copied to clipboard";
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  });
}
