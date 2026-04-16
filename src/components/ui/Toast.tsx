import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type?: 'success' | 'info'
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }, [])

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-6 right-6 z-[10001] flex flex-col gap-2 pointer-events-none">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 120, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 120, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="pointer-events-auto flex items-start gap-3 bg-surface border-l-4 border-accent rounded-xl shadow-lg shadow-text-primary/8 px-4 py-3.5 min-w-[260px] max-w-[320px]"
              >
                <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 text-accent" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-sans text-[12.5px] text-text-primary leading-snug flex-1">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="text-text-secondary/50 hover:text-text-secondary transition-colors flex-shrink-0"
                  aria-label="Dismiss"
                >
                  <X size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
