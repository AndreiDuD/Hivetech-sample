import { BBM } from "../../assets/index";
import Home from "./Template/Home";
import { lazy, Suspense } from "react";
import Spinner from "../home/Spinner/loader_spin";

//lazy load components
const LazyAbout = lazy(() => import("./Template/About"));
const LazyFeatures = lazy(() => import("./Template/Features"));

const Bbm = () => {
  let pageNamespace = "bbm";
  const homeData = BBM.find((section) => section.id === "home");
  const analyticsData = BBM.find((section) => section.id === "analytics");
  const featureData = BBM.find((section) => section.id === "features");
  const demoLink = import.meta.env.VITE_DEMO_LINK_BBM;
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
        style="BBM"
        pageNamespace={pageNamespace}
        demoLink={demoLink}
      />
      <LazyFeatures featureData={featureData} pageNamespace={pageNamespace} />
      </Suspense>
    </>
  );
};

export default Bbm;
