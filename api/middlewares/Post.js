const Post = require('../models/Post')

const checkDuplicateAndRequired = async (req, res, next) => {
    try {
    const { title, username, desc, } = req.body 
      const titlePost = await Post.findOne({ title: title });
      if (titlePost) {
        return res.status(400).json({ message: "This title already exists" });
      }
      if(!title || !username || !desc) {
          return  res.status(406).json({message: "This field is empty you must to provided info"})
     }
      next();
    } catch (error) {
      return res.status(500).json({ message: error });
    }
};

module.exports ={
    checkDuplicateAndRequired
}