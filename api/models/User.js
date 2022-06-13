const bcrypt = require("bcryptjs")
const { mongoose, trusted } = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: trusted
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {
    timestamps: true
})

UserSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
 }
 
UserSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword)
 }
 


module.exports = mongoose.model("User", UserSchema)