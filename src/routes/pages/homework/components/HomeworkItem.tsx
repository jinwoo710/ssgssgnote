import type { Homework } from '@/types'

export default function HomeworkItem({
  title,
  description,
  startDate,
  endDate,
  unsubmittedStudents
}: Homework) {
  return (
    <div className="card flex-col w-full">
      <div className="flex justify-start items-center">
        <div>{startDate}</div>
        <div>{endDate}</div>
      </div>
      <div className="flex justify-between items-center">
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  )
}
