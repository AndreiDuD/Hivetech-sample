import { Tooltip } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { logo, menu } from '../../assets';
import useCustomTranslation from '../../customTranslation';
import { styles } from '../../styles';
import HomeLinks from './HomeLinks';
import Language from './Language';
import Progress from './Progress';
import Sidebar from './Sidebar';
import Solutions from './Solutions';
import UserMenu from './UserMenu';
import './navbar.css';

const Navbar = () => {
  const { t } = useCustomTranslation();
  const [active, setActive] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useContext(UserContext);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSafeSendPage = location.pathname === '/safe-send';

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex item-center py-4 sticky top-0 left-0 z-30 ${
          isSafeSendPage ? 'bg-gray-900' : 'bg-primary'
        }`}
      >
        <div className='w-full flex justify-between items-center max-w-7x1 mx-auto'>
          <Tooltip
            className='bg-transparent'
            content='Back to home'
            placement='bottom-start'
            animate={{
              mount: { scale: 1, x: 25 },
              unmount: { scale: 0, x: 0 },
            }}
          >
            <Link
              to='/'
              className='flex items-center'
              onClick={() => {
                setActive('');
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} alt='logo' className='w-9 h-9 object-contain' loading='lazy' />
              <p className='ml-2 text-white text-[-18px] font-bold cursor-pointer hover:text-blue-500 flex'>Hivetech</p>
            </Link>
          </Tooltip>
          {/* Normal navigation links (visible on larger screens) */}

          <div className='list-none hidden sm:flex flex-row'>
            {isHomePage && <HomeLinks active={active} setActive={setActive} />}
            <a
              href='https://store.bdo.ro/'
              target='_blank' // Added target="_blank" to open the link in a new tab
              rel='noopener noreferrer'
              className='flex ml-9 text-secondary hover:text-white text-[18px] font-medium cursor-pointer'
            >
              {t('nav.store')}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mt-1 w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
                />
              </svg>
            </a>
            <Solutions />
            {isAuthenticated ? (
              <UserMenu user={user} logout={logout} isAuthenticated={isAuthenticated} loading={isLoading} />
            ) : (
              <button onClick={loginWithRedirect} className='button button--login'>
                Login
              </button>
            )}
            <Language />
          </div>
          {/* Mobile navigation (visible on smaller screens) */}
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            {/* Toggle button */}
            <img
              src={menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={handleMenuClick}
              loading='lazy'
            />
            {sidebarOpen && <Sidebar onCloseClick={handleCloseClick} isHomePage={isHomePage} />}
          </div>
        </div>
      </nav>
      {isHomePage && <Progress />}
    </>
  );
};

export default Navbar;
