const express = require("express");
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let tasks = [];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/addTask", (req, res) => {
    req.body.id = tasks.length + 1;
    req.body.startTime = req.body.startTime || null; 
    req.body.endTime = req.body.endTime || null;      
    tasks.push(req.body);
    res.redirect("/");
});

app.get("/deleteTask", (req, res) => {
    let updatedTasks = tasks.filter((item) => item.id != req.query.id);
    tasks = updatedTasks;
    res.redirect("/");
});

app.get("/editTask/:id", (req, res) => {
    let singleTask = tasks.find((item) => item.id == req.params.id);
    res.render("edit", { singleTask });
});

app.post("/updateTask", (req, res) => {
    tasks.forEach((task) => {
        if (task.id == req.body.id) {
            task.id = req.body.id;
            task.task = req.body.task;
            task.startTime = req.body.startTime;
            task.endTime = req.body.endTime;
        }
    });
    res.redirect("/");
});

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started on port " + port);
});
