"use client";
import { createContext, useContext, ReactNode } from "react";
import AlertModal from "../components/ui/AlertModal";
import { useAlertModal } from "../hooks/useAlertModal";

type AlertOpen = ReturnType<typeof useAlertModal>["open"];
const AlertModalContext = createContext<AlertOpen | null>(null);
export const AlertModalProvider = ({ children }: { children: ReactNode }) => {
  const alert = useAlertModal();

  return (
    <AlertModalContext.Provider value={alert.open}>
      {children}
      <AlertModal {...alert.modalProps} />
    </AlertModalContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertModalContext);
  if (!ctx) throw new Error("useAlert must be used within AlertModalProvider");
  return ctx;
};
