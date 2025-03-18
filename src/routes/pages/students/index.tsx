import useStudents from '@/hooks/useStudents'
import StudentNameTag from '../../components/StudentNameTag'
import { useState } from 'react'
import { Student } from '@/types'
import AddStudentModal from './components/AddStudentModal'
import { motion } from 'framer-motion'

export default function Students() {
  const { students, isLoading, isError } = useStudents()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const handleOpenModal = () => setIsAddModalOpen(true)
  const handleCloseModal = () => setIsAddModalOpen(false)
  return (
    <>
      <div className="white-paper">
        <div className="flex flex-col justify-between lg:h-full space-y-2 lg:space-y-4">
          <div className="card lg:w-[260px] h-[300px] lg:flex-1 flex-col shrink-0">
            <div className="flex lg:block justify-between items-center bg-white rounded-t-xl border-b border-black">
              <div className="p-4 rounded-t-xl lg:border-b border-black font-bold bg-white text-center">
                학생 목록
              </div>
              <div className="p-3 border-b border-gray-200 rounded-t-xl bg-white">
                <input
                  type="text"
                  placeholder="이름으로 검색..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none border-black"
                />
              </div>
            </div>
            <div className="flex flex-col p-2 overflow-y-auto space-y-2 h-[600px]">
              {students?.map(student => (
                <StudentNameTag
                  key={student.id}
                  student={student}
                />
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="btn"
            onClick={handleOpenModal}>
            추가하기
          </motion.button>
        </div>
        <div className="flex flex-col w-full flex-1 space-y-2">
          <div className="card min-h-[100px] flex-1 p-4 flex-col"> </div>
          <div className="card min-h-[100px] flex-1 p-4 flex-col"> </div>
          <div className="card min-h-[100px] flex-1 p-4 flex-col"> </div>
        </div>
      </div>
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
