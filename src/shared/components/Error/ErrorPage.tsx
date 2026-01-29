import { useNavigate } from 'react-router-dom'

interface ErrorPageProps {
  title?: string
  message?: string
  status?: number | string
  onRetry?: () => void
}

export function ErrorPage({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred.", 
  status,
  onRetry
}: ErrorPageProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
                {status === 404 ? (
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            </div>
        </div>
        
        {status && (
            <p className="text-sm font-bold text-red-500 tracking-widest uppercase mb-2">
                Error {status}
            </p>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8 text-lg">{message}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-[#22B573] text-white rounded-lg hover:bg-[#1e9e63] transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Go Home
          </button>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
