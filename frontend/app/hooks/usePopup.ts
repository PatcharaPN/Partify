"use client";
import { useState } from "react";
import { PopupState } from "../types/ui.type";

export const usePopup = () => {
  const [popupState, setPopupState] = useState<PopupState>();
  const [message, setMessage] = useState("");

  const showLoading = (msg?: string) => {
    setMessage(msg ?? "กำลังดำเนินการ...");
    setPopupState("loading");
  };

  const showSuccess = (msg?: string) => {
    setMessage(msg ?? "สำเร็จ!");
    setPopupState("success");
    setTimeout(() => setPopupState(null), 2000);
  };

  const showError = (msg?: string) => {
    setMessage(msg ?? "เกิดข้อผิดพลาด");
    setPopupState("error");
  };

  const hidePopup = () => {
    setPopupState(null);
    setMessage("");
  };

  return {
    popupState,
    message,
    showLoading,
    showSuccess,
    showError,
    hidePopup,
  };
};
