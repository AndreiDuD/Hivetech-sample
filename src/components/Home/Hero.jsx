import { ArrowDownIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import React, { lazy, Suspense } from 'react';
import useCustomTranslation from '../../customTranslation';
import { styles } from '../../styles';
import Video from './Video';

const Graph = lazy(() => import('../canvas/Graph/Graph'));

const Hero = () => {
  const { t } = useCustomTranslation();
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[50px] max-w-7x1 mx-auto flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <motion.div
            className='w-5 h-5 rounded-full bg-[#3F33FF]'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
          <motion.div
            className='w-1 sm:h-80 h-40 blue-gradient'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>
        <div>
          <motion.h1
            className={`${styles.heroHeadText} text-white`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            Hive<span className='text-[#3F33FF]'>tech</span>
          </motion.h1>
          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          >
            {t('home.hero.sloganOne')} <br className='sm:block hidden' /> {t('home.hero.sloganTwo')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          >
            <Video />
          </motion.div>
        </div>
      </div>
      <div className='absolute bottom-32 w-full flex justify-center items-center z-10'>
        <a href='#about' aria-label='Find out more on the about section'>
          <ArrowDownIcon className='h-16 w-16 text-gray-100 animate-bounce' />
        </a>
      </div>
      <div className='flex -z-50'>
        <Suspense fallback={<div>Loading...</div>}>
          <Graph />
        </Suspense>
      </div>
    </section>
  );
};

export default Hero;
