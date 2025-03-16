import StudentNameTag from '@/routes/components/StudentNameTag'
import type { Homework } from '@/types'

export default function HomeworkItem({
  title,
  description,
  date,
  unsubmittedStudents
}: Homework) {
  return (
    <div
      className={`card flex-col w-full  min-h-30 p-4 ${unsubmittedStudents.length == 0 ? 'bg-blue-200' : 'bg-red-200'} transform hover:-translate-y-1 transition-all cursor-pointer`}>
      <div className="flex justify-start items-center">
        <div>{date}</div>
      </div>
      <div className="text-2xl mx-auto">{title}</div>
      <div className="text-gray-500 text-sm mx-auto">{description}</div>
      <div className="h-[1px] bg-black w-full my-1 mx-auto" />
      <div className="flex flex-wrap justify-center gap-1">
        {unsubmittedStudents.length === 0 && (
          <div className="w-fit">모두 제출했어요!</div>
        )}
        {unsubmittedStudents.map(student => (
          <div
            className="w-fit"
            key={student.id}>
            <StudentNameTag
              student={student}
              simpleVersion
              key={student.id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
