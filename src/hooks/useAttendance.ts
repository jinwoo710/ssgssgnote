import { Attendance, CreateAttendance } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchAttendanceApi = async () => {
  const response = await fetch('http://localhost:3000/attendance')
  if (!response.ok) {
    throw Error('fail to fetch attendance')
  }
  return response.json()
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

export default function useAttendance() {
  const queryClient = useQueryClient()

  const {
    data: attendance,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['attendance'],
    queryFn: fetchAttendanceApi
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
