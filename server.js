require("dotenv").config()
const multer = require("multer")

const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads" })

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})

let extension;

app.post("/upload", upload.single("file"), async (req, res) => {

  let extArray = req.file.mimetype.split("/");
  extension = extArray[extArray.length - 1];
  
  res.render("index", { fileLink: `${req.headers.origin}/file/${req.file.filename}` })
})

app.route("/file/:id").get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {

  // console.log(req.params.id)
  // console.log(req)
  // console.log("test")
  // console.log(extension)

  res.download(__dirname + `/uploads/${req.params.id}`, req.params.id + `.${extension}`)

}

app.listen(process.env.PORT)
