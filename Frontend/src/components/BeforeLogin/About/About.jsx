import React from 'react'
import "./About.css"
import { CheckCircle } from 'lucide-react';

const About = () => {

    const aboutInformation = [
        {
            title: "Easy Expense Tracking",
            description: "Record your daily transactions with just a few clicks. Categorize and organize your spending effortlessly.",
        },
        {
            title: "Smart Analytics",
            description: "Gain valuable insights through interactive charts and detailed reports. Understand your spending patterns better.",
        },
        {
            title: "Goal Setting",
            description: "Set and track financial goals with our intuitive tools. Stay motivated and achieve your savings targets.",
        }
    ]

    const aboutContent = [
        {
            title: "For Personal Use",
            desc: ['Track daily expenses and income', 'Set and monitor savings goals', 'Generate monthly budget reports']
        },
        {
            title: "For Business",
            desc: ['Manage business expenses', 'Track project budgets', 'Export detailed financial reports']
        }
    ]

    return (
        <div className='about' id='about'>
            <div className='about-heading'>
                <h1>Take Control of Your Financial Journey</h1>
                <p>Finance Tracker is your personal financial companion, helping you make smarter decisions about your money through intuitive tracking and powerful insights.</p>
            </div>
            <div className='about-cards'>
                {aboutInformation.map((info, index) => (
                    <div className='about-card' key={index}>
                        <CheckCircle color='var(--button-color)' />
                        <h3 className='about-card-title'>{info.title}</h3>
                        <div className='about-card-desc'>{info.description}</div>
                    </div>
                ))}
            </div>
            <div className='about-content'>
                <h1>Why Choose Finance Tracker?</h1>
                <div className='about-content-cards'>
                    {aboutContent.map((info, index) => (
                        <div className='about-content-card' key={index}>
                            <h2>{info.title}</h2>
                            {info.desc.map((i, index) => (
                                <div className='about-content-card-content' key={index}>
                                    <CheckCircle color='var(--button-color)' />
                                    <p>{i}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About