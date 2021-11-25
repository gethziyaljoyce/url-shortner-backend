const router = require("express").Router();
const uniqid = require("uniqid");

//Load models
const URL = require("../../model/url");

// router.use((req,res,next) => {
//     // res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })
//Route GET /api/shorten/test
//Desc Test API end point
//access Public
router.get("/test", (req, res) => {
    res.json({ msg: "API is working" })
});

//route POST /api/shorten
//Desc Post a URL tp shorten
//access Public
router.post("/", (req, res) => {
    //Did you get the req?
    console.log(req.body);
    if (req.body.url) {
        urlData = req.body.url;
    }
    console.log("URL is ", urlData);
    //Check whether the url is already exists
    URL.findOne({ url: urlData }, (err, doc) => {
        if (doc) {
            console.log("Entry found in db");
            // res.send({message:"Entry found in DB"});
        } else {
            console.log("This is New url");
            const webAddress = new URL({
                _id: uniqid(),
                url: urlData
            });
            webAddress.save((err) => {
                if (err) {
                    return console.log.error(err);
                }
                res.send({
                    url: urlData,
                    hash: webAddress._id,
                    status: 200,
                    statusTxt: "OK"
                })

            })
        }
    })
})
module.exports = router;