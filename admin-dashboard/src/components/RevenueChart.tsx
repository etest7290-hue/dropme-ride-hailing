'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', rides: 400, revenue: 2400 },
  { name: 'Feb', rides: 300, revenue: 1398 },
  { name: 'Mar', rides: 200, revenue: 9800 },
  { name: 'Apr', rides: 278, revenue: 3908 },
  { name: 'May', rides: 189, revenue: 4800 },
  { name: 'Jun', rides: 239, revenue: 3800 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Revenue & Rides Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#2563eb" name="Revenue (Rs)"/>
          <Line type="monotone" dataKey="rides" stroke="#10b981" name="Rides" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
