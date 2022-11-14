document.addEventListener("DOMContentLoaded", function () {
  // const copyBtn = document.getElementById("copy-text-btn");
  const textToCopy = document.querySelector(".generated-atag");
  const copyPasteSvg = document.querySelector(".copy-paste-svg");
  const copyToClipBoardText = document.querySelector(".copied-to-clipboard");

  copyToClipBoard(copyPasteSvg, textToCopy, copyToClipBoardText);
  submitWhenFileSelected();
  copyPasteSvg.addEventListener("click", (e) =>
    addAnimClassToElement(e.target, "copy-paste-anim")
  );
});

function submitWhenFileSelected() {
  document.getElementById("form").onchange = function () {
    document.getElementById("form").submit();
  };
}

function copyToClipBoard(copyPasteSvg, textToCopy, copyToClipBoardText) {
  if (!textToCopy) return;
  copyPasteSvg.addEventListener("click", async (event) => {
    if (!navigator.clipboard) {
      console.log("Clipboard API not available");
      return;
    }
    const text = textToCopy?.textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyToClipBoardText.textContent = "Copied to clipboard";
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  });
}

function addAnimClassToElement(element, animClass) {
  element.classList.add(animClass);
  element.addEventListener("animationend", () => {
    element.classList.remove(animClass);
  });
}
