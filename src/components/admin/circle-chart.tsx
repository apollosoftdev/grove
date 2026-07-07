"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Male', value: 4000, color: '#84d8a8' },
    { name: 'Female', value: 3000, color: '#ff9f7f' },
    { name: 'Kids', value: 2500, color: '#d8c384' },
];

export default function Circlechart(){
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Legend layout = "horizontal" verticalAlign='bottom' align='center'/>
            </PieChart>
        </ResponsiveContainer>
    );
}  
