import { useIsMobile } from '../hooks/useScreenSize';

const MenuHeader = () => {
  const isMobile = useIsMobile();

  return (
    <div className='row p-3 g-0'>
      <div className='d-flex justify-content-between'>
        <a className="icon-button d-flex align-items-center" style={{color: 'white', textDecoration: 'none'}} href='/'>
          <img className='mx-1' src='/logo192.png' width={40}></img>
          {!isMobile && <div>Crypto Dashboard</div>}
        </a>
      </div>
    </div>
  );
}

export default MenuHeader;