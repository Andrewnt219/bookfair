import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import { Variant } from 'react-bootstrap/esm/types';
import { useSelector } from 'react-redux';
import { getErrorMessage } from '../utils';
import { RootState } from './store';

export interface Toast {
  id: string;
  message: ReactNode;
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  initialState,
  name: 'toast',
  reducers: {
    enqueue(state, { payload }: PayloadAction<Omit<Toast, 'id'>>) {
      const toast: Toast = { ...payload, id: nanoid() };
      state.toasts.push(toast);
    },
    dequeue(state, { payload }: PayloadAction<{ id: string }>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== payload.id);
    },
    success(state, { payload }: PayloadAction<Pick<Toast, 'message'>>) {
      const toast: Toast = { ...payload, id: nanoid(), variant: 'success' };
      state.toasts.push(toast);
    },
    error(state, { payload }: PayloadAction<{ error: unknown }>) {
      const toast: Toast = {
        message: getErrorMessage(payload.error),
        id: nanoid(),
        variant: 'danger',
      };
      state.toasts.push(toast);
    },
  },
});

export const useToastSlice = () =>
  useSelector((state: RootState) => state.toast);

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
