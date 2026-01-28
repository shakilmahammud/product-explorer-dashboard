import { useSettings, type Currency } from '../../../shared/context/SettingsContext'

const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
]

export function SettingsPage() {
  const { currency, setCurrency } = useSettings()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#1a1c21] mb-2 tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 text-lg">
          Configure your preferences
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Currency</h2>
            <p className="text-gray-500 text-base">
              Select your preferred currency for displaying prices throughout the application
            </p>
          </div>
          
          <div className="space-y-4 max-w-full">
            {CURRENCIES.map((c) => (
              <label
                key={c.value}
                className={`
                  relative flex items-center p-6 border rounded-xl cursor-pointer transition-all duration-200
                  ${currency === c.value 
                    ? 'border-[#22B573] bg-[#22B573]/5' 
                    : 'border-gray-200 hover:border-gray-200'
                  }
                `}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0 relative">
                    <input
                      type="radio"
                      name="currency"
                      value={c.value}
                      checked={currency === c.value}
                      onChange={() => setCurrency(c.value)}
                      className="sr-only"
                    />
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${currency === c.value 
                        ? 'border-[#22B573]' 
                        : 'border-gray-300 group-hover:border-gray-400'
                      }
                    `}>
                      {currency === c.value && (
                        <div className="w-3 h-3 rounded-full bg-[#22B573]" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`text-2xl font-bold w-10 text-center transition-colors duration-200 ${currency === c.value ? 'text-[#22B573]' : 'text-gray-400'}`}>
                      {c.symbol}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1a1c21]">
                        {c.label}
                      </span>
                      <span className="text-sm font-bold text-gray-400">
                        {c.value}
                      </span>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
