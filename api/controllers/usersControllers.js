const User = require('../models/User')
const Post = require('../models/Post')


//Put, update user info 

const updateUser = async (req, res) =>{
  
      if(req.body.userId === req.params.id) {
        if(req.body.password) {
            req.body.password = await User.encryptPassword(req.body.password)
        }
        try {
            const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, {
                new: true, 
            })

            res.status(200).json(updatedUser)

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
      } else {
        res.status(401).json({message: "You can only update your account"})
      }
 
}

//Delete, delete user info 

const deleteUser = async (req, res) =>{
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (error) {
                console.log(error)
                return res.status(500).send({ message: error });
        } 
        }catch (error) {
            return res.status(404).json({ message: "User not found"});
         }
      } else {
        res.status(401).json({message: "You can only delete your account"})
      }
 
}


//Get, get user info 

const getUser = async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!!user) {
            const{password, ...others} = user._doc
            res.status(200).json(others)
        } else {
            res.status(404).json({message: "User not foud"})
        }
       
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser
}