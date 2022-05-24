import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export interface AuthUserState {
  authUser: UserCredential['user'] | null;
}

const initialState: AuthUserState = {
  authUser: null,
};

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser: (
      state,
      { payload }: PayloadAction<UserCredential['user']>
    ) => {
      state.authUser = payload;
    },
    unsetAuthUser: (state) => {
      state.authUser = null;
    },
  },
});

export const useAuthUserSlice = () => {
  return useSelector((state: RootState) => state.authUser);
};
export const authUserActions = authUserSlice.actions;

export default authUserSlice.reducer;
