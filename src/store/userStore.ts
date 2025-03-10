import { create } from 'zustand';
import { User, UserRole } from '../types/user';

interface UserState {
  user: User | null;
  role: UserRole;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  role: 'guest',
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  logout: () => set({ user: null, role: 'guest' }),
})); 