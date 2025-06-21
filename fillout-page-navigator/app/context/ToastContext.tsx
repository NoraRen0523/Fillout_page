import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = {
  content: ReactNode;
  bgColor?: string;  // e.g., "alert-success", "alert-error", or custom class
  textColor?: string; // e.g., "text-white", "text-black"
  duration?: number; // Auto-close time in milliseconds
};

type ToastContextType = {
  showToast: (config: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = ({
    content,
    bgColor = 'alert-success',
    textColor = 'text-white',
    duration = 3000
  }: ToastType) => {
    setToast({ content, bgColor, textColor });
    setIsVisible(true);
    
    // Auto-close
    setTimeout(() => setIsVisible(false), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container (fixed at top-right corner) */}
      <div className="toast toast-top toast-end z-50">
        {isVisible && toast && (
          <div className={`alert ${toast.bgColor} ${toast.textColor}`}>
            <span>{toast.content}</span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};