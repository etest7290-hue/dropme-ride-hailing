'use client';

import DashboardStats from '@/components/DashboardStats';
import RevenueChart from '@/components/RevenueChart';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="space-y-6">
        <DashboardStats />
        <RevenueChart />
      </div>
    </div>
  );
}
