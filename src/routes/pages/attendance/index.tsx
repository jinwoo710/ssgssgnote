import { DAYS } from '@/routes/constants/days'
import { useEffect, useState } from 'react'
import AttendanceModal from './components/AttendanceModal'
import useAttendance from '@/hooks/useAttendance'

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { attendance, isLoading, isError } = useAttendance()

  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = (date: Date) => {
    setSelectedDate(date)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedDate(null)
    setIsOpen(false)
  }

  const calculateDates = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    let days = []
    for (let i = firstDay.getDay(); i > 0; i--) {
      days.push(new Date(year, month, 1 - i))
    }
    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    for (let i = 1; i < 7 - lastDay.getDay(); i++) {
      days.push(new Date(year, month + 1, i))
    }

    days = days.filter(day => day.getDay() !== 0 && day.getDay() !== 6)
    setCalendarDays(days)
  }

  useEffect(() => {
    calculateDates(currentDate)
  }, [currentDate])

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div
      className="white-paper flex-col space-y-4"
      style={{
        backgroundImage: 'linear-gradient(#eee 1px, transparent 1px)',
        backgroundSize: '100% 25px'
      }}>
      <div className="flex flex-col w-full bg-orange-200 mx-auto">
        <span>출석부</span>
        <div className="grid grid-cols-5 gap-1">
          {DAYS.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {calendarDays.map((date, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(date)}
              className="flex bg-white cursor-pointer flex-col justify-start items-center border border-black rounded-2xl min-h-[100px]">
              <span className="text-xl rounded-t-2xl border-b border-gray-400 w-full text-center">
                {date.getDate()}
              </span>
              {attendance
                ?.filter(
                  (attendance: { date: string }) =>
                    attendance.date ===
                    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                )
                ?.map((student: { studentName: string }) => (
                  <span key={student.studentName}>{student.studentName}</span>
                ))}
            </div>
          ))}
        </div>
      </div>
      <AttendanceModal
        onClose={handleCloseModal}
        isOpen={isOpen}
        date={selectedDate}
      />
    </div>
  )
}
