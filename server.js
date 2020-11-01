const mongoose = require("mongoose");
const express = require('express');
const logger = require("morgan");
const path = require("path");
const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require("./models")


//routes for pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});


// fetches


app.get("/api/workouts", (req, res) => {
    db.Workout.find().then(function(data) {
        console.log(data)
        res.json(data)
    })
})

app.get("/api/workouts/range", (req, res) => {
        db.Workout.find().then(function(data) {
            console.log(data)
            res.json(data)
        })
    })

    //add workout
    // app.post("/api/workouts/", (req, res) => {
    //     db.Workout.find(req.params.id, { $push: { id: req.body } }, { new: true }).then((data) {
    //         res.json(data)
    //     })
    // })


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
});