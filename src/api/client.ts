import { ApiError, type FetchApiOptions } from '../shared/types/api.types'


const API_BASE_URL = 'https://dummyjson.com'

export async function fetchApi<T>(
  endpoint: string,
  options?: FetchApiOptions
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options?.init,
      signal: options?.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.init?.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      )
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }

    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

export { ApiError }

