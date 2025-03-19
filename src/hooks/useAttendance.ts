import { Attendance, CreateAttendance } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchAttendanceApi = async (
  date?: string,
  studentId?: string
): Promise<Attendance[]> => {
  let url = '/api/attendance'
  const params = []
  if (date) {
    params.push(`date=${date}`)
  }
  if (studentId) {
    params.push(`studentId=${studentId}`)
  }
  if (params.length > 0) {
    url += `?${params.join('&')}`
  }
  const response = await fetch(url)
  if (!response.ok) {
    throw Error('fail to fetch attendance')
  }
  return response.json()
}

const createAttendanceApi = async (attendance: CreateAttendance) => {
  const response = await fetch('/api/attendance', {
    method: 'POST',
    body: JSON.stringify(attendance)
  })
  if (!response.ok) {
    throw Error('fail to create attendance')
  }
  return response.json()
}

const updateAttendanceApi = async (attendance: Attendance) => {
  const response = await fetch(`/api/attendance/${attendance.id}`, {
    method: 'PUT',
    body: JSON.stringify(attendance)
  })
  if (!response.ok) {
    throw Error('fail to update attendance')
  }
  return response.json()
}

const deleteAttendanceApi = async (attendanceId: string) => {
  const response = await fetch(`/api/attendance/${attendanceId}`, {
    method: 'DELETE'
  })
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
