"use client";

import { ResponsiveContainer, Tooltip, Legend, RadialBarChart, RadialBar } from 'recharts';

const data = [
    { name: 'Total income', value: 4000, fill: '#84d8a8' },
    { name: 'Total expenses', value: 3000, fill: '#ff9f7f' },
    { name: 'Total profit', value: 2500, fill: '#d8c384' },
];

export default function ConcentricChart(){
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="90%"
                    barSize={15}
                    startAngle={180}
                    endAngle={-180}
                >
                <RadialBar background={{ fill: '#f0f0f0' }} dataKey="value" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Legend iconSize={10} layout = "horizontal" verticalAlign='bottom' align='center'/>
        </RadialBarChart>
    </ResponsiveContainer>
    );
}  
