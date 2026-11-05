import React from 'react';
import { AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { formatReadableFirestoreError } from '../lib/firebase';

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown;
}

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const formatted = formatReadableFirestoreError(this.state.error);
      return (
        <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-indigo-100 shadow-lg space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#0B0F19]">
                Something Interrupted This View
              </h1>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {formatted.message}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-gradient rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload View</span>
              </button>
              {formatted.upgradeUrl && (
                <a
                  href={formatted.upgradeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#6A35FF] bg-[#F5F3FF] rounded-xl"
                >
                  <span>Open Firebase Console</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
