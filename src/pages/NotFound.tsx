import { ErrorPage } from '../shared/components/Error/ErrorPage'

export function NotFound() {
  return (
    <ErrorPage 
      title="Page Not Found" 
      message="Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist."
      status={404}
    />
  )
}
