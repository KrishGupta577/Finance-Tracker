import React from 'react'
import "./Hero.css"
import { LineChart, Line,XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Hero = () => {

    const chartData = [
        { month: 'Jan', savings: 1500 },
        { month: 'Feb', savings: 2300 },
        { month: 'Mar', savings: 3200 },
        { month: 'Apr', savings: 4100 },
        { month: 'May', savings: 5000 },
      ];
      
    return (
        <div className='hero'>
            <div className='hero-left'>
                <h1>Take Control of Your Finances</h1>
                <p>Track expenses, analyze spending patterns, and achieve your financial goals with our powerful finance management platform.</p>
                <a>Get Started Free</a>
            </div>

            <div className="hero-right">
                <LineChart width={500} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="rgb(76, 175, 80)"
                        strokeWidth={2}
                    />
                </LineChart>
            </div>
        </div>
    )
}

export default Hero