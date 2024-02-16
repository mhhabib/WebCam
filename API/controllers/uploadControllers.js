const Images=require('../models/imageModel');

// Creating new file and text analyze controller
exports.createNewFile = async(req, res, next)=>{
    if(!req.file){
        console.error("No image file provided")
        const error = new Error("No image file provided!");
        error.statusCode = 422;
        throw error;
    }
    const imageUrl=req.file.path
    console.log("File uploaded at this path: ", imageUrl)
    const imagefile = new Images({
        imageUrl: imageUrl
    });
    await imagefile
    .save()
    .then(async result => {
            res.status(201).json({
            message: 'New file created successfully!',
            imagefile: result
        });
        console.log("Successfully created new file and stored to database")
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            console.error(`Something went wrong! ${err}`)
        }
        next(err);
    });
}


// Fetching all created image files controller
exports.getFiles = async (req, res, next) => {
    try {
        const images = await Images.find();
        res.status(200).json({ message: 'Fetching all images files successful!', images });
        console.log("Fetching image files successfull")
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.error(err);
        next(err);
    }
};