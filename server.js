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


app.get("/api/workouts", (req, res) => {
    db.Workout.find().then(function(data) {
        console.log(data)
        res.json(data)
    })
});

app.get("/api/workouts/range", (req, res) => {
        db.Workout.find().then(function(data) {
            console.log(data)
            res.json(data)
        })
    });

  
    
    app.put("/api/workouts/:id" , function (req, res) {
        db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true })
            .then(function (records) {
                res.json(records)
            })
            .catch(error=>{
                res.json(error)
            });
    });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
});