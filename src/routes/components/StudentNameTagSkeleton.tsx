import { motion } from 'framer-motion'

interface StudentNameTagSkeletonProps {
  sliceVersion?: boolean
}
export default function StudentNameTagSkeleton({
  sliceVersion = false
}: StudentNameTagSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full rounded-lg p-4 bg-gray-200 cursor-pointer h-[58px] animate-pulse ${sliceVersion ? 'py-0' : ''}`}></motion.div>
  )
}
