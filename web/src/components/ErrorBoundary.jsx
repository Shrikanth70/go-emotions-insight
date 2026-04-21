import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-12 text-center bg-error-container/10 border-2 border-dashed border-error/30 rounded-3xl m-6">
          <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ⚠️
          </div>
          <h2 className="text-2xl font-headline font-black text-on-surface mb-2">Analysis Failed</h2>
          <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-body">
            The visualization engine encountered an unexpected response structure. This can happen with complex multi-emotion signals.
          </p>
          <div className="p-4 bg-surface-container-highest rounded-xl text-left mb-8 overflow-auto max-h-32">
            <code className="text-[10px] text-error font-mono">{this.state.error?.toString()}</code>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-105 transition-transform"
          >
            Reset Engine
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
