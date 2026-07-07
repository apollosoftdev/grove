"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const generateSignalData = () => {
    const signals = [
            { name: 'Jan', sales: 40, expense: 24 },
            { name: 'Feb', sales: 30, expense: 15 },
            { name: 'Mar', sales: 25, expense: 10 },
            { name: 'Apr', sales: 50, expense: 30 },
            { name: 'May', sales: 40, expense: 20 },
            { name: 'Jun', sales: 30, expense: 15 },
            { name: 'Jul', sales: 25, expense: 10 },
            { name: 'Aug', sales: 50, expense: 30 },
            { name: 'Sep', sales: 30, expense: 15 },
            { name: 'Oct', sales: 40, expense: 20 },
            { name: 'Nov', sales: 30, expense: 15 },
            { name: 'Dec', sales: 50, expense: 30 }
    ];
    const signal = [];
    for (let i = 0; i < 12; i++) {
        signal.push({
            name: signals[i].name ,
            sales: Math.floor(Math.random() * 100),
            expense: Math.floor(Math.random() * 100)    
        });
    }
    return signal;
}

const signalData = generateSignalData();

export default function SignalBarChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={signalData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="sales" stroke="#84d88a" />
                <Line dataKey="expense" stroke="#ff9f7f" />
            </LineChart>
        </ResponsiveContainer>
    );
}