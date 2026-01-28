import { createContext, useContext, useState, type ReactNode } from 'react'

export type Currency = 'USD' | 'GBP' | 'EUR'

interface SettingsContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number) => string
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

const CURRENCY_CONFIG = {
  USD: { symbol: '$', rate: 1, locale: 'en-US' },
  GBP: { symbol: '£', rate: 0.79, locale: 'en-GB' },
  EUR: { symbol: '€', rate: 0.92, locale: 'en-IE' },
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('app_currency')
    return (saved as Currency) || 'USD'
  })

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem('app_currency', newCurrency)
  }

  const formatPrice = (price: number) => {
    const config = CURRENCY_CONFIG[currency]
    const convertedPrice = price * config.rate
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
    }).format(convertedPrice)
  }

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
