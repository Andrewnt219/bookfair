import { nanoid } from "nanoid";
import { ReactNode } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { getErrorMessage } from "../utils";

export interface Toast {
  id: string;
  message: ReactNode;
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light";
}

export interface ToastStore {
  toasts: Toast[];
  enqueue(toast: Omit<Toast, "id">): void;
  dequeue(toastId: string): void;
  success(message: Toast["message"]): void;
  error(error: unknown): void;
}

export const useToastStore = create(
  devtools<ToastStore>((set, get) => ({
    toasts: [],
    enqueue(newToast) {
      const toastId = nanoid();
      set((state) => ({
        toasts: state.toasts.concat({ ...newToast, id: toastId }),
      }));
    },
    dequeue(toastId) {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== toastId),
      }));
    },
    success(message) {
      get().enqueue({ message, variant: "success" });
    },
    error(error) {
      get().enqueue({ message: getErrorMessage(error), variant: "danger" });
    },
  }))
);
