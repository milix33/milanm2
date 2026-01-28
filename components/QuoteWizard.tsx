'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronRight, FaChevronLeft, FaCheck, FaHome, FaBuilding, FaBriefcase, FaCouch, FaTools, FaCube, FaSpinner } from 'react-icons/fa'
import { ProjectType, wizardConfigs, WizardStep } from '@/lib/quote-wizard'

interface QuoteWizardProps {
  locale?: string
  onClose?: () => void
}

const projectTypes = [
  { value: 'house' as ProjectType, label: 'Kuća (novogradnja)', icon: <FaHome className="text-3xl" /> },
  { value: 'building' as ProjectType, label: 'Zgrada (stambeno-poslovni)', icon: <FaBuilding className="text-3xl" /> },
  { value: 'commercial' as ProjectType, label: 'Poslovni objekat', icon: <FaBriefcase className="text-3xl" /> },
  { value: 'interior' as ProjectType, label: 'Enterijer', icon: <FaCouch className="text-3xl" /> },
  { value: 'reconstruction' as ProjectType, label: 'Rekonstrukcija/adaptacija', icon: <FaTools className="text-3xl" /> },
  { value: 'visualization' as ProjectType, label: 'Samo 3D vizualizacija', icon: <FaCube className="text-3xl" /> },
]

