import useAttendance from '@/hooks/useAttendance'
import useStudents from '@/hooks/useStudents'
import ModalLayout from '@/routes/components/ModalLayout'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { ATTENDANCE_STATUS } from '@/routes/constants/attendance'
import { CreateAttendance, Student } from '@/types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import DeletePopup from '@/routes/components/DeletePopup'
import StudentNameTagSkeleton from '@/routes/components/StudentNameTagSkeleton'

export interface AttendanceModalProps {
  onClose: () => void
  isOpen: boolean
  date?: Date | null
}

export default function AttendanceModal({
  onClose,
  isOpen,
  date
}: AttendanceModalProps) {
  const { attendance, createAttendance, deleteAttendance } = useAttendance({
    date: date
      ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      : undefined
  })
  const { register, handleSubmit, reset } = useForm<CreateAttendance>()
  const { students, isLoading } = useStudents()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const handleClose = () => {
    reset()
    setSelectedStudent(null)
    onClose()
    setIsDeletePopupOpen(false)
  }
  if (!date) return null
  const onSubmit = (data: any) => {
    if (!selectedStudent) return
    try {
      createAttendance({
        studentId: selectedStudent?.id,
        date: `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`,
        status: data.status
      })
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }
  const targetDate = new Date(date)

  const handleDelete = (attendanceId: string) => {
    try {
      deleteAttendance(attendanceId)
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ModalLayout
      onClose={handleClose}
      isOpen={isOpen}>
      <motion.form
        layout
        onSubmit={handleSubmit(onSubmit)}
        className="modal-card max-w-[600px]">
        <div className="w-full flex justify-between">
          <div></div>
          <div className="cursor-default text-2xl">
            {targetDate.getFullYear()}.{targetDate.getMonth() + 1}.
            {targetDate.getDate()}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer">
            닫기
          </button>
        </div>
        <div className="w-full flex p-2 card flex-wrap gap-1 justify-center overflow-y-auto h-fit">
          <AnimatePresence mode="wait">
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <StudentNameTagSkeleton key={index}></StudentNameTagSkeleton>
                ))
              : students?.map(student => (
                  <div
                    key={student.id}
                    className="w-fit cursor-pointer"
                    onClick={() => setSelectedStudent(student)}>
                    <StudentNameTag student={student} />
                  </div>
                ))}
          </AnimatePresence>
        </div>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex-col md:flex-row justify-evenly items-center card p-1">
            <div className="flex space-x-4 p-1 items-center">
              <div className="flex space-x-2">
                <span className="shrink-0">이름 : {selectedStudent?.name}</span>
              </div>
              <div className="flex space-x-2">
                <span className="shrink-0">사유 :</span>

                <select {...register('status')}>
                  {ATTENDANCE_STATUS.map(status => (
                    <option
                      key={status}
                      value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="btn shrink-0">
              등록하기
            </button>
          </motion.div>
        )}
        <div className="card min-h-[10vh] max-h-[50vh] p-4 flex-col gap-1 overflow-y-auto">
          {attendance?.length === 0 && (
            <div className="w-full m-auto text-center">모두 출석했어요</div>
          )}
          {attendance?.map((list, index) => {
            return (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 * index }}
                  className="w-full flex justify-evenly  items-center">
                  <div className="w-[25%]">이름: {list.student.name}</div>
                  <div className="w-[20%]">사유: {list.status}</div>
                  <button
                    type="button"
                    className="btn shrink-0"
                    onClick={() => setIsDeletePopupOpen(true)}>
                    삭제
                  </button>
                </motion.div>
                <DeletePopup
                  isOpen={isDeletePopupOpen}
                  handleDelete={() => handleDelete(list.id)}
                  handleCancel={() => setIsDeletePopupOpen(false)}
                />
              </>
            )
          })}
        </div>
      </motion.form>
    </ModalLayout>
  )
}
