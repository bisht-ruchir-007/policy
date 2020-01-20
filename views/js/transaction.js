function show_results() {
  document
    .getElementById("loading")
    .setAttribute("style", "display:inline;visibility:visible");
  document
    .getElementById("transaction")
    .setAttribute("style", "display:none;visibility:hidden");
  document.getElementById("device_ID").innerText = "Surveys : ";
  document
    .getElementById("all_transaction")
    .setAttribute("style", "display:inline;visibility:visible");
  var emailID = document.getElementById("display-email").innerText;
  const db = firebase.firestore();

  let surveysRef = db.collection("surveys");
  let query = surveysRef
    .get()
    .then(snapshot => {
      document
        .getElementById("loading")
        .setAttribute("style", "display:none;visibility:hidden");
      snapshot.forEach(doc => {
        // displying the surveys
        if (doc.data().total_rating > 20) {
          document.getElementById(
            "list"
          ).innerHTML += `<div class="row"><div class="col s12 m6 offset-m3">
      <div class="card #00e676 green accent-8">
        <div class="card-content white-text">
          <span class="card-title">
          <b>${doc.data().college_name}</b>
          </span>
          <p><b>Total Rating</b> : ${doc.data().total_rating} / 25 </p>
          <p><b> YEAR:</b>${doc.data().year}<br><br>
          <p><b> Location : Lat:</b>${doc.data().Lat}<br><br>
          <p><b> Long:</b>${doc.data().Long}<br><br>
          <button
          class="btn-flat waves-effect waves-red"
          data-toggle="modal" 
          data-target="#myModal"
          id="data"
          onclick="{Show_Data(${doc.data().total_rating},[${
            doc.data().rating1
          },${doc.data().rating2},
            ${doc.data().rating3},${doc.data().rating4},${doc.data().rating5}])}
          "
          >
          SHOW DATA
        </button>
          </div>
        </div>
      </div>
    </div>`;
        } else if (doc.data().total_rating > 10) {
          document.getElementById(
            "list"
          ).innerHTML += `<div class="row"><div class="col s12 m6 offset-m3">
      <div class="card #00e676 orange accent-8">
        <div class="card-content white-text">
          <span class="card-title">
          <b>${doc.data().college_name}</b>
          </span>
          <p><b>Total Rating</b> : ${doc.data().total_rating} / 25 </p>
          <p><b> YEAR:</b>${doc.data().year}<br><br>
          <p><b> Location : Lat:</b>${doc.data().Lat}<br><br>
          <p><b> Long:</b>${doc.data().Long}<br><br>
          <button
          class="btn-flat waves-effect waves-red"
          data-toggle="modal" 
          data-target="#myModal"
          id="data"
          onclick="{Show_Data(${doc.data().total_rating},[${
            doc.data().rating1
          },${doc.data().rating2},
            ${doc.data().rating3},${doc.data().rating4},${doc.data().rating5}])}
          "
          >
          SHOW DATA
        </button>
          </div>
        </div>
      </div>
    </div>`;
        } else {
          document.getElementById(
            "list"
          ).innerHTML += `<div class="row"><div class="col s12 m6 offset-m3">
      <div class="card #00e676 red accent-8">
        <div class="card-content white-text">
          <span class="card-title">
          <b>${doc.data().college_name}</b>
          </span>
          <p><b>Total Rating</b> : ${doc.data().total_rating} / 25 </p>
          <p><b> YEAR:</b>${doc.data().year}<br><br>
          <p><b> Location : Lat:</b>${doc.data().Lat}<br><br>
          <p><b> Long:</b>${doc.data().Long}<br><br>
          <button
          class="btn-flat waves-effect waves-red"
          data-toggle="modal" 
          data-target="#myModal"
          id="data"
          onclick="{Show_Data(${doc.data().total_rating},[${
            doc.data().rating1
          },${doc.data().rating2},
            ${doc.data().rating3},${doc.data().rating4},${doc.data().rating5}])}
          "
          >
          SHOW DATA
        </button>
          </div>
        </div>
      </div>
    </div>`;
        }
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

function Show_Data(total_rating, rating) {
  var xValue = ["Ques1", "Ques2", "Ques3", "Ques4", "Ques5"];
  var yValue = rating;
  var trace1 = {
    x: xValue,
    y: yValue,
    type: "bar",
    text: yValue.map(String),
    textposition: "auto",
    marker: {
      color: "blue accent-8",
      line: {
        color: "rgb(8,48,107)",
        width: 0.5
      }
    }
  };
  var data = [trace1];
  var layout = {
    title: "Survey Report",
    barmode: "stack"
  };

  Plotly.newPlot("myDiv", data, layout);

  document.getElementById("total_score").innerText =
    "Total Rating : " + total_rating + " / 25";
  document.getElementById("ratingTab1").innerText =
    "The Lecturer or faculty was well-prepared ? Rating :" + rating[0];
  document.getElementById("ratingTab2").innerText =
    "The Lecturer or faculty was effective in leading the class ? Rating :" +
    rating[1];
  document.getElementById("ratingTab3").innerText =
    "The Lecturer or faculty was good at explaining things ? Rating :" +
    rating[2];
  document.getElementById("ratingTab4").innerText =
    "The Lecturer or faculty gave interesting and informative classes ? Rating :" +
    rating[3];
  document.getElementById("ratingTab5").innerText =
    "The Lecturer or faculty was addressing the doubts effectively ? Rating :" +
    rating[4];
}
