import { Link } from 'react-router-dom'
import { EXTRA_MENU_ITEMS } from '../constants/menu'

export default function Header() {
  return (
    <div className="w-full flex gap-1 flex-col mt-10 z-0 transform translate-x-3">
      {EXTRA_MENU_ITEMS.map(menu => (
        <Link
          key={menu.title}
          to={menu.path}
          className={`bookmark ${menu.color}`}>
          {menu.title}
        </Link>
      ))}
    </div>
  )
}
