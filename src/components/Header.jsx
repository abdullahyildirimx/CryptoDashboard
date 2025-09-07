import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <div className="grid grid-cols-6 p-4">
      <a className="col-span-1 md:col-span-2 flex items-center text-white-100" href="/">
        <img className="mr-2" src="/android-chrome-192x192.png" width={40} alt="logo" />
        <div className='hidden md:block font-medium'>Crypto Dashboard</div>
      </a>

      <div className={`col-span-4 md:col-span-2 flex justify-center items-center`}>
        <Link
          className={`px-2 ${location.pathname === '/spot' ? 'text-white-100 font-bold' : 'text-white-65 hover:text-white-80 transition duration-150 ease-in-out'}`}
          to="/spot"
        >
          <i className="mx-1 fa-solid fa-chart-simple"></i>
          Spot
        </Link>
        <Link
          className={`px-2 ${location.pathname === '/futures' ? 'text-white-100 font-bold' : 'text-white-65 hover:text-white-80 transition duration-150 ease-in-out'}`}
          to="/futures"
        >
          <i className="mx-1 fa-solid fa-scroll"></i>
          Futures
        </Link>
      </div>
    </div>
  );
};

export default Header;