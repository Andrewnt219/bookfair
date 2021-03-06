import { getIdToken, User } from 'firebase/auth';
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  useDbUserQuery,
  UserProfile,
  UserProfileApi,
} from '../modules/user-profile';

export interface AuthUserStore {
  // null when logout, undefined on initial state
  authUser: User | null | undefined;
  setAuthUser(authUser: User): void;
  unsetAuthUser(): void;
}

export const useAuthUserStore = create(
  devtools<AuthUserStore>((set) => ({
    authUser: undefined,
    setAuthUser(authUser: User) {
      set({ authUser });
    },
    unsetAuthUser() {
      set({ authUser: null });
    },
  }))
);
