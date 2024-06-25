const { uploadToCloudinary } = require("../../helpers/uploadCloudinary");

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = result;
  }
  next();
};

// B27 socketio 01
