import { ErrorBoundaryContext } from "@/context/ErrorBoundaryContext";
import {
  Component,
  ComponentType,
  createElement,
  ErrorInfo,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

export type FallbackProps = {
  resetErrorBoundary: (...args: any[]) => void;
  error: any;
};

type Props = {
  children?: ReactNode;
  fallback: ComponentType<FallbackProps>;
  theme?: ThemeMode;
};

type State =
  | {
      hasError: false;
      error: null;
    }
  | {
      hasError: true;
      error: any;
    };

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  constructor(props: Props) {
    super(props);
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  public static getDerivedStateFromError(err: Error): State {
    return { hasError: true, error: err };
  }

  componentDidCatch(error: Error | any, _: ErrorInfo): void {
    const theme = this.props?.theme;

    toast.error(error?.message ? error.message : error, {
      duration: 2000,
      style: {
        color: theme ? (theme === "light" ? "black" : "white") : undefined,
        backgroundColor: theme
          ? theme === "light"
            ? "#f1e6db"
            : "#202023"
          : undefined,
      },
    });
  }

  resetErrorBoundary(..._: any[]) {
    this.setState({ hasError: false, error: null });
  }

  render() {
    const { fallback, children } = this.props;

    let childToRender = children;

    const props: FallbackProps = {
      resetErrorBoundary: this.resetErrorBoundary,
      error: this.state.error,
    };

    if (this.state.hasError) childToRender = createElement(fallback, props);

    return createElement(
      ErrorBoundaryContext.Provider,
      {
        value: {
          hasError: this.state.hasError,
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      childToRender
    );
  }
}

export default ErrorBoundary;
