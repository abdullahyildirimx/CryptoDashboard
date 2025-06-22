import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/useScreenSize';
{/*import SettingsModal from './SettingsModal';*/}

const MenuHeader = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <nav className="navbar navbar-expand-md p-3">
      <a className={`${isMobile ? 'col-2' : 'col-4'} btn-link icon-button d-flex align-items-center text-decoration-none text-white`} href="/">
        <img className="mx-1" src="/logo192.png" width={40} alt="logo" />
        {!isMobile && <div>Crypto Dashboard</div>}
      </a>

      <div className={`${isMobile ? 'col-8' : 'col-4'} d-flex justify-content-center`}>
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item">
            <Link
              className={`nav-link px-2 ${location.pathname === '/spot' && 'active fw-bold'}`}
              to="/spot"
            >
              <i className="mx-1 fa-solid fa-chart-simple"></i>
              Spot
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link px-2 ${location.pathname === '/futures' && 'active fw-bold'}`}
              to="/futures"
            >
              <i className="mx-1 fa-solid fa-scroll"></i>
              Futures
            </Link>
          </li>
        </ul>
      </div>

      <div className={`${isMobile ? 'col-2' : 'col-4'} d-flex justify-content-end`}>
        {/*<SettingsModal />*/}
      </div>
    </nav>
  );
};

export default MenuHeader;