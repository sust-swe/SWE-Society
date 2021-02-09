const catchAsync = require('../utils/catchAsync');
const formidabel = require("formidable");


exports.UpdateImage = catchAsync(async(req, res, next) => {
    let formData = {};
    let images = [];
    const prefixPath = "/../public/media/";
    let filePath = "public/media/";
    new formidabel.IncomingForm()
      .parse(req)
      .on("fileBegin", (image, file) => {
        const randPath = file.path.split("_")[1] + "." + file.type.split("/")[1];
        file.path = __dirname + prefixPath + randPath;
        images.push(randPath);
      })
      .on("file", (name, file) => {
        formData[name] = filePath;
  
      })
      .on('field', (fieldName, fieldValue) => {
        formData[fieldName] = fieldValue;
      })
      .once('end', () => {
        res.status(200).json({image: images});
      });
})
