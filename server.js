require("dotenv").config();
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload"); // Express framework middleware
const express = require("express");
const port = 3005;

const app = express();
var zip = require("express-zip");
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true, // enabling "express-fileupload middleware". createParentPath will let express-fileupload create the dir path for "mv" method when said dir doesn't exist
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  setTimeout(removeFolder, 3600000);
  res.render("index");
});

// remove uploads folder on timeout (1 hour)
function removeFolder() {
  const dir = path.join(__dirname, "uploads");
  fs.rmdir(dir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log(`"${dir}" is deleted!`);
  });
}

app.use(express.static(__dirname + "/public")); // for style.css
app.use("/public", express.static("public")); // for script.js

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
  // console.log(file.length);

  // file.forEach((item) => {
  //   console.log(item);
  // });

  if (file.length === undefined) {
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
  }
  // for multiple files, not working yet
  else {
    const randomFolderName = randomizeString("abcdefg1234567") + "-multiple";

    file.forEach((item) => {
      item.mv(
        __dirname + "/uploads/" + `/${randomFolderName}/` + item.name,
        (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        }
      );
    });

    let currentDirOfMultipleFiles = "example_dir";

    console.log(randomFolderName);
    let filenames = fs.readdirSync(
      __dirname + "/uploads/" + `/${randomFolderName}`
    );

    console.log("filenames in directory:");
    filenames.forEach((file) => {
      console.log("File:", file);
    });

    return res.render("index", {
      fileLink: `${req.headers.origin}/uploads/${randomFolderName}`,
    });
  }
});

app.route("/uploads/:folder/:file").get(handleDownload).post(handleDownload);

// app
//   .route("/uploads/:folder")
//   .get(handleDownloadFolder)
//   .post(handleDownloadFolder);

// async function handleDownloadFolder(req, res) {
//   console.log(req.params);
//   // download zipped folder of files  (express-zip)
//   res.zip([{ path: `./uploads/${req.params.folder}`, name: "files" }]);
// }

async function handleDownload(req, res) {
  console.log(
    "File requested:",
    "/" + req.params.folder + "/" + req.params.file
  );
  res.download(__dirname + `/uploads/${req.params.folder}/${req.params.file}`);
}

app.listen(process.env.PORT || port, () =>
  console.log(`listening at http://localhost:${port}`)
);
