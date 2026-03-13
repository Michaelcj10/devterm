import { Component, ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  toolId?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message || "unknown error" };
  }

  componentDidCatch(err: Error, info: ErrorInfo): void {
    console.error(`[ErrorBoundary] Tool "${this.props.toolId ?? 'unknown'}" crashed:`, err, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="border border-red-900 rounded p-6 bg-black font-mono space-y-3">
          <div className="text-red-400 text-sm font-bold">
            // !! TOOL CRASHED !!
          </div>
          <div className="text-xs text-red-600 bg-black border border-red-950 rounded p-3 break-all">
            {this.state.message}
          </div>
          <div className="text-xs text-green-600">
            // navigate to another tool and back to recover
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
