import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: (token: string, user: any) =>
    set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));

interface DashboardState {
  totalUsers: number;
  totalDrivers: number;
  activeDrivers: number;
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  setDashboardData: (data: Partial<DashboardState>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalUsers: 0,
  totalDrivers: 0,
  activeDrivers: 0,
  totalRides: 0,
  completedRides: 0,
  cancelledRides: 0,
  todayRevenue: 0,
  weeklyRevenue: 0,
  monthlyRevenue: 0,
  setDashboardData: (data) => set(data),
}));
