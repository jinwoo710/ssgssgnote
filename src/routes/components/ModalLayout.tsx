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
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      {children}
    </div>
  )
}
