import { motion, AnimatePresence } from 'framer-motion'

export interface ModalLayoutProps {
  onClose: () => void
  isOpen: boolean
  children: React.ReactNode
}

export default function ModalLayout({
  onClose,
  isOpen,
  children
}: ModalLayoutProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <div
            className="absolute inset-0 bg-black/30"
            onClick={onClose}
          />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
