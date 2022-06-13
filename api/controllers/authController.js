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

module.exports = {
    createUser
}