import useAttendance from '@/hooks/useAttendance'
import useStudents from '@/hooks/useStudents'
import ModalLayout from '@/routes/components/ModalLayout'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { ATTENDANCE_STATUS } from '@/routes/constants/attendance'
import { CreateAttendance, Student } from '@/types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  const { createAttendance } = useAttendance()
  const { register, handleSubmit, reset } = useForm<CreateAttendance>()
  const { students } = useStudents()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const handleClose = () => {
    reset()
    setSelectedStudent(null)
    onClose()
  }
  if (!date) return null
  const onSubmit = (data: any) => {
    if (!selectedStudent) return
    try {
      createAttendance({
        studentId: selectedStudent?.id,
        studentName: selectedStudent?.name,
        date: `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`,
        status: data.status
      })
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }
  const targetDate = new Date(date)

  return (
    <ModalLayout
      onClose={handleClose}
      isOpen={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="modal-card max-w-[600px]">
        <div className="w-full flex justify-between">
          <div></div>
          <div className="cursor-default">
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
        <div className="w-full flex p-2 card flex-wrap gap-1 justify-center overflow-y-auto h-[16vh]">
          {students?.map(student => (
            <div
              key={student.id}
              className="w-fit cursor-pointer"
              onClick={() => setSelectedStudent(student)}>
              <StudentNameTag
                student={student}
                miniVersion
              />
            </div>
          ))}
        </div>
        {selectedStudent && (
          <div className="w-full flex-col md:flex-row justify-evenly items-center card p-1">
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
          </div>
        )}
      </form>
    </ModalLayout>
  )
}
