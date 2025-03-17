import { useState } from 'react'
import HomeworkItem from './components/HomeworkItem'
import HomeworkModal from './components/HomeworkModal'
import useHomeworks from '@/hooks/useHomeworks'
import type { Homework } from '@/types'
import { motion } from 'framer-motion'

export default function Homework() {
  const [isAddHomeworkModalOpen, setIsAddHomeworkModalOpen] = useState(false)
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(
    null
  )
  const handleCloseModal = () => {
    setIsAddHomeworkModalOpen(false)
    setSelectedHomework(null)
  }
  const handleOpenModal = () => {
    setIsAddHomeworkModalOpen(true)
  }

  const handleEditHomework = (homework: Homework) => {
    setSelectedHomework(homework)
    handleOpenModal()
  }
  const { homeworks } = useHomeworks()
  return (
    <>
      <div
        className="white-paper flex-col space-y-4"
        style={{
          backgroundImage: 'linear-gradient(#eee 1px, transparent 1px)',
          backgroundSize: '100% 25px'
        }}>
        <div className="w-full flex justify-end">
          <button
            className="btn"
            onClick={handleOpenModal}>
            숙제 추가하기
          </button>
        </div>

        <div className="card flex-col w-full md:grid md:grid-cols-2 justify-center content-start p-4 gap-3 min-h-[600px]">
          {homeworks?.map((homework, index) => (
            <motion.div
              onClick={() => handleEditHomework(homework)}
              key={homework.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                duration: 0.5,
                delay: 0.1 * index
              }}>
              <HomeworkItem {...homework} />
            </motion.div>
          ))}
        </div>
      </div>
      <HomeworkModal
        isOpen={isAddHomeworkModalOpen}
        onClose={handleCloseModal}
        homework={selectedHomework}
      />
    </>
  )
}
