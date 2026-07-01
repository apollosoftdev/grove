"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Product 1', sales: 4000 },
    { name: 'Product 2', sales: 3000 },
    { name: 'Product 3', sales: 2500 },
    { name: 'Product 4', sales: 5000 },
    { name: 'Product 5', sales: 4400 },
    { name: 'Product 6', sales: 2400 },
    { name: 'Product 7', sales: 5600 },
    { name: 'Product 8', sales: 3400 },
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
