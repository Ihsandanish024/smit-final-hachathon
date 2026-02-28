const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

exports.createPost = async (req, res) => {
  let imageUrl = "";

  if (req.file) {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "hackathon-posts" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "Upload failed" });

        imageUrl = result.secure_url;

        const post = await Post.create({
          title: req.body.title,
          content: req.body.content,
          image: imageUrl,
          user: req.user.id,
        });

        res.json(post);
      }
    );

    result.end(req.file.buffer);
  }
};