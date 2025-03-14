import { Link } from 'react-router-dom'

interface PostitProps {
  title: string
  path: string
  color: string
}

export default function Postit({ title, path, color }: PostitProps) {
  return (
    <Link
      to={path}
      className={`${color} transform hover:-translate-y-1 transition-transform
              w-32 h-32 sm:w-48 sm:h-48 rounded-lg shadow-lg
              flex flex-col items-center justify-center `}>
      <span className="text-xl lg:text-2xl font-semibold text-gray-800">
        {title}
      </span>
    </Link>
  )
}
