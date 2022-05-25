import { User } from 'firebase/auth';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AuthUserStore {
  authUser: User | null;
  setAuthUser(authUser: User): void;
  unsetAuthUser(): void;
}

export const useAuthUserStore = create(
  devtools<AuthUserStore>((set) => ({
    authUser: null,
    setAuthUser(authUser: User) {
      set({ authUser });
    },
    unsetAuthUser() {
      set({ authUser: null });
    },
  }))
);
