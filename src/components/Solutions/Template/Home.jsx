import Typed from "typed.js";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Report from "./Report";
import { motion } from "framer-motion";
import useCustomTranslation from "../../../customTranslation";

const Home = ({ homeData, pageNamespace, demoLink }) => {
  const { t } = useCustomTranslation();
  const translatedStrings = t(`${pageNamespace}.home.list_attributes`, {
    returnObjects: true,
  });
  // Create Ref element.
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: translatedStrings,
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 150,
      backSpeed: 150,
      backDelay: 150,
      smartBackspace: true,
      loop: true,
      showCursor: false,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="text-white"
    >
      <div className="mt-10 mx-auto lg:px-64 px-4 h-screen mx-auto text-center flex flex-col justify-center">
        <p style={{ color: homeData.color }} className={`font-bold p-2`}>
          {t(`${pageNamespace}.home.intro`)}
        </p>
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center">
  <img
    src={homeData.logo}
    alt="logo"
    className="max-w-[220px] object-contain md:mr-6 mb-4 md:mb-0"
    loading="lazy"
  />
  <h1 className="md:text-7xl sm:text-5xl text-4xl font-bold text-center">
    {homeData.title}
  </h1>
</div>

        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4 min-h-[150px] overflow-hidden">
            {t(`${pageNamespace}.home.attributes`)}
            <span
              className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
              ref={el}
            ></span>
          </p>
        </div>

        <p className="md:text-2xl text-xl font-bold text-gray-500 p-2">
          {t(`${pageNamespace}.home.text`)}
        </p>
        <Report colorProperty={homeData} demoLink={demoLink} />
      </div>
    </motion.div>
  );
};
Home.propTypes = {
  homeData: PropTypes.shape({
    color: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  pageNamespace: PropTypes.string.isRequired,
  demoLink: PropTypes.string,
};

export default Home;
