import useStudents from '@/hooks/useStudents'
import ModalLayout from '@/routes/components/ModalLayout'
import StudentNameTag from '@/routes/components/StudentNameTag'
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
  const { register, handleSubmit } = useForm()
  const { students } = useStudents()
  if (!date) return null
  const onSubmit = (data: any) => {}
  const targetDate = new Date(date)
  return (
    <ModalLayout
      onClose={onClose}
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
            onClick={onClose}
            className="cursor-pointer">
            닫기
          </button>
        </div>
        <div className="w-full flex p-2 flex-wrap gap-1 justify-center overflow-y-auto">
          {students?.map(student => (
            <div
              key={student.id}
              className="w-fit">
              <StudentNameTag
                student={student}
                miniVersion
              />
            </div>
          ))}
        </div>
      </form>
    </ModalLayout>
  )
}
