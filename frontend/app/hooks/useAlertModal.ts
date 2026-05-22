"use client";
import { useState } from "react";

type AlertVariant = "error" | "warning" | "info" | "success";

type OpenOptions = {
  variant?: AlertVariant;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
};

export const useAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OpenOptions>({
    title: "",
    description: "",
  });

  const open = (opts: OpenOptions) => {
    setOptions(opts);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const modalProps = {
    isOpen,
    onClose: close,
    onConfirm: options.onConfirm
      ? () => {
          options.onConfirm?.();
          close();
        }
      : undefined,
    variant: options.variant,
    title: options.title,
    description: options.description,
    confirmLabel: options.confirmLabel,
    cancelLabel: options.cancelLabel,
  };

  return { open, close, modalProps };
};
