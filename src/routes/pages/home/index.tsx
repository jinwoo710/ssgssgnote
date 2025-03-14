import { useForm } from 'react-hook-form'
import useStudents from '@/hooks/useStudents'
import { CreateStudent } from '@/types'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateStudent>()
  const { createStudent } = useStudents()
  const onSubmit = (data: CreateStudent) => {
    try {
      createStudent(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          className="border-rounded w-20 h-40 border-[1px] border-gray-300"
          {...register('studentId', { required: true, valueAsNumber: true })}
        />
        {errors.studentId && <span>학번을 입력해주세요</span>}
        <input {...register('name', { required: true })} />
        {errors.name && <span>이름을 입력해주세요</span>}
        <input
          {...register('gender', {
            required: true,
            validate: value => value === 'male' || value === 'female'
          })}
        />
        {errors.gender && <span>성별을 입력해주세요</span>}
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
