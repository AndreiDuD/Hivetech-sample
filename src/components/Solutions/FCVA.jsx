import { lazy, Suspense } from 'react';
import { FCVA } from '../../assets/index';
import Spinner from '../Home/Spinner/loader_spin';
import Home from './Template/Home';

//lazy load components
const LazyAbout = lazy(() => import('./Template/About'));
const LazyFeatures = lazy(() => import('./Template/Features'));

const Hero = () => {
  let pageNamespace = 'fcva';
  const homeData = FCVA.find((section) => section.id === 'home');
  const analyticsData = FCVA.find((section) => section.id === 'analytics');
  const featureData = FCVA.find((section) => section.id === 'features');
  return (
    <>
      <Home homeData={homeData} pageNamespace={pageNamespace} />
      <Suspense fallback={<Spinner />}>
        <LazyAbout analyticsData={analyticsData} style='FCVA' pageNamespace={pageNamespace} />
        <LazyFeatures featureData={featureData} style='FCVA' pageNamespace={pageNamespace} />
      </Suspense>
    </>
  );
};

export default Hero;
