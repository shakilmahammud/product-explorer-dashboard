import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd] px-4 font-sans">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8 relative inline-block">
               <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
               </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1c21] mb-6 tracking-tight">
              Oops! Something went slightly sideways.
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
              We encountered an unexpected error. Our team has been notified, and we're working to get things back on track.
            </p>

            {this.state.error && (
              <div className="bg-gray-50 rounded-xl p-4 mb-10 inline-block border border-gray-100 max-w-full overflow-hidden">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-2 font-bold">Error Trace</p>
                <p className="text-sm text-gray-600 font-mono break-all italic">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto bg-[#22B573] hover:bg-[#1a8f5a] text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(34,181,115,0.2)] hover:shadow-[0_15px_30px_rgba(34,181,115,0.3)] hover:-translate-y-1"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-500 font-bold px-10 py-4 rounded-full hover:bg-gray-50 hover:border-gray-200 transition-all duration-300"
              >
                Retry Page
              </button>
            </div>

            <div className="mt-16 text-sm text-gray-400">
               Need immediate assistance? <a href="mailto:support@ped-dashboard.com" className="text-[#22B573] hover:underline font-medium">Contact Support</a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
