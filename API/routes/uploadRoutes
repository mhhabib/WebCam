const express = require('express')
const uploadController=require('../controllers/uploadControllers')
const router=express.Router()

// GET /get all files
router.get('/getfiles', uploadController.getFiles);

// POST /create new file
router.post('/upload', uploadController.createNewFile);
module.exports = router