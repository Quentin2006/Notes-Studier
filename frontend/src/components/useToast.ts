import { useContext } from 'react';
import { ToastContext } from './ToastContext';
import type { ToastContextType } from './Toast';

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
