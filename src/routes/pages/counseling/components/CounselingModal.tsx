import FormInput from '@/routes/components/FormInput'
import ModalLayout from '@/routes/components/ModalLayout'
import {
  Counseling,
  CounselingType,
  CreateCounseling,
  Student,
  UpdateCounseling
} from '@/types'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import useCounseling from '@/hooks/useCounseling'
import { useEffect, useState } from 'react'
import DeletePopup from '@/routes/components/DeletePopup'

export interface CounselingModalProps {
  onClose: () => void
  isOpen: boolean
  student?: Student | null
  counseling?: Counseling | null
}
export default function CounselingModal({
  onClose,
  isOpen,
  student,
  counseling
}: CounselingModalProps) {
  const { createCounseling, updateCounseling, deleteCounseling } =
    useCounseling({})
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<CreateCounseling>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const handleDelete = async () => {
    try {
      if (counseling) {
        await deleteCounseling(counseling.id)
        handleClose()
      }
    } catch (error) {
      console.error('fail to delete counseling', error)
    }
  }
  const handleCancel = () => {
    setIsDeleteModalOpen(false)
  }

  const isEditMode = !!counseling

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && counseling) {
        reset({
          content: counseling.content,
          date: counseling.date,
          type: counseling.type,
          studentId: counseling.studentId
        })
      } else {
        reset({
          type: 'study',
          content: '',
          date: new Date().toISOString().substring(0, 10)
        })
      }
    }
  }, [counseling, reset, isOpen, isEditMode])

  const handleClose = () => {
    onClose()
    reset()
    setIsDeleteModalOpen(false)
  }

  const onSubmit = async (data: any) => {
    try {
      if (isEditMode && counseling) {
        const updateData: UpdateCounseling = {
          id: counseling.id,
          studentId: counseling.studentId,
          content: data.content,
          date: data.date,
          type: data.type as CounselingType
        }
        await updateCounseling(updateData)
      } else if (student) {
        const createData: CreateCounseling = {
          studentId: student.id,
          content: data.content,
          date: data.date,
          type: data.type as CounselingType
        }
        await createCounseling(createData)
      }
      handleClose()
    } catch (error) {
      console.error('fail to create or update counseling', error)
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
            {isEditMode ? '상담 수정하기' : '상담 추가하기'}
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer">
            닫기
          </button>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              className="radio radio-primary"
              {...register('type')}
              type="radio"
              value="study"
            />
            학업
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              className="radio radio-primary"
              {...register('type')}
              type="radio"
              value="friend"
            />
            교우
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              className="radio radio-primary"
              {...register('type')}
              type="radio"
              value="attitude"
            />
            태도
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              className="radio radio-primary"
              {...register('type')}
              type="radio"
              value="parent"
            />
            학부모
          </label>
        </div>
        <FormInput
          register={register}
          errors={errors}
          name="date"
          label="날짜"
          type="date"
          registerOptions={{ required: '날짜를 입력해주세요' }}
        />
        <FormInput
          register={register}
          errors={errors}
          name="content"
          label="내용"
          registerOptions={{ required: '내용을 입력해주세요' }}
        />

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
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="btn bg-gray-200 flex-6"
            type="submit">
            {isEditMode ? '수정하기' : '추가하기'}
          </motion.button>
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
