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

export interface UpdateHomework {
  id: string
  title: string
  date: string
  description: string
  unsubmittedStudentIds: string[]
}

export interface Counseling {
  id: string
  studentId: string
  student: Student
  date: string
  content: string
  type: CounselingType
}

export type CounselingType = 'study' | 'friend' | 'attitude' | 'parent'

export interface CreateCounseling {
  content: string
  date: string
  studentId: string
  type: CounselingType
}

export interface UpdateCounseling {
  id: string
  studentId: string
  content: string
  date: string
  type: CounselingType
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface Attendance {
  id: string
  studentId: string
  student: Student
  date: string
  status: string
}

export type CreateAttendance = Omit<Attendance, 'id' | 'student'>
