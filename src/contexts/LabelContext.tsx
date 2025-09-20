"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { Label } from "~/types/label";

interface LabelContextType {
  currentLabel: Label;
  setCurrentLabel: (label: Label) => void;
}

const LabelContext = createContext<LabelContextType | undefined>(undefined);

interface LabelProviderProps {
  children: ReactNode;
}

export function LabelProvider({ children }: LabelProviderProps) {
  const [currentLabel, setCurrentLabel] = useState<Label>(Label.PRIMARY);

  return (
    <LabelContext.Provider value={{ currentLabel, setCurrentLabel }}>
      {children}
    </LabelContext.Provider>
  );
}

export function useLabel() {
  const context = useContext(LabelContext);
  if (context === undefined) {
    throw new Error("useLabel must be used within a LabelProvider");
  }
  return context;
}
