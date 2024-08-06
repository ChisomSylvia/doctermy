import cloudinary from "../configs/cloudinary.config.js";

class FileController {
  async uploadFile(req, res) {
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      return res.status(200).send({
        success: true,
        imageUrl: image.secure_url
      })
    }
  }
}

export default new FileController();