export default function QuoteWizard({ locale = 'sr', onClose }: QuoteWizardProps) {
  const [selectedType, setSelectedType] = useState<ProjectType | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = selectedType ? wizardConfigs[selectedType] : []
  const totalSteps = steps.length
  const currentStepData = steps[currentStep]

  // Validate current step
  const validateStep = (): boolean => {
    const stepErrors: Record<string, string> = {}
    
    if (!currentStepData) return false

    currentStepData.fields.forEach((field) => {
      const value = formData[field.id]
      
      if (field.required) {
        if (field.type === 'checkbox') {
          if (!value || !Array.isArray(value) || value.length === 0) {
            stepErrors[field.id] = 'Ovo polje je obavezno'
          }
        } else if (field.type === 'email') {
          if (!value || !value.includes('@')) {
            stepErrors[field.id] = 'Unesite validnu email adresu'
          }
        } else if (field.type === 'number') {
          if (value === undefined || value === '' || isNaN(Number(value))) {
            stepErrors[field.id] = 'Ovo polje je obavezno'
          } else {
            const numValue = Number(value)
            if (field.validation?.min !== undefined && numValue < field.validation.min) {
              stepErrors[field.id] = `Minimalna vrednost je ${field.validation.min}`
            }
            if (field.validation?.max !== undefined && numValue > field.validation.max) {
              stepErrors[field.id] = `Maksimalna vrednost je ${field.validation.max}`
            }
          }
        } else {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            stepErrors[field.id] = 'Ovo polje je obavezno'
          }
        }
      }
    })

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const handleFileAdd = (fieldId: string, file: File) => {
    const currentFiles: File[] = Array.isArray(formData[fieldId]) ? formData[fieldId] : []
    handleFieldChange(fieldId, [...currentFiles, file])
  }

  const handleFileRemove = (fieldId: string, index: number) => {
    const currentFiles: File[] = Array.isArray(formData[fieldId]) ? formData[fieldId] : []
    const newFiles = currentFiles.filter((_, i) => i !== index)
    handleFieldChange(fieldId, newFiles)
  }

  const handleNext = () => {
    if (!validateStep()) {
      return
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setSelectedType(null)
      setFormData({})
      setErrors({})
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) {
      return
    }
  
    setIsSubmitting(true)
    
    try {
      // Prepare form data for submission
      const submitFormData = new FormData()
      
      // Add JSON data
      const submitData = {
        projectType: selectedType,
        formData: formData,
        submittedAt: new Date().toISOString(),
      }
      submitFormData.append('data', JSON.stringify(submitData))
  
      // Add files to FormData
      let fileIndex = 0
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          submitFormData.append(`file_${fileIndex}`, value)
          fileIndex++
        } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
          value.forEach((file: File) => {
            submitFormData.append(`file_${fileIndex}`, file)
            fileIndex++
          })
        }
      }
  
      // Send to API
      const response = await fetch('/api/quote', {
        method: 'POST',
        body: submitFormData,
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        throw new Error(result.error || 'Došlo je do greške prilikom slanja upita.')
      }
  
      setIsSubmitted(true)
    } catch (error: any) {
      console.error('Submit error:', error)
      alert(error.message || 'Došlo je do greške. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FaCheck className="h-10 w-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
          Hvala vam!
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Vaš upit je uspješno poslan. Kontaktiraćemo vas u najkraćem mogućem roku sa detaljnom ponudom.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setIsSubmitted(false)
              setSelectedType(null)
              setFormData({})
              setCurrentStep(0)
            }}
            className="bg-accent text-white px-8 py-3 text-lg font-semibold hover:bg-opacity-90 transition-all rounded-lg"
          >
            Pošaljite novi upit
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-8 py-3 text-lg font-semibold hover:bg-gray-300 transition-all rounded-lg"
            >
              Zatvori
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  // Project type selection
  if (!selectedType) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Zatraži ponudu
          </h2>
          <p className="text-lg text-gray-600">
            Odaberite tip projekta da počnemo
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projectTypes.map((type) => (
            <motion.button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-accent hover:bg-accent/5 transition-all duration-300 text-left group"
            >
              <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                {type.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">{type.label}</h3>
            </motion.button>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">
            Korak {currentStep + 1} od {totalSteps}
          </span>
          <span className="text-sm font-semibold text-accent">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-accent to-accent/80 h-3 rounded-full"
          />
        </div>
      </div>

      {/* Step Title */}
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-8">
        {currentStepData?.title}
      </h2>

      {/* Form Fields */}
      <div className="space-y-6 mb-8">
        {currentStepData?.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.helpText && (
              <p className="text-xs text-gray-500 mb-2">{field.helpText}</p>
            )}

            {/* Text Input */}
            {field.type === 'text' && (
              <input
                type="text"
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:border-accent'
                }`}
              />
            )}

            {/* Email Input */}
            {field.type === 'email' && (
              <input
                type="email"
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:border-accent'
                }`}
              />
            )}

            {/* Textarea */}
            {field.type === 'textarea' && (
              <textarea
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:border-accent'
                }`}
              />
            )}

            {/* Number Input */}
            {field.type === 'number' && (
              <input
                type="number"
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value ? Number(e.target.value) : '')}
                placeholder={field.placeholder}
                min={field.validation?.min}
                max={field.validation?.max}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:border-accent'
                }`}
              />
            )}

            {/* Select */}
            {field.type === 'select' && (
              <select
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:border-accent'
                }`}
              >
                <option value="">Odaberite...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {/* Radio */}
            {field.type === 'radio' && (
              <div className="space-y-3">
                {field.options?.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData[field.id] === opt.value
                        ? 'border-accent bg-accent/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={field.id}
                      value={opt.value}
                      checked={formData[field.id] === opt.value}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="mr-3 text-accent focus:ring-accent"
                    />
                    <span className="text-gray-700 font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}

         {/* Checkbox */}
{field.type === 'checkbox' && (
  <div className="space-y-3">
    {field.options?.map((opt) => {
      const selected: string[] = Array.isArray(formData[field.id]) ? formData[field.id] : []
      const isChecked = selected.includes(opt.value)

      return (
        <label
          key={opt.value}
          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
            isChecked ? 'border-accent bg-accent/10' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="checkbox"
            value={opt.value}
            checked={isChecked}
            onChange={(e) => {
              const next = e.target.checked
                ? [...selected, opt.value]
                : selected.filter((v) => v !== opt.value)
              handleFieldChange(field.id, next)
            }}
            className="mr-3 text-accent focus:ring-accent"
          />
          <span className="text-gray-700 font-medium">{opt.label}</span>
        </label>
      )
    })}
  </div>
)}

                {/* File Input - Dynamic */}
{field.type === 'file' && (
  <div className="space-y-3">
    {/* List of uploaded files */}
    {Array.isArray(formData[field.id]) && formData[field.id].length > 0 && (
      <div className="bg-accent/10 border border-accent rounded-lg p-4 space-y-2">
        <p className="text-sm text-accent font-semibold mb-3">
          {formData[field.id].length} fajl(ova) izabrano:
        </p>
        {formData[field.id].map((file: File, idx: number) => (
          <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center flex-1 min-w-0">
              <span className="text-sm text-gray-700 truncate">• {file.name}</span>
              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button
              type="button"
              onClick={() => handleFileRemove(field.id, idx)}
              className="ml-3 text-red-500 hover:text-red-700 text-sm font-semibold flex-shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )}

    {/* Single file input - appears after each upload */}
    <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
      errors[field.id] 
        ? 'border-red-500 bg-red-50' 
        : 'border-gray-300 hover:border-accent'
    }`}>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.dwg"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
              alert('Fajl je prevelik. Maksimalna veličina je 5MB.')
              e.target.value = ''
              return
            }
            handleFileAdd(field.id, file)
            // Reset input to allow same file to be selected again
            e.target.value = ''
          }
        }}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-opacity-90 cursor-pointer"
      />
      <p className="text-xs text-gray-500 mt-2">Dozvoljeno: PDF, JPG, PNG, DWG (max 5MB po fajlu)</p>
    </div>
  </div>
)}


            {/* Date Input */}
            {field.type === 'date' && (
              <input
                type="date"
                value={formData[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:border-accent'
                }`}
              />
            )}


            {/* Error Message */}
            {errors[field.id] && (
              <p className="text-sm text-red-600 font-medium">{errors[field.id]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-gray-700"
        >
          <FaChevronLeft />
          {currentStep === 0 ? 'Nazad' : 'Nazad'}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg min-w-[160px] justify-center"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Šalje se...
            </>
          ) : currentStep < totalSteps - 1 ? (
            <>
              Sljedeći korak
              <FaChevronRight />
            </>
          ) : (
            <>
              <FaCheck />
              Pošalji upit
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
