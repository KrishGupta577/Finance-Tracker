import React from 'react'
import "./Features.css"
import {
    PieChart,
    LineChart,
    Wallet,
    Bell,
    Target,
    TrendingUp,
    Shield,
    Clock,
    Smartphone,
} from 'lucide-react';


const Features = () => {

    const features = [
        {
            icon: <PieChart color='blue' />,
            title: "Advanced Analytics",
            description: "Visualize your spending patterns with interactive charts and detailed breakdowns of your expenses.",
        },
        {
            icon: <LineChart color='green' />,
            title: "Smart Budgeting",
            description: "Set and track budgets for different categories. Get intelligent suggestions to optimize your spending.",
        },
        {
            icon: <Wallet color='purple' />,
            title: "Expense Tracking",
            description: "Effortlessly track your daily expenses and income. Categorize transactions automatically.",
        },
        {
            icon: <Bell color='red' />,
            title: "Smart Alerts",
            description: "Get notifications for bill payments, unusual spending, and when you're approaching budget limits.",
        },
        {
            icon: <Target color='orange' />,
            title: "Financial Goals",
            description: "Set savings goals and track your progress. Get personalized recommendations to achieve them faster.",
        },
        {
            icon: <TrendingUp color='teal' />,
            title: "Investment Tracking",
            description: "Monitor your investments and analyze their performance with detailed insights and reports.",
        },
        {
            icon: <Shield color='indigo' />,
            title: "Secure & Private",
            description: "Bank-grade security ensures your financial data is always protected and private.",
        },
        {
            icon: <Clock color='pink' />,
            title: "Real-time Updates",
            description: "Stay up-to-date with real-time transaction tracking and instant balance updates.",
        },
        {
            icon: <Smartphone className="icon cyan" />,
            title: "Mobile Friendly",
            description: "Access your finances on the go with our responsive mobile design and native apps.",
        }
    ];

    return (
        <div className='features' id='features'>
            <div className='features-heading'>
                <h1>Powerful Features for Your Financial Success</h1>
                <p>Take control of your finances with our comprehensive suite of tools and features</p>
            </div>

            <div className="features-cards">
                {features.map((feature, index) => (
                    <div key={index} className="features-card">
                        <div className='feature-card-icon'>
                            {feature.icon}
                        </div>
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features