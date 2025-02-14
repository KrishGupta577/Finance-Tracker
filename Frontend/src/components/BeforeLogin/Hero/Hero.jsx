import React, { useState, useEffect } from 'react'
import "./Hero.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Hero = ({setShowLogin}) => {
    const [chartWidth, setChartWidth] = useState(500);
    const [chartHeight, setChartHeight] = useState(300);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setChartWidth(window.innerWidth - 40); // Account for padding
                setChartHeight(250);
            } else {
                setChartWidth(500);
                setChartHeight(300);
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                <div onClick={() => setShowLogin(true)} className='navbar-right-getStarted'>Get Started</div>
            </div>

            <div className="hero-right">
                <LineChart width={chartWidth} height={chartHeight} data={chartData}>
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