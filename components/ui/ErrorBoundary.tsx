"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center h-screen bg-[#313338]">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#f23f43]/10 flex items-center justify-center">
              <AlertTriangle size={40} className="text-[#f23f43]" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h2>

            <p className="text-[#b5bac1] mb-6">
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>

            {this.state.error && process.env.NODE_ENV === "development" && (
              <pre className="text-left text-xs bg-[#1e1f22] p-4 rounded mb-6 overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}

            <Button onClick={() => window.location.reload()} className="gap-2">
              <RefreshCw size={18} />
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
