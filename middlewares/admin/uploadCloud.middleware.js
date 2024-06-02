const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

// Cloudinary
(async function () {
  cloudinary.config({
    cloud_name: 'dy0m9udjz',
    api_key: '655763378773479',
    api_secret: '7CheewENHiovwVJtdW4ZJLBNoW8',
  });
})();
// End Cloudinary

module.exports.upload = (req, res, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.url;
      next();
    }

    upload(req);
  } else {
    next();
  }
};

// B27 socketio 01