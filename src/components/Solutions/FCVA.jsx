import { FCVA } from "../../assets/index";
import Home from "./Template/Home";
import { lazy, Suspense } from "react";
import Spinner from "../home/Spinner/loader_spin";

//lazy load components
const LazyAbout = lazy(() => import("./Template/About"));
const LazyFeatures = lazy(() => import("./Template/Features"));

const Hero = () => {
  let pageNamespace = "fcva";
  const homeData = FCVA.find((section) => section.id === "home");
  const analyticsData = FCVA.find((section) => section.id === "analytics");
  const featureData = FCVA.find((section) => section.id === "features");
  return (
    <>
      <Home homeData={homeData} pageNamespace={pageNamespace} />
      <Suspense fallback={<Spinner />}>
      <LazyAbout
        analyticsData={analyticsData}
        style="FCVA"
        pageNamespace={pageNamespace}
      />
      <LazyFeatures
        featureData={featureData}
        style="FCVA"
        pageNamespace={pageNamespace}
      />
      </Suspense>
    </>
  );
};

export default Hero;
