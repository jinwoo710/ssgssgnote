import useStudents from '@/hooks/useStudents'
import StudentNameTag from '../../components/StudentNameTag'
import { useEffect, useState } from 'react'
import { Attendance, Counseling, Homework, Student } from '@/types'
import AddStudentModal from './components/AddStudentModal'
import { motion } from 'framer-motion'
import useHomeworks from '@/hooks/useHomeworks'
import useAttendance from '@/hooks/useAttendance'
import useCounseling from '@/hooks/useCounseling'

export default function Students() {
  const { students } = useStudents()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const [selectedHomework, setSelectedHomework] = useState<
    Homework[] | undefined
  >([])
  const [selectedAttendance, setSelectedAttendance] = useState<
    Attendance[] | undefined
  >([])

  const [selectedCounseling, setSelectedCounseling] = useState<
    Counseling[] | undefined
  >([])

  const { homeworks } = useHomeworks(selectedStudent?.id)
  const { attendance } = useAttendance({})
  const { counselings } = useCounseling({ studentId: selectedStudent?.id })

  useEffect(() => {
    if (!selectedStudent) return
    setSelectedHomework(homeworks)
    setSelectedAttendance(attendance)
    setSelectedCounseling(counselings)
  }, [selectedStudent])

  const handleOpenModal = () => setIsAddModalOpen(true)
  const handleCloseModal = () => setIsAddModalOpen(false)
  return (
    <>
      <div className="white-paper">
        <div className="flex flex-col justify-between lg:h-full space-y-2 lg:space-y-4">
          <div className="card lg:w-[260px] h-[300px] lg:flex-1 flex-col shrink-0">
            <div className="flex lg:block justify-between items-center bg-white rounded-t-xl border-b border-black">
              <div className="p-4 rounded-t-xl border-black font-bold bg-white text-center">
                학생 목록
              </div>
            </div>
            <div className="flex flex-col p-2 overflow-y-auto space-y-2 h-[600px]">
              {students?.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedStudent(student)}>
                  <StudentNameTag student={student} />
                </motion.div>
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
        <motion.div
          layout
          className="flex flex-col w-full flex-1 space-y-2 min-h-[600px]">
          <motion.div
            layout
            className="card flex-grow flex-shrink basis-1/3 p-4 flex-col">
            <div className="flex w-full text-xl">
              {selectedStudent?.name} 출석 현황
            </div>
            <div className="space-y-2 mt-2">
              {selectedAttendance &&
                selectedAttendance.map(attendance => (
                  <div
                    key={attendance.id}
                    className="flex w-full bg-amber-200 space-x-3 card h-fit p-2 cursor-pointer">
                    <p>일자 : {attendance.date}</p>
                    <p>사유 : {attendance.status}</p>
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            layout
            className="card  flex-grow flex-shrink basis-1/3 p-4 gap-2 flex-col">
            <div className="flex w-full text-xl">
              {selectedStudent?.name} 과제 현황
            </div>
            <div className="space-y-2 mt-2">
              {selectedHomework &&
                selectedHomework.map(homework => (
                  <div
                    key={homework.id}
                    className="flex w-full bg-amber-200 space-x-3 card h-fit p-2 cursor-pointer">
                    <p>제목 : {homework.title}</p>
                    <p>일자 : {homework.date}</p>
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            layout
            className="card  flex-grow flex-shrink basis-1/3 p-4 flex-col">
            <div className="flex w-full text-xl">
              {selectedStudent?.name} 상담 현황
            </div>
            <div className="space-y-2 mt-2">
              {selectedCounseling &&
                selectedCounseling.map(counseling => (
                  <div
                    key={counseling.id}
                    className="flex w-full bg-amber-200 space-x-3 card h-fit p-2 cursor-pointer">
                    <p>제목 : {counseling.type}</p>
                    <p>일자 : {counseling.date}</p>
                    <p>내용 : {counseling.content}</p>
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
