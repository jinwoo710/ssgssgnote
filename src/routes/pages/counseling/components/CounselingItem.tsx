import { Counseling, CounselingType } from '@/types'

interface CounselingItemProps {
  counseling: Counseling
}

export default function CounselingItem({ counseling }: CounselingItemProps) {
  const translator = (type: CounselingType) => {
    switch (type) {
      case 'study':
        return '학습'
      case 'friend':
        return '교우'
      case 'attitude':
        return '태도'
      case 'parent':
        return '학부모'
    }
  }
  const colorPicker = (type: CounselingType) => {
    switch (type) {
      case 'study':
        return 'bg-green-100'
      case 'friend':
        return 'bg-blue-100'
      case 'attitude':
        return 'bg-yellow-100'
      case 'parent':
        return 'bg-red-100'
    }
  }

  return (
    <div
      key={counseling.id}
      className={`card rounded-xl flex-col p-2 ${colorPicker(counseling.type)}`}>
      <div className="flex justify-between px-2">
        <div className="text-lg">{counseling.date}</div>
        <div className="text-lg">
          {counseling.student?.name} / {translator(counseling.type)}
        </div>
      </div>
      <div className="text-lg">{counseling.content}</div>
    </div>
  )
}
