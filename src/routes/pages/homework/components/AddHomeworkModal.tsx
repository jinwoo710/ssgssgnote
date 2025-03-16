import useHomeworks from '@/hooks/useHomeworks'
import useStudents from '@/hooks/useStudents'
import FormInput from '@/routes/components/FormInput'
import ModalLayout from '@/routes/components/ModalLayout'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { CreateHomework, Student } from '@/types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface AddHomeworkModalProps {
  onClose: () => void
  isOpen: boolean
}
export default function AddHomeworkModal({
  onClose,
  isOpen
}: AddHomeworkModalProps) {
  const { students } = useStudents()
  const { createHomework } = useHomeworks()
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateHomework>()

  const handleClose = () => {
    reset()
    setSelectedStudents([])
    onClose()
  }

  const handleStudentClick = (student: Student) => {
    setSelectedStudents(prev => [...prev, student])
  }

  const handleSelectedStudentClick = (student: Student) => {
    setSelectedStudents(prev => prev.filter(s => s.id !== student.id))
  }

  const onSubmit = async (data: CreateHomework) => {
    try {
      data.unsubmittedStudentIds = selectedStudents.map(students => students.id)
      await createHomework(data)
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ModalLayout
      onClose={handleClose}
      isOpen={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="modal-card max-w-[600px]">
        <FormInput
          register={register}
          errors={errors}
          name="title"
          label="제목"
          registerOptions={{ required: '제목을 입력해주세요' }}
        />
        <FormInput
          register={register}
          errors={errors}
          name="description"
          label="내용"
          registerOptions={{ required: '내용을 입력해주세요' }}
        />
        <FormInput
          register={register}
          errors={errors}
          name="date"
          label="날짜"
          type="date"
          registerOptions={{ required: '날짜를 입력해주세요' }}
        />
        <div className="w-full flex flex-col gap-2">
          <span>제출 학생</span>
          <div className="card flex-wrap gap-1 p-2 max-h-[20vh] min-h-10 overflow-y-auto">
            {students
              ?.filter(
                student =>
                  !selectedStudents.some(
                    selectedStudent => selectedStudent.id === student.id
                  )
              )
              .map(student => {
                return (
                  <div
                    key={student.id}
                    onClick={() => handleStudentClick(student)}
                    className="w-fit cursor-pointer">
                    <StudentNameTag
                      student={student}
                      simpleVersion
                    />
                  </div>
                )
              })}
          </div>
          <span>미제출 학생</span>
          <div className="card flex-wrap gap-1 p-2  max-h-[20vh] min-h-10 overflow-y-auto">
            {selectedStudents.length == 0 && (
              <span className="mx-auto">모두 제출했어요!</span>
            )}
            {selectedStudents.map(student => (
              <div
                key={student.id}
                onClick={() => handleSelectedStudentClick(student)}
                className="w-fit cursor-pointer">
                <StudentNameTag
                  student={student}
                  simpleVersion
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn"
          type="submit">
          추가하기
        </button>
      </form>
    </ModalLayout>
  )
}
