import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'

const tokenMaker = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const exist = await adminModel.findOne({ email })

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be of atleast 8 characters" })
        }

        if (!exist) {
            return res.json({ success: false, message: "Wrong Credentials." })
        }

        const isMatch = await bcrypt.compare(password, exist.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Wrong Credentials.' })
        }

        const token = tokenMaker(exist._id)
        res.json({ success: true, message: "Welcome Admin.", token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error." })
    }
}

const usersList = async (req, res) => {
    try {
        const usersList = await userModel.find({}, "-password")

        res.json({ success: true, usersList })

    } catch (error) {
        console.log(error)
        res.json({ success: true, message: "Error" })
    }
}

const transactionsList = async (req, res) => {
    try {
        const transactionsList = await transactionModel.find()

        res.json({ success: true, transactionsList })

    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
}

const changeTheme = async (req, res) => {
    const { userId, theme } = req.body;
    
    try {
        const user = await adminModel.findByIdAndUpdate(
            userId,
            { 'preferences.theme': theme },
            { new: true }
        );
        res.json({ success: true, message: 'Preferences updated', preferences: user.preferences });

        console.log(user)
    } catch (error) {
        res.json({ error: 'Failed to update preferences' });
        console.log(error)
    }
}

const sendAdminInfo = async (req, res) => {
    try {
        const { userId } = req.body

        console.log(userId)

        const adminInfo = await adminModel.findOne({ _id: userId })

        if(!adminInfo){
            return res.json({ success: false, message: "Some error occured." })
        }

            res.json({ success: true, adminInfo })
       
    } catch (error) {
        res.json({ success: false, message: "Error." })
        console.log(error)
    }
}


export { adminLogin, usersList, transactionsList, changeTheme, sendAdminInfo }