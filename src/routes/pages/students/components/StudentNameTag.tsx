import boyIcon from '@/assets/images/boy.png'
import girlIcon from '@/assets/images/girl.png'
import { Student } from '@/types'

interface StudentNameTag {
  student: Student
}
export default function StudentNameTag({ student }: StudentNameTag) {
  return (
    <div
      key={student.id}
      className={`flex w-full rounded-lg p-4 space-x-2 border cursor-pointer h-fit ${student.gender == 'male' ? 'bg-blue-100' : 'bg-pink-100'}`}>
      <img
        src={student.gender == 'male' ? boyIcon : girlIcon}
        alt={student.gender == 'male' ? '남자' : '여자'}
        className="w-5 h-5 my-auto"
      />
      <span>
        {student.studentId} . {student.name}
      </span>
    </div>
  )
}
