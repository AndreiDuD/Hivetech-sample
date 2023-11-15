import { lazy, Suspense } from "react";
import Hero from "./Hero";
import Spinner from "./Spinner/loader_spin";

// Lazy load components
const LazyAbout = lazy(() => import("./About"));
const LazyProducts = lazy(() => import("./Products"));
const LazyWork = lazy(() => import("./Work"));
const LazyContact = lazy(() => import("./Contact"));
const LazyStarsCanvas = lazy(() => import("../canvas/StarsCanvas"));

const Home = () => {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <div className="bg-primary">
        <Suspense fallback={<Spinner />}>
          <LazyAbout />
          <LazyProducts />
          <LazyWork />
          <div className="relative z-0">
            <LazyContact />
            <LazyStarsCanvas />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Home;
