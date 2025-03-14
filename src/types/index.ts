export interface Student {
  id: string
  studentId: number
  name: string
  gender: 'male' | 'female'
}

export type CreateStudent = Omit<Student, 'id'>

export interface Homework {
  id: string
  title: string
  startDate: string
  endDate: string
  description: string
  unsubmittedStudents: number[]
}

export interface Consultation {
  id: string
  studentId: number
  date: string
  title: string
  content: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}
