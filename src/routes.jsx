import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AccessControl from './AccessControl';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import AL from './components/Solutions/AL';
import BBM from './components/Solutions/BBM';
import CFO from './components/Solutions/CFO';
import FCVA from './components/Solutions/FCVA';
import SA from './components/Solutions/SA';
import SafeSend from './components/Solutions/SafeSend/Safe_send';
import NotFound from './not_found';

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: '-100%',
  },
  enter: {
    opacity: 1,
    x: '0%',
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
    },
  },
};

export function RoutesConfig({ user, isAuthenticated }) {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const roles = user?.app_metadata?.roles || [];

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial='initial'
        animate='enter'
        exit='exit'
        variants={pageTransitionVariants}
      >
        <AccessControl
          isAuthenticated={isAuthenticated}
          roles={roles}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
          onAuthorized={setIsAuthorized}
        />
        <Routes location={location}>
          <Route path='/' element={<Home />} />
          <Route path='/securetransmit' element={isAuthorized ? <SafeSend /> : <Navigate to='/' />} />
          <Route path='/dataBenchmark-pro' element={<BBM />} />
          <Route path='/vehicleVision-analytics' element={<AL />} />
          <Route path='/financefocus-navigator' element={<CFO />} />
          <Route path='/financeguard-assistant' element={<FCVA />} />
          <Route path='/sellmetrics-pro' element={<SA />} />
          <Route path='/profile' element={isAuthenticated ? <Profile /> : <Navigate to='/' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

RoutesConfig.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};
