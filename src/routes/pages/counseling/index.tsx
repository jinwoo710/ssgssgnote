import { motion } from 'framer-motion'
import useStudents from '@/hooks/useStudents'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { useState } from 'react'
import { Counseling, Student } from '@/types'
import CounselingModal from './components/CounselingModal'
import CounselingItem from './components/CounselingItem'
import useCounseling from '@/hooks/useCounseling'

export default function CounselingPage() {
  const { counselings } = useCounseling({})
  const { students } = useStudents()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [selectedCounseling, setSelectedCounseling] =
    useState<Counseling | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsAddModalOpen(true)
  }

  const closeModal = () => {
    setSelectedStudent(null)
    setSelectedCounseling(null)
    setIsAddModalOpen(false)
  }

  const handleUpdateCounseling = (counseling: Counseling) => {
    setSelectedCounseling(counseling)
    setIsAddModalOpen(true)
  }
  return (
    <>
      <div className="white-paper flex-col space-y-4">
        <div className="w-full flex justify-center">
          <div className="text-2xl">상담 관리</div>
        </div>
        <div className="card flex flex-wrap gap-2 p-2">
          {students?.map(student => (
            <motion.div
              onClick={() => handleSelectStudent(student)}
              key={student.id}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
              <StudentNameTag student={student} />
            </motion.div>
          ))}
        </div>
        <div className="card flex-col w-full justify-start md:grid md:grid-cols-2 content-start p-4 gap-3 min-h-[600px]">
          {counselings &&
            counselings.map((counseling, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.5,
                  delay: 0.1 * index
                }}
                onClick={() => handleUpdateCounseling(counseling)}
                className="cursor-pointer"
                key={counseling.id}>
                <CounselingItem counseling={counseling} />
              </motion.div>
            ))}
        </div>
      </div>
      <CounselingModal
        isOpen={isAddModalOpen}
        onClose={closeModal}
        student={selectedStudent}
        counseling={selectedCounseling}
      />
    </>
  )
}
