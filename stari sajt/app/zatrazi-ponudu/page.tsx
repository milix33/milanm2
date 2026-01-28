'use client'

import QuoteWizard from '@/components/QuoteWizard'

export default function RequestQuotePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <QuoteWizard />
        </div>
      </div>
    </div>
  )
}
