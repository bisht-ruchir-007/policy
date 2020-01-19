var express = require("express");
var app = express();
var port = process.env.PORT || 4000;
var logger = require("morgan");
var bodyParser = require("body-parser");
const firebase = require("firebase");

// ejs - embedded JS
app.set("view engine", "ejs");
// for static files like css , js
app.use(express.static("views"));
app.use(express.json());

app.set("views", __dirname + "/views");
//give server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

const config = {
  apiKey: "AIzaSyC8uQu-VaVbp_HOu_0zvLX6KPILJ-trrck",
  authDomain: "smart-wallet-780f4.firebaseapp.com",
  databaseURL: "https://smart-wallet-780f4.firebaseio.com",
  projectId: "smart-wallet-780f4",
  storageBucket: "smart-wallet-780f4.appspot.com",
  messagingSenderId: "268049000672",
  appId: "1:268049000672:web:0d90ee853e685d845ec885"
};
const firebaseConfig = {
  apiKey: "AIzaSyBsKR_KrFnZeayH0RzwFKs2yQd3yDdNiDQ",
  authDomain: "survey-form-sih-2020.firebaseapp.com",
  databaseURL: "https://survey-form-sih-2020.firebaseio.com",
  projectId: "survey-form-sih-2020",
  storageBucket: "survey-form-sih-2020.appspot.com",
  messagingSenderId: "694874005037",
  appId: "1:694874005037:web:4387b6d6f739e8afa322a4",
  measurementId: "G-SYPEX3PSER"
};

firebase.initializeApp(firebaseConfig);

//Fetch instances
app.get("/", function(req, res) {
  console.log("HTTP Get Request");

  var userReference = firebase.database().ref("/TRANSACTION/");
  userReference.once(
    "value",
    function(snapshot) {
      res.render("home.ejs");
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});

app.listen(port, () => {
  console.log("Server started at port : " + port);
});
