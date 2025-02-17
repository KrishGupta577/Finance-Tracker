import nodemailer from "nodemailer";

export const mailSender = (email,name) => {

    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SENDER_PASSWORD

        },
        tls: {
            rejectUnauthorized: false, // Disable certificate validation
        },
    });

    const receiver = {
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "Welcome to Finance Tracker!",
        text: `Dear ${name},

We’re thrilled to welcome you to Finance Tracker!

You’ve successfully signed in, and your financial journey has just begun. Whether you're looking to track your spending, plan your budget, or get a better understanding of your finances, Finance Tracker is here to help you stay on top of it all.

What’s Next?

    Explore your dashboard: Get a comprehensive overview of your financial activities.
    Set up your goals: Start budgeting, saving, and planning for your financial future.
    Track your expenses: Stay in control of your spending and see where your money is going.
    If you have any questions or need assistance, feel free to reach out to us at ${process.env.EMAIL_SENDER} or visit our Help Center.

Thank you for joining us, and we look forward to helping you manage your finances more effectively.

Best regards,
The Finance Tracker Team
${process.env.EMAIL_SENDER}`
    };

    auth.sendMail(receiver, (error, response) => {
        if (error) {
            console.log(error);
            
        }
        console.log('Email sent:', response.envelope);
    });
}

