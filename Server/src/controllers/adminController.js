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
export { adminLogin, usersList, transactionsList }