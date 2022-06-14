const User = require('../models/User')

//Post, register user

const createUser = async (req, res) =>{
    try {
        const {username, email, password, profilePic} = req.body
    
        const newUser = new User({
            username, 
            email,
            password: await User.encryptPassword(password)
        })
    
        const savedUser = await newUser.save()
        console.log(savedUser)

        res.status(201).json(savedUser)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

//Post, login user 

const loginUser = async (req, res) =>{
    try {
        const {username, email} = req.body

        const userFound = await User.findOne({username})

    if (!userFound) {
        return res.status(400).json({ message: "User Not Found" });
    }
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  
    if (!matchPassword) {
        return res.status(401).json({message: "Invalid Password"});
    }

    const {password, ...others} = userFound._doc

    res.status(200).json(others)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
    }
}

module.exports = {
    createUser,
    loginUser
}