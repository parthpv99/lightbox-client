import React, { useContext, useState } from "react";

const ToastContext = React.createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast,
        message,
        setMessage,
        messageType,
        setMessageType,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
