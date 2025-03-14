import { Link } from 'react-router-dom'
import { MENU_ITEMS } from '../constants/menu'

export default function Header() {
  return (
    <div className="w-full flex gap-1 px-2">
      {MENU_ITEMS.map(menu => (
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
