import { DAYS } from '@/routes/constants/days'
import { useEffect, useState } from 'react'
import AttendanceModal from './components/AttendanceModal'
import useAttendance from '@/hooks/useAttendance'
import { Student } from '@/types'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { motion } from 'framer-motion'

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
    <>
      <div
        className="white-paper flex-col space-y-4"
        style={{
          backgroundImage: 'linear-gradient(#eee 1px, transparent 1px)',
          backgroundSize: '100% 25px'
        }}>
        <div className="flex flex-col w-full mx-auto">
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
                <div className="flex flex-col p-2 gap-1 w-full">
                  {attendance
                    ?.filter(
                      (attendance: { date: string }) =>
                        attendance.date ===
                        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                    )
                    ?.map(
                      (student: { student: Student }, studentIndex: number) => (
                        <motion.div
                          className="w-full"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05 + studentIndex * 0.1
                          }}>
                          <div className="md:hidden">
                            <StudentNameTag
                              student={student.student}
                              key={student.student.id}
                              miniVersion
                              sliceVersion
                            />
                          </div>
                          <div className="hidden md:block">
                            <StudentNameTag
                              student={student.student}
                              key={student.student.id}
                              sliceVersion
                            />
                          </div>
                        </motion.div>
                      )
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AttendanceModal
        onClose={handleCloseModal}
        isOpen={isOpen}
        date={selectedDate}
      />
    </>
  )
}
