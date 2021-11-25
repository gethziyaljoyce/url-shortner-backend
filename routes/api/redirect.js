const router = require("express").Router();

//Route GET /api/redirect/test
//Desc Test API end point
//access Public
router.get("/test", (req, res) => {
    res.json({ msg: "API is working" })
});

//route GET api/reditect
//headers hash
//desc Redirect user
//access Public
router.get("/",(req,res) => {
    const hash = req.headers.hash;
    URL.findOne({_id:hash})
    .then((doc) => {
        return res.json({ url: doc.url})
    })
    .catch((err) => {
        return res.status(400).json({ Error: "Sorry This link may have expired.."});
    })
});

module.exports = router;
