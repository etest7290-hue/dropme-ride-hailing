'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUsers, FiTruck, FiMap, FiDollarSign, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '@/store';

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', href: '/dashboard' },
    { icon: FiUsers, label: 'Drivers', href: '/dashboard/drivers' },
    { icon: FiUsers, label: 'Riders', href: '/dashboard/riders' },
    { icon: FiMap, label: 'Rides', href: '/dashboard/rides' },
    { icon: FiDollarSign, label: 'Payments', href: '/dashboard/payments' },
    { icon: FiSettings, label: 'Pricing', href: '/dashboard/pricing' },
    { icon: FiSettings, label: 'Support', href: '/dashboard/support' },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold">DropMe</h1>
        <p className="text-blue-200 text-sm">Admin Panel</p>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-blue-700 border-r-4 border-white'
                  : 'hover:bg-blue-800'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-blue-700 p-4">
        <button
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className="flex items-center w-full px-4 py-2 text-sm hover:bg-blue-800 rounded transition-colors"
        >
          <FiLogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
