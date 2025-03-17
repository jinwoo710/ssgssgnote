import useStudents from '@/hooks/useStudents'
import FormInput from '@/routes/components/FormInput'
import ModalLayout from '@/routes/components/ModalLayout'
import { CreateStudent } from '@/types'
import { useForm } from 'react-hook-form'

interface AddStudentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddStudentModal({
  isOpen,
  onClose
}: AddStudentModalProps) {
  const { createStudent } = useStudents()
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<CreateStudent>()

  const onSubmit = async (data: CreateStudent) => {
    try {
      await createStudent(data)
      handleClose()
    } catch (error) {
      console.log('Failed to create student:', error)
    }
  }

  const handleClose = () => {
    clearErrors()
    reset()
    onClose()
  }

  const inputContainerClass = 'flex items-center gap-4'
  const labelClass = 'w-10 shrink-0'
  return (
    <ModalLayout
      onClose={handleClose}
      isOpen={isOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="modal-card max-w-[400px]">
        <FormInput
          register={register}
          errors={errors}
          name="studentId"
          label="번호"
          registerOptions={{ required: '번호를 입력해주세요!' }}
        />
        <FormInput
          register={register}
          errors={errors}
          name="name"
          label="이름"
          registerOptions={{ required: '이름은 필수입니다.' }}
        />

        <div className={inputContainerClass}>
          <span className={labelClass}>성별</span>
          <div className="flex gap-4">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                className="radio radio-primary"
                {...register('gender')}
                defaultChecked
                type="radio"
                name="gender"
                value="male"
              />
              남자
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                className="radio radio-primary"
                {...register('gender')}
                type="radio"
                name="gender"
                value="female"
              />
              여자
            </label>
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
