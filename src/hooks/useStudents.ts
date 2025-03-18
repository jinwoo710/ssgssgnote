import { CreateStudent, Student } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchStudentsApi = async (): Promise<Student[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/students`
  )
  if (!response.ok) {
    throw Error('fail to fetch students')
  }
  return response.json()
}

const createStudentApi = async (student: CreateStudent): Promise<Student> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/students`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    }
  )
  if (!response.ok) {
    throw Error('fail to create student')
  }
  return response.json()
}

export default function useStudents() {
  const queryClient = useQueryClient()
  const {
    data: students,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudentsApi
  })

  const { mutateAsync: createStudent, isPending } = useMutation({
    mutationFn: createStudentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })

  return { students, isLoading: isLoading || isPending, isError, createStudent }
}
