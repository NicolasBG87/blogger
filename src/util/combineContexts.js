import React from "react";

import { SpinnerProvider } from "components/Spinner";
import { ToastProvider } from "components/Toast";
import { ModalProvider } from "components/Modal";
import { AuthProvider } from "util/auth";
import { APIProvider } from "util/API";

export const CombineContext = React.createContext();
export const ContextProvider = ({ children }) => {
  return (
    <CombineContext.Provider>
      <ToastProvider>
        <SpinnerProvider>
          <APIProvider>
            <AuthProvider>
              <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
          </APIProvider>
        </SpinnerProvider>
      </ToastProvider>
    </CombineContext.Provider>
  );
};
