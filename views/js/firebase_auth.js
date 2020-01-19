function checkIfLoggedIn() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document
        .getElementById("loading")
        .setAttribute("style", "display:inline;visibility:visible");
      // console.log(user);
      const db = firebase.firestore();

      let usersRef = db.collection("users");
      let query = usersRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().email == user.email) {
              document
                .getElementById("login-form")
                .setAttribute("style", "display:none;visibility:hidden");
              document
                .getElementById("loading")
                .setAttribute("style", "display:none;visibility:hidden");
              document
                .getElementById("logout-form")
                .setAttribute(
                  "style",
                  "display:inline-block;visibility:visible"
                );
              document
                .getElementById("transaction")
                .setAttribute(
                  "style",
                  "display:inline-block;visibility:visible"
                );
              document
                .getElementById("sign_out")
                .setAttribute(
                  "style",
                  "display:inline-block;visibility:visible"
                );
              document.getElementById("display-name").innerText =
                "Welcome " + doc.data().name + " !!";
              document.getElementById("display-email").innerText = user.email;
            }
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    } else {
      console.log("user not signed in");
      document.getElementById("display-email").innerText = "";
      document.getElementById("display-name").innerText = "";
      document
        .getElementById("loading")
        .setAttribute("style", "display:none;visibility:hidden");
      document
        .getElementById("login-form")
        .setAttribute("style", "display:inline-block;visibility:visible");
      document
        .getElementById("logout-form")
        .setAttribute("style", "display:none;visibility:hidden");
      document
        .getElementById("transaction")
        .setAttribute("style", "display:none;visibility:hidden");
      document.getElementById("device_ID").innerText = "";
      document.getElementById("list").innerHTML = "";
    }
  });
}

window.onload = function() {
  checkIfLoggedIn();
};

function SignInWithEmailAndPassword() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //console.log(email + " " + password);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(result) {
      //console.log(result);
      checkIfLoggedIn();
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function SignOutWithEmailAndPassword() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      checkIfLoggedIn();
    })
    .catch(function(error) {
      console.log(error);
    });
}
