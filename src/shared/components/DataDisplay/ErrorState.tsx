import type { ReactNode } from 'react'

interface ErrorStateProps {
  title?: string
  message?: string
  icon?: ReactNode
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message, 
  icon, 
  onRetry,
  retryLabel = 'Try Again',
  className = ''
}: ErrorStateProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}>
      <div className="flex justify-center mb-4">
        {icon || (
          <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-red-800 mb-2">{title}</h3>
      
      {message && (
        <p className="text-sm text-red-600 mb-6 max-w-md mx-auto">{message}</p>
      )}
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          {retryLabel}
        </button>
      )}
    </div>
  )
}
