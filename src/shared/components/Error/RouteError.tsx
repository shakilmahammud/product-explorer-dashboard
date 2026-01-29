import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'

export function RouteError() {
  const error = useRouteError()
  
  let title = "Something went wrong"
  let message = "An unexpected error occurred."
  let status: number | undefined

  if (isRouteErrorResponse(error)) {
    status = error.status
    if (status === 404) {
      title = "Page Not Found"
      message = "Sorry, we couldn't find the page you're looking for."
    }else if (status === 503) {
      title = "Service Unavailable"
      message = "Our servers are experiencing issues. Please try again later."
    }
  } else if (error instanceof Error) {
    message = error.message
  }

  return <ErrorPage title={title} message={message} status={status} onRetry={() => window.location.reload()} />
}
