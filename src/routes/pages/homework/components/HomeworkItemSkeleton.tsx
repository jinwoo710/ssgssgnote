import { motion } from 'framer-motion'

export default function HomeworkItemSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl bg-gray-200 flex-col w-full  min-h-30 p-4 animate-pulse `}></motion.div>
  )
}
