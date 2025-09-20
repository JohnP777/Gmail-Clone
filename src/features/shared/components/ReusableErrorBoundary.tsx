"use client";

import type { ComponentType, ReactNode } from "react";
import type { FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

interface ReusableErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent: ComponentType<FallbackProps>;
}

export default function ReusableErrorBoundary({
  children,
  FallbackComponent,
}: ReusableErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onReset={reset}>
      {children}
    </ErrorBoundary>
  );
}
