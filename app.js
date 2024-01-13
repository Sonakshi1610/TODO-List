const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = [];
let workItems = [];
let redirect_button = "";

app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/daily", function (req, res) {
  redirect_button = "work";
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {listTitle: day, newListItems: items, OtherListName: redirect_button});

});

app.post("/daily", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  }
  else {
    items.push(item);
    res.redirect("/daily")
  }
});

app.get("/work", function (req, res) {

  redirect_button = "daily"

  res.render("list", {listTitle: "Work List", newListItems: workItems, OtherListName: redirect_button});
})

app.post("/work", function (req,res) {
  if (redirect_button === "daily") {
    res.redirect("/daily")
  } else {
    res.redirect("/work")
  }
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
})
