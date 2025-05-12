import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import validator from 'validator'
import { mailSender } from "../utils/myMailer.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const exist = await userModel.findOne({ email })

        if (exist) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be of atleast 8 characters" })
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            login_type: "email",
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        mailSender(email, name)
        res.json({ success: true, message: "User registered.", token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await userModel.findOne({ email: username })

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exists." })
        }

        if (user.login_type === "google") {
            return res.json({ success: false, message: "User is registered using Google" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Email or Password is Incorrect' })
        }

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const userGoogleLogin = async (req, res) => {
    try {
        const { email, name, sub, picture } = req.body

        const exists = await userModel.findOne({ email })

        if (exists) {
            if (exists.login_type === "email") {
                return res.json({ success: false, message: "User is registered using Email" })
            }
            const token = createToken(exists._id)
            return res.json({ success: true, message: "Welcome Back", token, returnUser: true })
        }

        const newUser = new userModel({
            name: name,
            email: email,
            google_id: sub,
            login_type: "google",
            profile_picture_url: picture,
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        mailSender(email, name)
        res.json({ success: true, message: "User registered.", token, returnUser: false })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const userDelete = async (req, res) => {
    try {
        const { userId, id } = req.body
        const user = await userModel.findByIdAndDelete(id)

        if (!user) {
            return res.json({ success: false, message: 'User not found.' })
        }

        res.json({ success: true, message: 'User Deleted.' })

    } catch (error) {
        console.log(error)
    }
}

const changeTheme = async (req, res) => {
    const { userId, theme } = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { 'preferences.theme': theme },
            { new: true }
        );
        res.json({ success: true, message: 'Preferences updated', preferences: user.preferences });

    } catch (error) {
        res.json({ error: 'Failed to update preferences' });
        console.log(error)
    }
}

const profileUpdate = async (req, res) => {

    const { userId, name, monthly_income } = req.body

    try {

        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                monthly_income: monthly_income
            },
            { new: true }
        );

        if (!user) {
            return res.json({ success: false, message: 'Profile not Updated' })
        }

        res.json({ success: true, message: 'Profile Updated' })


    } catch (error) {
        return res.json({ success: false, message: 'Error' })
    }
}

const changePassword = async (req, res) => {

    const { userId, currentPassword, newPassword } = req.body
    try {
        const user = await userModel.findById(userId)

        if (user.login_type == 'google') {
            return res.json({ success: false, message: 'Cannot change Password as User Is logged in using Google.' })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)
        const newPassMatch = await bcrypt.compare(newPassword, user.password)

        console.log(newPassMatch)

        if (!isMatch) {
            return res.json({ success: false, message: 'Current Password is Incorrect' })
        }

        if (newPassMatch) {
            return res.json({ success: false, message: 'New password must be different from the current password' })
        }

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newPassword, salt)

        user.password = password
        user.save()

        res.json({ success: true, message: 'Password Changed.' })

    } catch (error) {
        console.log(error)
    }
}

export { registerUser, userLogin, userGoogleLogin, userDelete, changeTheme, profileUpdate, changePassword }