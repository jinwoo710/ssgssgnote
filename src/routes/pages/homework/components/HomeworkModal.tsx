import useHomeworks from '@/hooks/useHomeworks'
import useStudents from '@/hooks/useStudents'
import FormInput from '@/routes/components/FormInput'
import ModalLayout from '@/routes/components/ModalLayout'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { CreateHomework, Homework, Student } from '@/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import DeletePopup from '@/routes/components/DeletePopup'

export interface HomeworkModalProps {
  onClose: () => void
  isOpen: boolean
  homework?: Homework | null
}
export default function HomeworkModal({
  onClose,
  isOpen,
  homework
}: HomeworkModalProps) {
  const { students, isLoading } = useStudents()
  const { createHomework, updateHomework, deleteHomework } = useHomeworks()
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateHomework>()

  const isEditMode = !!homework
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && homework) {
        reset({
          title: homework.title,
          description: homework.description,
          date: homework.date
        })
        setSelectedStudents(homework.unsubmittedStudents)
      } else {
        reset({
          title: '',
          description: '',
          date: new Date().toISOString().substring(0, 10)
        })
        setSelectedStudents([])
      }
    }
  }, [homework, reset, isOpen, isEditMode])

  const handleClose = () => {
    onClose()
    reset({
      title: '',
      description: '',
      date: new Date().toISOString().substring(0, 10)
    })
    setSelectedStudents([])
    setIsDeleteModalOpen(false)
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
      if (isEditMode) {
        await updateHomework({ ...data, id: homework!.id })
      } else {
        await createHomework(data)
      }
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDelete = async () => {
    try {
      if (homework) {
        await deleteHomework(homework.id)
        handleClose()
      }
    } catch (error) {
      console.error('fail to delete homework', error)
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
          <div />
          <span className="text-2xl">
            {isEditMode ? '숙제 수정하기' : '숙제 추가하기'}
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer">
            닫기
          </button>
        </div>
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
        <motion.div
          layout
          className="w-full flex flex-col gap-2">
          <span>제출 학생</span>
          <div className="card flex-wrap gap-1 p-2 max-h-[20vh] min-h-10 overflow-y-auto">
            <AnimatePresence>
              {isLoading
                ? [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="w-20 card border-none h-[58px] bg-gray-200 animate-pulse"></div>
                  ))
                : students
                    ?.filter(
                      student =>
                        !selectedStudents.some(
                          selectedStudent => selectedStudent.id === student.id
                        )
                    )
                    .map(student => {
                      return (
                        <motion.div
                          key={student.id}
                          onClick={() => handleStudentClick(student)}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            duration: 0.2
                          }}
                          className="w-fit cursor-pointer">
                          <StudentNameTag
                            student={student}
                            simpleVersion
                          />
                        </motion.div>
                      )
                    })}
            </AnimatePresence>
            {selectedStudents.length == students?.length && (
              <span className="mx-auto">아무도 제출하지 않았어요</span>
            )}
          </div>
          <span>미제출 학생</span>
          <div className="card flex-wrap gap-1 p-2  max-h-[20vh] min-h-10 overflow-y-auto">
            {selectedStudents.length == 0 && (
              <span className="mx-auto">모두 제출했어요!</span>
            )}
            {selectedStudents.map(student => (
              <motion.div
                key={student.id}
                onClick={() => handleSelectedStudentClick(student)}
                className="w-fit cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  duration: 0.2
                }}>
                <StudentNameTag
                  student={student}
                  simpleVersion
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="flex justify-between space-x-2">
          {isEditMode && (
            <motion.button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="btn flex-1 bg-red-200 shrink-0">
              삭제하기
            </motion.button>
          )}
          <button
            className="btn bg-gray-200 flex-6"
            type="submit">
            {isEditMode ? '수정하기' : '추가하기'}
          </button>
        </div>
      </motion.form>
      <DeletePopup
        isOpen={isDeleteModalOpen}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      />
    </ModalLayout>
  )
}
