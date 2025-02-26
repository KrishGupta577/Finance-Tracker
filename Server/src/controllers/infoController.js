import userModel from "../models/userModel.js"

const sendInfo = async (req, res) => {
    try {
        const { userId } = req.body

        const userInfo = await userModel.findOne({ _id: userId })

        if (userInfo)
            res.json({ success: true, userInfo })
        else
            res.json({ success: false, message: "Some error occured." })
    } catch (error) {
        res.json({ success: false, message: "Error." })
        console.log(error)
    }
}

const getInfo = async (req, res) => {
    try {
        const { userId,name,username,phone,monthlyIncome } = req.body
       
        const user = await userModel.findByIdAndUpdate(
            { _id: userId },
            {
                name:name,
                username:username,
                phone_number:phone,
                monthly_income:monthlyIncome
            }
        )
        if(user){
            return res.json({success:true,message:"User Info Updated"})
        }
        else{
            res.json({success:false,message:"Error occured"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { sendInfo, getInfo }