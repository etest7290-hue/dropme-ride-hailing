'use client';

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store';
import api from '@/lib/api';
import { FiUsers, FiTruck, FiMap, FiDollarSign } from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <Icon className="w-12 h-12 text-blue-500 opacity-20" />
    </div>
  </div>
);

export default function DashboardStats() {
  const dashboardData = useDashboardStore();
  const setDashboardData = useDashboardStore((state) => state.setDashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would fetch from your backend
        // const response = await api.get('/admin/dashboard');
        // setDashboardData(response.data);
        
        // Mock data for now
        setDashboardData({
          totalUsers: 1234,
          totalDrivers: 456,
          activeDrivers: 234,
          totalRides: 5678,
          completedRides: 5234,
          cancelledRides: 444,
          todayRevenue: 45000,
          weeklyRevenue: 280000,
          monthlyRevenue: 1200000,
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setDashboardData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={FiUsers} label="Total Users" value={dashboardData.totalUsers} />
      <StatCard icon={FiTruck} label="Total Drivers" value={dashboardData.totalDrivers} />
      <StatCard icon={FiMap} label="Total Rides" value={dashboardData.totalRides} />
      <StatCard icon={FiDollarSign} label="Today's Revenue" value={`Rs. ${dashboardData.todayRevenue}`} />
    </div>
  );
}
