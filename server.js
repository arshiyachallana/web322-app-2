/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Arshiya challana Student ID: 154101216 Date: 05/02/2023
*
*  Cyclic Web App URL: https://sore-plum-centipede-hat.cyclic.app
*
*  GitHub Repository URL: https://github.com/arshiyachallana/web322-app-2
*
********************************************************************************/
var HTTP_PORT = 8080;
var express = require("express");
var app = express();
const path = require('path');
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
const BlogSerice = require("./blog-service")
const BS = new BlogSerice()
const multer = require("multer");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');
cloudinary.config({
    cloud_name: 'dnpqw4rc3',
    api_key: '925691855222693',
    api_secret: 'iynHOELGePi9_kx-T_PivaOKKVo',
    secure: true
});
const upload = multer()
router.get("/", (req, res) => {
    res.redirect("/about");
});
router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/about.html'));
});
router.get("/blog", (req, res) => {
    BS.getPublishedPosts().then((data) => {
        res.json({ data: data });
    }).catch((err) => {
        res.send({ message: err?.message });
    });
});
router.get("/posts", (req, res) => {
    BS.getAllPosts().then((data) => {
        res.json({ data: data });
    }).catch((err) => {
        res.send({ message: err?.message });
    });
});
router.get("/categories", (req, res) => {
    BS.getCategories().then((data) => {
        res.json({ data: data });
    }).catch((err) => {
        res.send({ message: err?.message });
    });
});
router.get("/posts/add", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/addPost.html'));
});
router.post('/posts/add', upload.single('featureImage'), function (req, res, next) {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            return result;
        }

        upload(req).then((uploaded) => {
            processPost(uploaded.url);
        });
    } else {
        processPost("");
    }

    function processPost(imageUrl) {
        req.body.featureImage = imageUrl;
        BS.addPost(req.body).then((data) => {
            res.redirect("/posts");
        }).catch((err) => {
            res.send({ message: err?.message });
        });
    }
});
BS.initialize().then(() => {
    app.use('/', router);
    app.listen(HTTP_PORT);
    app.all('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/views/404Error.html'));
    });
}).catch((err) => {
    console.log("err", err);
    res.sendFile(path.join(__dirname + '/views/404Error.html'));
})

