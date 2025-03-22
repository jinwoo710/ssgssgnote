import useStudents from '@/hooks/useStudents'
import StudentNameTag from '../../components/StudentNameTag'
import { useEffect, useState } from 'react'
import { Attendance, Counseling, Homework, Student } from '@/types'
import AddStudentModal from './components/AddStudentModal'
import { AnimatePresence, motion } from 'framer-motion'
import useHomeworks from '@/hooks/useHomeworks'
import useAttendance from '@/hooks/useAttendance'
import useCounseling from '@/hooks/useCounseling'
import StudentNameTagSkeleton from '@/routes/components/StudentNameTagSkeleton'
import ItemSkeleton from './components/ItemSkeleton'

export default function Students() {
  const { students, isLoading } = useStudents()
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

  const { homeworks, isLoading: homeworksLoading } = useHomeworks(
    selectedStudent?.id
  )
  const { attendance, isLoading: attendanceLoading } = useAttendance({
    studentId: selectedStudent?.id
  })
  const { counselings, isLoading: counselingsLoading } = useCounseling({
    studentId: selectedStudent?.id
  })

  useEffect(() => {
    if (!selectedStudent) return
    setSelectedHomework(homeworks)
    setSelectedAttendance(attendance)
    setSelectedCounseling(counselings)
  }, [selectedStudent, homeworks, attendance, counselings])

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
              <AnimatePresence mode="wait">
                {isLoading
                  ? [...Array(4)].map((_, index) => (
                      <StudentNameTagSkeleton key={`skeleton-${index}`} />
                    ))
                  : students?.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2 }
                        }}
                        onClick={() => setSelectedStudent(student)}>
                        <StudentNameTag student={student} />
                      </motion.div>
                    ))}
              </AnimatePresence>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="btn"
            onClick={handleOpenModal}>
            추가하기
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
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
                  selectedStudent &&
                  selectedAttendance.length == 0 && (
                    <div className="text-center mx-auto mt-10 text-2xl">
                      지각한 적이 없어요!
                    </div>
                  )}
                {attendanceLoading
                  ? [...Array(4)].map((_, index) => (
                      <ItemSkeleton key={`skeleton-${index}`} />
                    ))
                  : selectedAttendance?.map(
                      (attendance, index) =>
                        index < 5 && (
                          <motion.div
                            key={attendance.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                              type: 'tween'
                            }}
                            className="flex w-full bg-yellow-200 space-x-3 card h-fit p-2 cursor-pointer">
                            <p>{attendance.date} / </p>
                            <p>{attendance.status}</p>
                          </motion.div>
                        )
                    )}
              </div>
            </motion.div>

            <motion.div
              layout
              className="card  flex-grow flex-shrink basis-1/3 p-4 gap-2 flex-col">
              <div className="flex w-full text-xl">
                {selectedStudent?.name}미제출 과제 현황
              </div>
              <div className="space-y-2 mt-2">
                {selectedHomework &&
                  selectedStudent &&
                  selectedHomework.length == 0 && (
                    <div className="text-center mx-auto mt-10 text-2xl">
                      모든 과제를 제출했어요!
                    </div>
                  )}
                {homeworksLoading
                  ? [...Array(4)].map((_, index) => (
                      <ItemSkeleton key={`skeleton-${index}`} />
                    ))
                  : selectedHomework &&
                    selectedHomework.map(
                      (homework, index) =>
                        index < 5 && (
                          <motion.div
                            key={homework.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                              type: 'tween'
                            }}
                            className="flex w-full bg-red-200 space-x-3 card h-fit p-2 cursor-pointer">
                            <p>{homework.title} </p>
                            <p>{homework.date} </p>
                          </motion.div>
                        )
                    )}
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
                  selectedStudent &&
                  selectedCounseling.length == 0 && (
                    <div className="text-center mx-auto mt-10 text-2xl">
                      상담이 없어요!
                    </div>
                  )}
                {counselingsLoading
                  ? [...Array(4)].map((_, index) => (
                      <ItemSkeleton key={`skeleton-${index}`} />
                    ))
                  : selectedCounseling &&
                    selectedCounseling.map(
                      (counseling, index) =>
                        index < 5 && (
                          <motion.div
                            key={counseling.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1,
                              type: 'tween'
                            }}
                            className="flex w-full bg-green-200 space-x-3 card h-fit p-2 cursor-pointer">
                            <p>내용 : {counseling.content}</p>
                            <p>일자 : {counseling.date}</p>
                          </motion.div>
                        )
                    )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
