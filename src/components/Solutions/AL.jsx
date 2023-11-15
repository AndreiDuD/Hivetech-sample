import { AL } from "../../assets/index";
import Home from "./Template/Home";
import { lazy, Suspense } from "react";
import Spinner from "../home/Spinner/loader_spin";

//lazy load components
const LazyAbout = lazy(() => import("./Template/About"));
const LazyFeatures = lazy(() => import("./Template/Features"));

const Hero = () => {
  let pageNamespace = "al";
  const homeData = AL.find((section) => section.id === "home");
  const analyticsData = AL.find((section) => section.id === "analytics");
  const featureData = AL.find((section) => section.id === "features");
  const demoLink = import.meta.env.VITE_DEMO_LINK_AL;
  return (
    <>
      <Home
        homeData={homeData}
        pageNamespace={pageNamespace}
        demoLink={demoLink}
      />
      <Suspense fallback={<Spinner />}>
      <LazyAbout
        analyticsData={analyticsData}
        style="AL"
        pageNamespace={pageNamespace}
        demoLink={demoLink}
      />
      <LazyFeatures
        featureData={featureData}
        style="AL"
        pageNamespace={pageNamespace}
      />
      </Suspense>
    </>
  );
};

export default Hero;
