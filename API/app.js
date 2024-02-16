require('dotenv').config()
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')
const multer = require('multer')
const app = express();
const apiroutes=require("./routes/uploadRoutes")

// Multer file upload handler
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');

    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true); // Allow upload for text/plain MIME type
    } else {
        cb(null, false); // Reject upload for other MIME types
    }
};

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Implement cors policy
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routing handler
app.use(apiroutes)


// DB connection and port controller
mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT);
        console.log("Database connection succesfull and port is running...")
    })
    .catch(err => console.error("port is not running"));