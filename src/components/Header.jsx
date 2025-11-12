import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="grid grid-cols-6 p-16">
      <Link className="col-span-1 md:col-span-2 flex items-center text-white-100" to="/">
        <img className="mr-8" src="/android-chrome-192x192.png" width={40} alt="logo" />
        <div className='hidden md:block font-medium'>Crypto Dashboard</div>
      </Link>

      <nav className={`col-span-4 md:col-span-2 flex justify-center items-center gap-16`}>
        <Link
          className={`btn ${location.pathname === '/spot' ? 'text-white-100 font-bold' : 'text-white-65 hover:text-white-80 transition duration-150 ease-in-out'}`}
          to="/spot"
        >
          <i className="mr-4 fa-solid fa-chart-simple"></i>
          Spot
        </Link>
        <Link
          className={`btn ${location.pathname === '/futures' ? 'text-white-100 font-bold' : 'text-white-65 hover:text-white-80 transition duration-150 ease-in-out'}`}
          to="/futures"
        >
          <i className="mr-4 fa-solid fa-scroll"></i>
          Futures
        </Link>
      </nav>
    </header>
  );
};

export default Header;