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
  date: string
  description: string
  unsubmittedStudentIds: string[]
  unsubmittedStudents: Student[]
}

export interface CreateHomework {
  title: string
  date: string
  description: string
  unsubmittedStudentIds: string[]
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
