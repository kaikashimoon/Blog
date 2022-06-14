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
        const post = await Post.findById(req.params.id)
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

//Put, update post info 

const updatePost = async (req, res) =>{
        try {
            const post = await Post.findById(req.params.id)
             if(post.username === req.body.username){
                 const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
                    new: true
                })
                res.status(201).json(updatedPost)

             }else {
                res.status(401).json({message: "You can updated only your posts!"});
             }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
  
}

//Delete, delete post info 

const deletePost = async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
         if(post.username === req.body.username){
             await post.delete()
            res.status(201).json({message: 'Post has been deleted'})

         }else {
            res.status(401).json({message: "You can delete only your posts!"});
         }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }

}


//Get all posts 
const getAllPost = async (req, res) =>{
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts
        if(username){
            posts = await  Post.find({username: username})
        } else if(catName) {
            posts = await Post.find({categories: {
                $in:[catName]
            }})
        } else {
            posts = await Post.find()
        }
        
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}





module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPost
}