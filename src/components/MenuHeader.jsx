import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/useScreenSize';
import SettingsModal from './SettingsModal';

const MenuHeader = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <nav className="navbar navbar-expand-md p-3">
      <a className="col-4 icon-button d-flex align-items-center" style={{ color: 'white', textDecoration: 'none' }} href="/home">
        <img className="mx-1" src="/logo192.png" width={40} alt="logo" />
        {!isMobile && <div>Crypto Dashboard</div>}
      </a>

      <div className="col-4 collapse navbar-collapse justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/spot' && 'active fw-bold'}`}
              to="/spot"
            >
              <i className="mx-1 fa-solid fa-chart-simple"></i>
              Spot
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/futures' && 'active fw-bold'}`}
              to="/futures"
            >
              <i className="mx-1 fa-solid fa-scroll"></i>
              Futures
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-4 d-flex justify-content-end">
        <SettingsModal />
      </div>
    </nav>
  );
};

export default MenuHeader;