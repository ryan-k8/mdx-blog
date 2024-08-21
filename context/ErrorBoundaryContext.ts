import { createContext } from "react";

export interface IErrorBoundary {
  hasError: boolean;
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
}

const ErrorBoundaryContext = createContext<IErrorBoundary | null>(null);

export { ErrorBoundaryContext };
