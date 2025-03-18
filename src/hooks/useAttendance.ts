import { Attendance, CreateAttendance } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchAttendanceApi = async (
  date?: string,
  studentId?: string
): Promise<Attendance[]> => {
  const url = new URL(`${import.meta.env.VITE_APP_SERVER_URL}/attendance`)
  if (date) {
    url.searchParams.append('date', date)
  }
  if (studentId) {
    url.searchParams.append('studentId', studentId)
  }
  const response = await fetch(url)
  const studentsResponse = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/students`
  )
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
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/attendance`,
    {
      method: 'POST',
      body: JSON.stringify(attendance)
    }
  )
  if (!response.ok) {
    throw Error('fail to create attendance')
  }
  return response.json()
}

const updateAttendanceApi = async (attendance: Attendance) => {
  const response = await fetch(
    `${import.meta.env._URL}/attendance/${attendance.id}`,
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

const deleteAttendanceApi = async (attendanceId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_SERVER_URL}/attendance/${attendanceId}`,
    {
      method: 'DELETE'
    }
  )
  if (!response.ok) {
    throw Error('fail to delete attendance')
  }
  return response.json()
}

export interface useAttendanceProps {
  date?: string
  studentId?: string
}

export default function useAttendance({ date, studentId }: useAttendanceProps) {
  const queryClient = useQueryClient()

  const {
    data: attendance,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['attendance', date, studentId],
    queryFn: () => fetchAttendanceApi(date, studentId)
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

  const { mutateAsync: deleteAttendance, isPending: isDeletePending } =
    useMutation({
      mutationFn: deleteAttendanceApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      }
    })

  return {
    attendance,
    isLoading: isLoading || isPending || isUpdatePending || isDeletePending,
    isError,
    createAttendance,
    updateAttendance,
    deleteAttendance
  }
}
