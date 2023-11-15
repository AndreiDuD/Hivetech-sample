import { SS } from "../../assets/index";
import Home from "./Template/Home";
import { lazy, Suspense } from "react";
import Spinner from "../../components/Home/Spinner/Spinner";

//lazy load components
const LazyAbout = lazy(() => import("./Template/About"));
const LazyFeatures = lazy(() => import("./Template/Features"));

const Hero = () => {
  let pageNamespace = "ss";
  const homeData = SS.find((section) => section.id === "home");
  const analyticsData = SS.find((section) => section.id === "analytics");
  const featureData = SS.find((section) => section.id === "features");
  return (
    <>
      <Home homeData={homeData} pageNamespace={pageNamespace} />
      <Suspense fallback={<Spinner />}>
      <LazyAbout
        analyticsData={analyticsData}
        style="SA"
        pageNamespace={pageNamespace}
      />
      <LazyFeatures
        featureData={featureData}
        style="SA"
        pageNamespace={pageNamespace}
      />
      </Suspense>
    </>
  );
};

export default Hero;
