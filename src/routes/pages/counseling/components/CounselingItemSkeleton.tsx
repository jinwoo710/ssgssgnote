import { motion } from 'framer-motion'

export default function CounselingItemSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`h-[74px] rounded-xl flex-col p-2 bg-gray-200 animate-pulse`}></motion.div>
  )
}
