import { useState } from 'react'
import HomeworkItem from './components/HomeworkItem'
import AddHomeworkModal from './components/AddHomeworkModal'
import useHomeworks from '@/hooks/useHomeworks'

export default function Homework() {
  const [isAddHomeworkModalOpen, setIsAddHomeworkModalOpen] = useState(false)
  const handleCloseModal = () => {
    setIsAddHomeworkModalOpen(false)
  }
  const handleOpenModal = () => {
    setIsAddHomeworkModalOpen(true)
  }
  const { homeworks } = useHomeworks()
  return (
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
        {homeworks?.map(homework => (
          <HomeworkItem
            key={homework.id}
            {...homework}
          />
        ))}
      </div>
      <AddHomeworkModal
        isOpen={isAddHomeworkModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
