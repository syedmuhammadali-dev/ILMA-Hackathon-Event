import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // capture error details for debugging
    this.setState({ error, info });
    // also log to console so developer can inspect in browser devtools
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      const { error, info } = this.state;
      return (
        <div role="alert" className="p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-rose-600">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            The page failed to render — debug details below.
          </p>
          <details className="whitespace-pre-wrap mt-3 text-xs text-slate-600">
            {error && String(error)}
            {info && info.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
