import { CreateHomework, Homework, UpdateHomework } from '@/types'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const fetchHomeworksApi = async (studentId?: string): Promise<Homework[]> => {
  const response = await fetch(`/api/homeworks`)
  if (!response.ok) {
    throw Error('fail to fetch homeworks')
  }

  let homeworks = (await response.json()) as Homework[]
  homeworks.sort(
    (front, end) =>
      new Date(end.date).getTime() - new Date(front.date).getTime()
  )

  const studentsResponse = await fetch(`/api/students`)
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
  const response = await fetch(`/api/homeworks`, {
    method: 'POST',
    body: JSON.stringify(homework)
  })
  if (!response.ok) {
    throw Error('fail to create homework')
  }
  return response.json()
}

const updateHomeworkApi = async (homework: UpdateHomework) => {
  const response = await fetch(`/api/homeworks/${homework.id}`, {
    method: 'PUT',
    body: JSON.stringify(homework)
  })
  if (!response.ok) {
    throw Error('fail to update homework')
  }
  return response.json()
}

const deleteHomeworkApi = async (homeworkId: string) => {
  const response = await fetch(`/api/homeworks/${homeworkId}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw Error('fail to delete homework')
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

  const { mutateAsync: deleteHomework, isPending: isDeletePending } =
    useMutation({
      mutationFn: deleteHomeworkApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['homeworks'] })
      }
    })

  return {
    homeworks,
    isLoading: isLoading || isPending || isUpdatePending || isDeletePending,
    isError,
    createHomework,
    updateHomework,
    deleteHomework
  }
}
