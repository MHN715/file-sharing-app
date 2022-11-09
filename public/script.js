document.addEventListener("DOMContentLoaded", function () {
  submitWhenFileSelected();

  const testClass = document.querySelector(".testClass");
  const linksResults = document.querySelector(".links-results");

  //   console.log(testClass?.textContent);

  let testObject = {};

  let testClassText = testClass?.textContent;

  console.log(testClassText);

  testObject.link = testClassText;

  console.log(testObject);

  //   const form = document.querySelector("form"),
  //     fileInput = document.querySelector(".file-input"),
  //     progressArea = document.querySelector(".progress-area"),
  //     uploadedArea = document.querySelector(".uploaded-area");

  //   form.addEventListener("click", (e) => {
  //     console.log(e);
  //     fileInput.click();
  //   });

  //   fileInput.onchange = ({ target }) => {
  //     let file = target.files[0];
  //     if (file) {
  //       let fileName = file.name;
  //       console.log(file);
  //       console.log(fileName);
  //     }
  //   };
});

function submitWhenFileSelected() {
  document.getElementById("form").onchange = function () {
    document.getElementById("form").submit();
  };
}
