import { Link, useLocation } from 'react-router-dom';

const MenuFooter = () => {
  const location = useLocation();

  return (
    <footer className="fixed-bottom bg-dark text-white py-3">
      <div className="d-flex justify-content-around">
        <Link
          className={`nav-link ${location.pathname === '/home' ? 'active fw-bold' : 'text-secondary'}`}
          to="/home"
        >
          <i className="mx-1 fa-solid fa-house"></i>
          Home
        </Link>
        <Link
					className={`nav-link ${location.pathname === '/news' ? 'active fw-bold' : 'text-secondary'}`}
					to="/news"
        >
					<i className="mx-1 fa-solid fa-newspaper"></i>
					News
        </Link>
      </div>
    </footer>
    )
};

export default MenuFooter;