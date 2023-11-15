import { lazy, Suspense } from 'react';
import { SA } from '../../assets/index';
import Spinner from '../Home/Spinner/loader_spin';
import Home from './Template/Home';

//lazy load components
const LazyAbout = lazy(() => import('./Template/About'));
const LazyFeatures = lazy(() => import('./Template/Features'));

const Hero = () => {
  let pageNamespace = 'sa';
  const homeData = SA.find((section) => section.id === 'home');
  const analyticsData = SA.find((section) => section.id === 'analytics');
  const featureData = SA.find((section) => section.id === 'features');
  return (
    <>
      <Home homeData={homeData} pageNamespace={pageNamespace} />
      <Suspense fallback={<Spinner />}>
        <LazyAbout analyticsData={analyticsData} style='SA' pageNamespace={pageNamespace} />
        <LazyFeatures featureData={featureData} style='SA' pageNamespace={pageNamespace} />
      </Suspense>
    </>
  );
};

export default Hero;
