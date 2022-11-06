require("dotenv").config()
const multer = require("multer")
const path = require("path");

const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
})

const upload = multer({ storage: storage })

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index")
})


app.post("/upload", upload.single("file"), async (req, res) => {
  
  res.render("index", { fileLink: `${req.headers.origin}/file/${req.file.filename}` })
})

app.route("/file/:id").get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {

  // console.log(req.params.id)
  // console.log(req)
  // console.log("test")
  // console.log(extension)

  res.download(__dirname + `/uploads/${req.params.id}`, req.params.id)

}

app.listen(process.env.PORT)
