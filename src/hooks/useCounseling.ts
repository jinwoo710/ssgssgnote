import { Counseling, CreateCounseling } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchCounselingApi = async (studentId?: string) => {
  const url = new URL(`${import.meta.env.VITE_APP_SERVER_URL}/counseling`)
  if (studentId) {
    url.searchParams.append('studentId', studentId)
  }
  const response = await fetch(url)
  if (!response.ok) {
    throw Error('fail to fetch counseling')
  }

  const studentsResponse = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/students`
  )
  if (!studentsResponse.ok) {
    throw Error('fail to fetch students')
  }
  const students = await studentsResponse.json()
  return (await response.json()).map((counseling: { studentId: string }) => {
    const student = students.find(
      (student: { id: string }) => student.id === counseling.studentId
    )
    return { ...counseling, student }
  })
}

const createCounselingApi = async (counseling: CreateCounseling) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/counseling`,
    {
      method: 'POST',
      body: JSON.stringify(counseling)
    }
  )
  if (!response.ok) {
    throw Error('fail to create counseling')
  }
  return response.json()
}

export default function useCounseling({ studentId }: { studentId?: string }) {
  const queryClient = useQueryClient()

  const {
    data: counselings,
    isLoading,
    isError
  } = useQuery<Counseling[]>({
    queryKey: ['counselings', studentId],
    queryFn: () => fetchCounselingApi(studentId)
  })

  const { mutateAsync: createCounseling, isPending } = useMutation({
    mutationFn: createCounselingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counseling'] })
    }
  })

  return {
    counselings,
    isLoading: isLoading || isPending,
    isError,
    createCounseling
  }
}
