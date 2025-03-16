export interface MenuItem {
  title: string
  path: string
  color: string
}

export const MENU_ITEMS = [
  { title: '출석부', path: '/attendance', color: 'bg-yellow-200' },
  { title: '상담', path: '/counseling', color: 'bg-green-200' },
  { title: '숙제 관리', path: '/homework', color: 'bg-pink-200' },
  { title: '학생 관리', path: '/students', color: 'bg-blue-200' },
  { title: '시간표', path: '/timetable', color: 'bg-purple-200' },
  { title: '일정', path: '/schedule', color: 'bg-orange-200' }
]

export const EXTRA_MENU_ITEMS = [
  { title: '칠판', path: '/', color: 'bg-white' },
  ...MENU_ITEMS
]
