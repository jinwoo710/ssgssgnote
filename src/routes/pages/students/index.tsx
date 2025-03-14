import useStudents from '@/hooks/useStudents'
import StudentNameTag from './components/StudentNameTag'
import { useState } from 'react'
import { Student } from '@/types'

export default function Students() {
  const { students, isLoading, isError } = useStudents()
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  return (
    <div
      className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-6 lg:flex-row h-[90%] w-full p-4 lg:p-8 bg-white rounded-lg shadow-lg border-black border"
      style={{
        backgroundImage: 'linear-gradient(#eee 1px, transparent 1px)',
        backgroundSize: '100% 25px'
      }}>
      <div className="card lg:w-[260px] h-[300px] lg:h-full flex-col shrink-0">
        <div className="flex lg:block justify-between items-center bg-white rounded-t-xl border-b border-black">
          <div className="p-4 rounded-t-xl lg:border-b border-black font-bold bg-white text-center">
            학생 목록
          </div>
          <div className="p-3 border-b border-gray-200 rounded-t-xl bg-white">
            <input
              type="text"
              placeholder="이름으로 검색..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none border-black"
            />
          </div>
        </div>
        <div className="flex flex-col p-2 overflow-y-auto space-y-2">
          {students?.map(student => (
            <StudentNameTag
              key={student.id}
              student={student}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full h-full space-y-2">
        <div className="card min-h-[200px] p-4 flex-col"> </div>
        <div className="card min-h-[200px] p-4 flex-col"> </div>
        <div className="card min-h-[200px] p-4 flex-col"> </div>
      </div>
    </div>
  )
}
