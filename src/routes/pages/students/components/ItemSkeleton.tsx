import { motion } from 'framer-motion'

export default function ItemSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full h-[42px] bg-gray-200 animate-pulse"></motion.div>
  )
}
