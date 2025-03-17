import { Attendance, CreateAttendance } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchAttendanceApi = async (date?: string): Promise<Attendance[]> => {
  const url = new URL('http://localhost:3000/attendance')
  if (date) {
    url.searchParams.append('date', date)
  }
  const response = await fetch(url)
  const studentsResponse = await fetch('http://localhost:3000/students')
  if (!studentsResponse.ok) {
    throw Error('fail to fetch students')
  }

  const students = await studentsResponse.json()
  return (await response.json()).map((attendance: { studentId: string }) => {
    const student = students.find(
      (student: { id: string }) => student.id === attendance.studentId
    )
    return { ...attendance, student }
  })
}

const createAttendanceApi = async (attendance: CreateAttendance) => {
  const response = await fetch('http://localhost:3000/attendance', {
    method: 'POST',
    body: JSON.stringify(attendance)
  })
  if (!response.ok) {
    throw Error('fail to create attendance')
  }
  return response.json()
}

const updateAttendanceApi = async (attendance: Attendance) => {
  const response = await fetch(
    `http://localhost:3000/attendance/${attendance.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(attendance)
    }
  )
  if (!response.ok) {
    throw Error('fail to update attendance')
  }
  return response.json()
}

export default function useAttendance(date?: string) {
  const queryClient = useQueryClient()

  const {
    data: attendance,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['attendance', date],
    queryFn: () => fetchAttendanceApi(date)
  })

  const { mutateAsync: createAttendance, isPending } = useMutation({
    mutationFn: createAttendanceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
    }
  })

  const { mutateAsync: updateAttendance, isPending: isUpdatePending } =
    useMutation({
      mutationFn: updateAttendanceApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      }
    })

  return {
    attendance,
    isLoading: isLoading || isPending || isUpdatePending,
    isError,
    createAttendance,
    updateAttendance
  }
}
