import { motion } from 'framer-motion'

export interface DeletePopupProps {
  isOpen: boolean
  handleDelete: () => void
  handleCancel: () => void
}

export default function DeletePopup({
  isOpen,
  handleDelete,
  handleCancel
}: DeletePopupProps) {
  if (!isOpen) return null
  return (
    <motion.div className="p-4 border flex flex-col w-[200px] items-center bg-white shadow-lg border-black rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="p-4">삭제하시겠습니까?</span>
      <div className="flex gap-2">
        <motion.button
          className="btn text-red-700"
          onClick={handleDelete}>
          삭제
        </motion.button>
        <motion.button
          className="btn"
          onClick={handleCancel}>
          취소
        </motion.button>
      </div>
    </motion.div>
  )
}
