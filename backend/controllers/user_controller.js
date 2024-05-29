const { generateToken } = require("../middleware/jwt")
const { User } = require("../models/models")

const registerUser = async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email

    let newUser = new User()

    newUser.name = name
    newUser.email = email
    newUser.setPassword(password)
    try{
        await newUser.save()
        res.status(201).json({message: "User registered successfully"})
    } catch(error)  {
        res.status(400).json({message: error})
    }

}

const getUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try{
        const user = await User.findOne({email: email})
        if(user == null){
            res.status(400).json({message: "User not found"})
        } else{
            if(user.validPassword(password)){
                const token = generateToken(user.id)
                res.status(200).json({user: user, token: token})
            }else{
                res.status(400).json({message: "Wrong Credentials"})
            }
        }
    } catch(error) {
        res.status(500).json({message: error})
    }
}

const deleteUser = async (req, res) => {
    const user_id = req.params.user_id
    try{
        const user = await User.deleteOne({_id: user_id})
        if(user)
            res.status(200).json({message: "User deleted successfully"})
        else
            res.status(400).json({message: "User not found"})
    }catch(error){
        res.status(500).json({message: "Server Error", error: error})
    }
}

module.exports = {
    registerUser, getUser, deleteUser
}