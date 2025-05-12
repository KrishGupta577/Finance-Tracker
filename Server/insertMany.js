import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.DB_CONNECTION_STRING; // Replace with your MongoDB Atlas URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const transactions = [
    // January Transactions
    { userId: "67dcff28660f49681fe60a66", amount: 1500, category: "income", comment: "Salary for January", date: new Date("2024-01-05") },
    { userId: "67dcff28660f49681fe60a66", amount: 500, category: "expense", expense_category: "Food", comment: "Groceries shopping", date: new Date("2024-01-07") },
    { userId: "67dcff28660f49681fe60a66", amount: 300, category: "expense", expense_category: "Entertainment", comment: "Movie night", date: new Date("2024-01-10") },
    { userId: "67dcff28660f49681fe60a66", amount: 120, category: "expense", expense_category: "Transportation", comment: "Fuel refill", date: new Date("2024-01-12") },
    { userId: "67dcff28660f49681fe60a66", amount: 200, category: "expense", expense_category: "Shopping", comment: "Bought new shoes", date: new Date("2024-01-15") },
    { userId: "67dcff28660f49681fe60a66", amount: 1800, category: "income", comment: "Freelance payment", date: new Date("2024-01-20") },
    { userId: "67dcff28660f49681fe60a66", amount: 400, category: "expense", expense_category: "Bills", comment: "Electricity bill", date: new Date("2024-01-25") },
    { userId: "67dcff28660f49681fe60a66", amount: 600, category: "expense", expense_category: "Healthcare", comment: "Doctor consultation", date: new Date("2024-01-28") },

    // February Transactions
    { userId: "67dcff28660f49681fe60a66", amount: 1500, category: "income", comment: "Salary for February", date: new Date("2024-02-05") },
    { userId: "67dcff28660f49681fe60a66", amount: 450, category: "expense", expense_category: "Education", comment: "Online course fee", date: new Date("2024-02-07") },
    { userId: "67dcff28660f49681fe60a66", amount: 300, category: "expense", expense_category: "Food", comment: "Dining out", date: new Date("2024-02-10") },
    { userId: "67dcff28660f49681fe60a66", amount: 120, category: "expense", expense_category: "Transportation", comment: "Bus fare", date: new Date("2024-02-12") },
    { userId: "67dcff28660f49681fe60a66", amount: 220, category: "expense", expense_category: "Shopping", comment: "Bought clothes", date: new Date("2024-02-15") },
    { userId: "67dcff28660f49681fe60a66", amount: 400, category: "expense", expense_category: "Bills", comment: "Internet bill", date: new Date("2024-02-20") },
    { userId: "67dcff28660f49681fe60a66", amount: 250, category: "expense", expense_category: "Entertainment", comment: "Concert ticket", date: new Date("2024-02-22") },
    { userId: "67dcff28660f49681fe60a66", amount: 550, category: "expense", expense_category: "Healthcare", comment: "Medication purchase", date: new Date("2024-02-25") },
    { userId: "67dcff28660f49681fe60a66", amount: 1600, category: "income", comment: "Freelance project payment", date: new Date("2024-02-28") },

    // March Transactions
    { userId: "67dcff28660f49681fe60a66", amount: 1700, category: "income", comment: "Salary for March", date: new Date("2024-03-05") },
    { userId: "67dcff28660f49681fe60a66", amount: 700, category: "expense", expense_category: "Food", comment: "Monthly groceries", date: new Date("2024-03-07") },
    { userId: "67dcff28660f49681fe60a66", amount: 350, category: "expense", expense_category: "Transportation", comment: "Taxi fare", date: new Date("2024-03-10") },

    // More transactions added similarly for April, May, and June...
];

// Adding more transactions for April, May, and June to make it 40
for (let i = transactions.length; i < 40; i++) {
    transactions.push({
        userId: "67dcff28660f49681fe60a66",
        amount: Math.floor(Math.random() * 1000) + 100, // Random amount between 100-1100
        category: i % 5 === 0 ? "income" : "expense",
        expense_category: i % 5 === 0 ? undefined : ["Entertainment", "Food", "Transportation", "Shopping", "Bills", "Healthcare", "Education", "Other"][Math.floor(Math.random() * 8)],
        comment: i % 5 === 0 ? "Freelance work" : "Random expense",
        date: new Date(`2024-${Math.floor(i / 7) + 4}-${Math.floor(Math.random() * 27) + 1}`)
    });
}

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true, enum: ["expense", "income"] },
    comment: { type: String, default: "" },
    expense_category: { type: String, required: function () { return this.category === "expense"; } },
    date: { type: Date }
});

const Transaction = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)


Transaction.insertMany(transactions)
    .then(() => {
        console.log("Transactions inserted successfully!");
        mongoose.connection.close(); // Close connection after inserting
    })
    .catch(err => console.error("Error inserting transactions:", err));
