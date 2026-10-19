import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import FloatingInput from '../ui/FloatingInput'

interface Props {
  open: boolean
  onClose: () => void
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const

export default function BusinessQuoteModal({ open, onClose }: Props) {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [form, setForm] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('success')
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setForm({ company: '', contact: '', email: '', phone: '', serviceType: '', message: '' })
    }, 300)
  }

  const serviceOptions = t('business.quoteModal.serviceOptions', { returnObjects: true }) as string[]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-text-primary/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative z-10 bg-surface w-full max-w-lg rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-1.5 text-text-secondary hover:text-text-primary transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center text-center px-8 py-16"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mb-6">
                    <Check size={24} className="text-accent" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-[26px] font-[400] text-text-primary mb-3">
                    {t('business.quoteModal.successTitle')}
                  </h3>
                  <p className="font-sans text-[14px] text-text-secondary leading-relaxed max-w-xs">
                    {t('business.quoteModal.successMessage')}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="px-8 py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-7">
                    <span className="eyebrow text-accent mb-2 block">{t('business.eyebrow')}</span>
                    <h2 className="font-display text-[28px] font-[400] text-text-primary leading-tight">
                      {t('business.quoteModal.title')}
                    </h2>
                    <p className="font-sans text-[13.5px] text-text-secondary mt-2 leading-relaxed">
                      {t('business.quoteModal.subtitle')}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    <div className="flex gap-3.5">
                      <FloatingInput
                        label={t('business.quoteModal.companyName')}
                        name="company"
                        value={form.company}
                        onChange={v => setForm(f => ({ ...f, company: v }))}
                        required
                        half
                      />
                      <FloatingInput
                        label={t('business.quoteModal.contactPerson')}
                        name="contact"
                        value={form.contact}
                        onChange={v => setForm(f => ({ ...f, contact: v }))}
                        required
                        half
                      />
                    </div>

                    <div className="flex gap-3.5">
                      <FloatingInput
                        label={t('business.quoteModal.email')}
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={v => setForm(f => ({ ...f, email: v }))}
                        required
                        half
                      />
                      <FloatingInput
                        label={t('business.quoteModal.phone')}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={v => setForm(f => ({ ...f, phone: v }))}
                        half
                      />
                    </div>

                    <div className="relative">
                      <select
                        name="serviceType"
                        value={form.serviceType}
                        onChange={e => setForm(f => ({ ...f, serviceType: e.target.value }))}
                        required
                        className="peer w-full bg-transparent border border-border/70 rounded-xl px-4 pt-5 pb-2.5 font-sans text-[13.5px] text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 transition-colors appearance-none"
                      >
                        <option value="" disabled />
                        {serviceOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <label
                        className={`absolute left-4 font-sans pointer-events-none transition-all duration-200 ${
                          form.serviceType
                            ? 'top-2 text-[10.5px] text-text-secondary'
                            : 'top-4 text-[13.5px] text-text-secondary/60'
                        }`}
                      >
                        {t('business.quoteModal.serviceType')} *
                      </label>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary/60">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        rows={4}
                        placeholder=" "
                        className="peer w-full bg-transparent border border-border/70 rounded-xl px-4 pt-5 pb-2.5 font-sans text-[13.5px] text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 transition-colors resize-none"
                      />
                      <label className="absolute left-4 top-4 font-sans text-[12.5px] text-text-secondary/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[13.5px] peer-focus:top-2 peer-focus:text-[10.5px] peer-focus:text-text-secondary peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-[10.5px] pointer-events-none">
                        {t('business.quoteModal.message')}
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="mt-1 w-full bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {t('business.quoteModal.send')}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
