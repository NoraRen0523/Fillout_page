"use client";

import React from "react";
import HorizontalNavigator from "@/components/HorizontalNavigator";
import PageProvider from "@/context/PageContext";
import { ModalProvider } from "@/context/ModalContext";
import { ToastProvider } from "./context/ToastContext";

export default function Home() {
  return (
    <PageProvider>
      <ModalProvider>
        <ToastProvider>
          <HorizontalNavigator />
        </ToastProvider>
      </ModalProvider>
    </PageProvider>
  );
}
