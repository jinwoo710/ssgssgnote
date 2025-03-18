import { CreateHomework, Homework, UpdateHomework } from '@/types'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const fetchHomeworksApi = async (studentId?: string): Promise<Homework[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/homeworks`
  )
  if (!response.ok) {
    throw Error('fail to fetch homeworks')
  }

  let homeworks = (await response.json()) as Homework[]
  homeworks.sort(
    (front, end) =>
      new Date(end.date).getTime() - new Date(front.date).getTime()
  )

  const studentsResponse = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/students`
  )
  if (!studentsResponse.ok) {
    throw Error('fail to fetch students')
  }
  const students = await studentsResponse.json()
  homeworks = homeworks.map(homework => {
    const unsubmittedStudents = homework.unsubmittedStudentIds
      ? homework.unsubmittedStudentIds.map(id =>
          students.find((student: { id: string }) => student.id === id)
        )
      : []
    return { ...homework, unsubmittedStudents }
  })

  if (studentId) {
    return homeworks.filter(
      homework =>
        homework.unsubmittedStudentIds &&
        homework.unsubmittedStudentIds.includes(studentId)
    )
  }
  return homeworks
}

const createHomeworkApi = async (homework: CreateHomework) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/homeworks`,
    {
      method: 'POST',
      body: JSON.stringify(homework)
    }
  )
  if (!response.ok) {
    throw Error('fail to create homework')
  }
  return response.json()
}

const updateHomeworkApi = async (homework: UpdateHomework) => {
  console.log(homework)
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/homeworks/${homework.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(homework)
    }
  )
  if (!response.ok) {
    throw Error('fail to update homework')
  }
  return response.json()
}

export default function useHomeworks(studentId?: string) {
  const queryClient = useQueryClient()

  const {
    data: homeworks,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['homeworks', studentId],
    queryFn: () => fetchHomeworksApi(studentId)
  })

  const { mutateAsync: createHomework, isPending } = useMutation({
    mutationFn: createHomeworkApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeworks'] })
    }
  })

  const { mutateAsync: updateHomework, isPending: isUpdatePending } =
    useMutation({
      mutationFn: updateHomeworkApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['homeworks'] })
      }
    })

  return {
    homeworks,
    isLoading: isLoading || isPending || isUpdatePending,
    isError,
    createHomework,
    updateHomework
  }
}
