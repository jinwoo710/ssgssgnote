import { DAYS } from '@/routes/constants/days'
import { useEffect, useState } from 'react'
import AttendanceModal from './components/AttendanceModal'
import useAttendance from '@/hooks/useAttendance'
import { Student } from '@/types'
import StudentNameTag from '@/routes/components/StudentNameTag'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { attendance } = useAttendance({})

  const [calendarDays, setCalendarDays] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const currentYear = new Date().getFullYear()

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 3 + i)
  const months = Array.from({ length: 12 }, (_, i) => i)

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

  useEffect(() => {
    setCurrentDate(new Date(year, month))
  }, [year, month])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value))
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value))
  }

  const handlePreviousMonth = () => {
    let selectedYear = year
    let selectedMonth = month
    if (month === 0) {
      selectedYear -= 1
      selectedMonth = 11
    } else {
      selectedMonth -= 1
    }

    if (years.includes(selectedYear)) {
      setYear(selectedYear)
      setMonth(selectedMonth)
    }
  }

  const handleNextMonth = () => {
    let selectedYear = year
    let selectedMonth = month
    if (month === 11) {
      selectedYear += 1
      selectedMonth = 0
    } else {
      selectedMonth += 1
    }

    if (years.includes(selectedYear)) {
      setYear(selectedYear)
      setMonth(selectedMonth)
    }
  }

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
      <div className="white-paper flex-col space-y-4">
        <div className="flex flex-col w-full mx-auto">
          <span className="text-2xl">출석부</span>
          <div className="w-full flex justify-center items-center space-x-4 m-2">
            <button
              onClick={handlePreviousMonth}
              className="cursor-pointer text-2xl">
              {'<'}
            </button>
            <select
              value={year}
              className="cursor-pointer text-2xl"
              onChange={handleYearChange}>
              {years.map(year => (
                <option
                  key={year}
                  value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select
              value={month}
              className="cursor-pointer text-2xl"
              onChange={handleMonthChange}>
              {months.map(monthIndex => (
                <option
                  key={monthIndex}
                  value={monthIndex}>
                  {monthIndex + 1}월
                </option>
              ))}
            </select>
            <button
              onClick={handleNextMonth}
              className="cursor-pointer text-2xl">
              {'>'}
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {DAYS.map(day => (
              <div
                key={day}
                className="w-full text-center text-2xl">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1">
            {calendarDays.map((date, index) => (
              <motion.div
                whileHover={{
                  scale: 1.03,
                  transition: { type: 'tween', duration: 0.2 }
                }}
                key={index}
                onClick={() => handleOpenModal(date)}
                className="flex bg-white cursor-pointer flex-col justify-start items-center border border-black rounded-2xl min-h-[100px]">
                <span
                  className={`${date.getMonth() === month ? '' : 'text-gray-500'} ${isToday(date) ? 'text-blue-800' : ''} text-xl rounded-t-2xl border-b border-gray-400 w-full text-center ${isToday(date) ? 'bg-gray-100' : ''}`}>
                  {isToday(date) ? `오늘 (${date.getDate()})` : date.getDate()}
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
                        <AnimatePresence
                          mode="popLayout"
                          key={`attendance-presence-${date.getTime()}-${student.student.id}`}>
                          <React.Fragment
                            key={`attendance-${date.getTime()}-${student.student.id}-${studentIndex}`}>
                            {studentIndex < 5 && (
                              <motion.div
                                className="w-full"
                                initial={{ opacity: 0, y: 10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  type: 'tween'
                                }}>
                                <div className="md:hidden">
                                  <StudentNameTag
                                    student={student.student}
                                    miniVersion
                                    sliceVersion
                                  />
                                </div>
                                <div className="hidden md:block">
                                  <StudentNameTag
                                    student={student.student}
                                    sliceVersion
                                  />
                                </div>
                              </motion.div>
                            )}
                            {studentIndex == 5 && (
                              <motion.div
                                key={`more-${date.getTime()}`}
                                className="w-full"
                                initial={{ opacity: 0, y: 10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  type: 'tween',
                                  delay: 0.3
                                }}>
                                <div className="bg-gray-200 rounded-lg border border-black flex justify-center items-center text-center">
                                  더보기
                                </div>
                              </motion.div>
                            )}
                          </React.Fragment>
                        </AnimatePresence>
                      )
                    )}
                </div>
              </motion.div>
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
