"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Electronic', sales: 4000 },
    { name: 'Soft', sales: 3000 },
    { name: 'Small', sales: 2500 },
    { name: 'Intelligent', sales: 5000 },
    { name: 'Small', sales: 4400 },
    { name: 'Fantastic', sales: 2400 },
    { name: 'Luxurious', sales: 5600 },
    { name: 'Handmade', sales: 3400 },
];

export default function SalesBarChart(){
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#84d8a8" />
            </BarChart>
        </ResponsiveContainer>
    );
}  
