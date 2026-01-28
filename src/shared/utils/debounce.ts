export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | null = null
  let lastThis: any = null
  let result: any

  const { leading = false, trailing = true } = options

  function invokeFunc() {
    if (lastArgs) {
      result = func.apply(lastThis, lastArgs)
      lastArgs = lastThis = null
    }
    return result
  }

  function leadingEdge() {
    if (leading) {
      invokeFunc()
    }
  }

  function trailingEdge() {
    if (trailing && lastArgs) {
      invokeFunc()
    }
    timeout = null
  }

  const debounced = function (this: any, ...args: Parameters<T>) {
    lastArgs = args
    lastThis = this

    if (!timeout) {
      if (leading) {
        leadingEdge()
      }
      timeout = setTimeout(trailingEdge, wait)
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(trailingEdge, wait)
    }
  }

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastArgs = lastThis = null
  }

  return debounced
}
