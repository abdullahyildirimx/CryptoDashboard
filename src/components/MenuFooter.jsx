import { Link, useLocation } from 'react-router-dom';

const MenuFooter = () => {
  const location = useLocation();

  return (
    <footer className="fixed-bottom bg-dark text-white py-3">
      <div className="d-flex justify-content-around">
        <Link
          className={`nav-link ${location.pathname === '/spot' ? 'active fw-bold' : 'text-secondary'}`}
          to="/spot"
        >
          <i className="mx-1 fa-solid fa-chart-simple"></i>
          Spot
        </Link>
        <Link
					className={`nav-link ${location.pathname === '/futures' ? 'active fw-bold' : 'text-secondary'}`}
					to="/futures"
        >
					<i className="mx-1 fa-solid fa-scroll"></i>
					Futures
        </Link>
      </div>
    </footer>
    )
};

export default MenuFooter;