const User = require('../models/User')
const Post = require('../models/Post')


//Post, post info 

const createPost = async (req, res) =>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

//Get, get post info 

const getPost = async (req, res) =>{
    try {
      
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

//Put, update post info 

const updatePost = async (req, res) =>{

        try {
     

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
  
}

//Delete, delete post info 

const deletePost = async (req, res) =>{

        try {

          
        } catch (error) {

            console.log(error)

            return res.status(500).send({ message: error });
        }

}




module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost
}