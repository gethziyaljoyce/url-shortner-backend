//require
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//Load URL model
const URL = require("./model/url");


//initialize
const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());
//database key
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose.connect(db)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

//routes
const shorten = require("./routes/api/shorten");
app.use("/api/shorten",shorten);

const redirect = require("./routes/api/redirect");
app.use("/api/redirect",redirect);

app.get("/:hash", (req,res) => {
    const id = req.params.hash;
    URL.findOne({_id:id}, (err,doc) => {
        if(doc){
            console.log(doc.url);
            res.redirect("http://" + doc.url);
        }else{
            res.redirect("/");
        }
    })
})
//path
app.get("/",(req,res) => {
    res.send("Hello");
})
//port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
