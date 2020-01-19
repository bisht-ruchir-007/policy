const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: __dirname + "/public/uploads/images",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
  //   limits: { fileSize: 10 }
}).single("photo");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("HELLO");
});

// POST
app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      // res.render("index", { msg: err });
      res.json({ msg: err, result: "" });
    } else {
      if (req.file == undefined) {
        // res.render("index", { msg: "Error:No file Selected !!" });
        res.json({ msg: "Error:No file Selected !!", result: "" });
      } else {
        console.log(req.file);
        // res.render("index", {
        //   msg: "File Uploaded !!",
        //   file: `uploads/${req.file.filename}`
        // });
        res.json({ msg: "File Uploaded !!", result: "Crop type" });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log("Listening at " + PORT);
});
