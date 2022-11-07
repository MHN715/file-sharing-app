require("dotenv").config();
const path = require("path");
const fileUpload = require("express-fileupload"); // Express framework middleware
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true, // enabling "express-fileupload middleware". createParentPath will let express-fileupload create the dir path for "mv" method when said dir doesn't exist
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.static(__dirname + "/public"));

let currentRandomFolderName;

function randomizeString(characters) {
  let result = "";
  charactersLength = characters.length;

  for (var i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  currentRandomFolderName = result;
  return result;
}

app.post("/uploads", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  console.log("File uploaded:", file);

  const uploaded_files_folder =
    __dirname +
    "/uploads/" +
    `/${randomizeString("abcdefg1234567")}/` +
    file.name;

  file.mv(uploaded_files_folder, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.render("index", {
      fileLink: `${req.headers.origin}/uploads/${currentRandomFolderName}/${file.name}`,
    });
  });
});

app.route("/uploads/:folder/:file").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  console.log(
    "File requested:",
    "/" + req.params.folder + "/" + req.params.file
  );
  res.download(__dirname + `/uploads/${req.params.folder}/${req.params.file}`);
}

app.listen(process.env.PORT);
