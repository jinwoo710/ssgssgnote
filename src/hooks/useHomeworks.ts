import { CreateHomework, Homework } from '@/types'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const fetchHomeworksApi = async () => {
  const response = await fetch('http://localhost:3000/homeworks')
  if (!response.ok) {
    throw Error('fail to fetch homeworks')
  }

  let homeworks = (await response.json()) as Homework[]
  homeworks.sort(
    (front, end) =>
      new Date(end.date).getTime() - new Date(front.date).getTime()
  )

  const studentsResponse = await fetch('http://localhost:3000/students')
  if (!studentsResponse.ok) {
    throw Error('fail to fetch students')
  }
  const students = await studentsResponse.json()
  return homeworks.map(homework => {
    const unsubmittedStudents = homework.unsubmittedStudentIds
      ? homework.unsubmittedStudentIds.map(id =>
          students.find((student: { id: string }) => student.id === id)
        )
      : []
    return { ...homework, unsubmittedStudents }
  })
}

const createHomeworkApi = async (homework: CreateHomework) => {
  const response = await fetch('http://localhost:3000/homeworks', {
    method: 'POST',
    body: JSON.stringify(homework)
  })
  if (!response.ok) {
    throw Error('fail to create homework')
  }
  return response.json()
}

export default function useHomeworks() {
  const queryClient = useQueryClient()

  const {
    data: homeworks,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['homeworks'],
    queryFn: fetchHomeworksApi
  })

  const { mutateAsync: createHomework, isPending } = useMutation({
    mutationFn: createHomeworkApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeworks'] })
    }
  })

  return {
    homeworks,
    isLoading: isLoading || isPending,
    isError,
    createHomework,
    isPending
  }
}
