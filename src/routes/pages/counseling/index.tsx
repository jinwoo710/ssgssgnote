import { motion } from 'framer-motion'
import useStudents from '@/hooks/useStudents'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { useState } from 'react'
import { Student } from '@/types'

export default function Counseling() {
  const counseling = []
  const { students } = useStudents()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsAddModalOpen(true)
  }

  const closeModal = () => {
    setSelectedStudent(null)
    setIsAddModalOpen(false)
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
        <div className="card flex-col w-full md:grid md:grid-cols-2 justify-center content-start p-4 gap-3 min-h-[600px]">
          {counseling?.map((counseling, index) => (
            <motion.div
              onClick={() => null}
              key={counseling.id}
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
    </>
  )
}
