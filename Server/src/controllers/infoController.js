import userModel from "../models/userModel.js"

const sendInfo = async (req, res) => {
    try {
        const { userId } = req.body

        const userInfo = await userModel.findOne({ _id: userId })

        if (userInfo)
            res.json({ success: true, userInfo })
        else
            res.json({success:false,message:"Some error occured."})
    } catch (error) {
        res.json({success:false,message:"Error."})
        console.log(error)
    }
}

export { sendInfo }