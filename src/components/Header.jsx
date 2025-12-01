import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  return (
    <header className="grid grid-cols-4 p-16">
      <Link className="col-span-1 flex items-center gap-8 text-white1" to="/">
        <img src="/android-chrome-192x192.png" width={40} height={40} alt="logo" />
        <div className="hidden md:block font-medium">Crypto Dashboard</div>
      </Link>

      <nav className="col-span-2 flex justify-center items-center gap-16">
        <Link
          className={`${location.pathname === '/spot' ? 'text-white1 font-bold' : 'text-white-65 hover:text-white-80 transition duration-150 ease-in-out'}`}
          to="/spot"
        >
          <i className="mr-4 fa-solid fa-chart-simple"></i>
          Spot
        </Link>
        <Link
          className={`${location.pathname === '/futures' ? 'text-white1 font-bold' : 'text-white-65 hover:text-white-80 transition duration-150 ease-in-out'}`}
          to="/futures"
        >
          <i className="mr-4 fa-solid fa-scroll"></i>
          Futures
        </Link>
      </nav>
    </header>
  )
}

export default Header
