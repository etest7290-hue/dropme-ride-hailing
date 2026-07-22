'use client';

import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useAuthStore } from '@/store';

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 right-0 left-64 h-16 flex items-center justify-between px-6 z-40">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-600 hover:text-gray-900">
          <FiBell className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <FiUser className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.email || 'Admin'}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
