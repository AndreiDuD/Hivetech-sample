import { Link } from 'react-router-dom';
import { logo } from '../../assets/index';

const Footer = () => {
  return (
    <footer className=' bg-primary p-4 sm:p-6 '>
      <div className='mx-auto max-w-screen-xl'>
        <div className='md:flex md:justify-between'>
          <div className='flex mb-6 md:mb-0'>
            <Link to='/' className='flex'>
              <img src={logo} className='h-8 w-8' alt='Hivetech Logo' loading='lazy' />
              <p className='mt-1 ml-2 text-white text-[-18px] font-bold cursor-pointer hover:text-blue-500 flex'>
                Hivetech
              </p>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-white uppercase dark:text-white'>Follow us</h2>
              <ul className='text-gray-400 dark:text-gray-400'>
                <li className='mb-4'>
                  <a href='/' className='hover:underline' target='_blank' rel='noopener noreferrer'>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href='/' className='hover:underline' target='_blank' rel='noopener noreferrer'>
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-white uppercase dark:text-white'>Legal</h2>
              <ul className='text-gray-400 dark:text-gray-400'>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-600 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-gray-400 sm:text-center dark:text-gray-400'>
            © 2023{' '}
            <a href='/' className='hover:underline' target='_blank' rel='noopener noreferrer'>
              Hivetech
            </a>{' '}
            -{' '}
            <a href='/' className='hover:underline' target='_blank' rel='noopener noreferrer'>
              BDO
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
