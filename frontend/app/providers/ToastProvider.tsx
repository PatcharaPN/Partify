"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";

type ToastType = "ALERT" | "SUCCESS" | "ERROR";

type ShowToastProps = {
  id?: number;
  title: string;
  message: string;
  type?: ToastType;
};

const TOAST_STYLE: Record<
  ToastType,
  {
    icon: string;
    color: string;
    className: string;
  }
> = {
  ALERT: {
    icon: "fluent-mdl2:alert-solid",
    color: "text-yellow-700",
    className:
      "bg-gradient-to-r from-yellow-50 to-yellow-100/40 border-yellow-200/60",
  },

  SUCCESS: {
    icon: "ooui:success",
    color: "text-green-700",
    className: "bg-green-50/80 border-green-200/50",
  },

  ERROR: {
    icon: "mdi:close-circle-outline",
    color: "text-red-700",
    className: "bg-red-50/80 border-red-200/50",
  },
};

type ToastContextType = {
  showToast: (prop: ShowToastProps) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ShowToastProps[]>([]);

  const showToast = ({ title, message, type = "ALERT" }: ShowToastProps) => {
    setToasts((prev) => {
      const exists = prev.some((t) => t.message === message);

      if (exists) return prev;

      const id = Date.now();

      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, 3000);

      return [
        ...prev,
        {
          id,
          title,
          message,
          type,
        },
      ];
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-4 right-4 z-999 flex flex-col gap-2">
        {toasts.map((toast) => {
          const style = TOAST_STYLE[toast.type ?? "ALERT"];

          return (
            <motion.div
              key={toast.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className={`min-w-[320px] max-w-105 px-5 py-4 rounded-2xl shadow-xl shadow-black/5 text-lg border backdrop-blur-xl ${style.className}`}
            >
              <div className="grid grid-cols-[24px_1fr] gap-3">
                <div className="flex justify-center items-center">
                  <Icon
                    icon={style.icon}
                    className={style.color}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{toast.title}</span>

                  <span className="text-lg opacity-80">{toast.message}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
