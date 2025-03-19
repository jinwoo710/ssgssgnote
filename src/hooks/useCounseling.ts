import { Counseling, CreateCounseling, UpdateCounseling } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchCounselingApi = async (studentId?: string) => {
  let url = '/api/counseling'
  const params = []

  if (studentId) {
    params.push(`?studentId=${studentId}`)
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw Error('fail to fetch counseling')
  }
  return response.json()
}

const createCounselingApi = async (counseling: CreateCounseling) => {
  const response = await fetch(`/api/counseling`, {
    method: 'POST',
    body: JSON.stringify(counseling)
  })
  if (!response.ok) {
    throw Error('fail to create counseling')
  }
  return response.json()
}

const updateCounselingApi = async (counseling: UpdateCounseling) => {
  const response = await fetch(`/api/counseling/${counseling.id}`, {
    method: 'PUT',
    body: JSON.stringify(counseling)
  })
  if (!response.ok) {
    throw Error('fail to update counseling')
  }
  return response.json()
}

const deleteCounselingApi = async (id: string) => {
  const response = await fetch(`/api/counseling/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw Error('fail to delete counseling')
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
    queryKey: ['counseling', studentId],
    queryFn: () => fetchCounselingApi(studentId)
  })

  const { mutateAsync: createCounseling, isPending } = useMutation({
    mutationFn: createCounselingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counseling'] })
    }
  })

  const { mutateAsync: updateCounseling, isPending: isUpdatePending } =
    useMutation({
      mutationFn: updateCounselingApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['counseling'] })
      }
    })

  const { mutateAsync: deleteCounseling, isPending: isDeletePending } =
    useMutation({
      mutationFn: deleteCounselingApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['counseling'] })
      }
    })
  return {
    counselings,
    isLoading: isLoading || isPending || isUpdatePending || isDeletePending,
    isError,
    createCounseling,
    updateCounseling,
    deleteCounseling
  }
}
