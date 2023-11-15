import PropTypes from "prop-types";
import useCustomTranslation from "../../../customTranslation";

const Features = ({ featureData, pageNamespace }) => {
  const features = featureData.feature;
  const { t } = useCustomTranslation();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 pt-24 pb-64 relative">
      <img
          className="absolute left-1/2 transform -translate-x-1/2 opacity-30 mt-96 sm:mt-0"
          src={featureData.img}
          alt="bbm circle"
          loading="lazy"
        />
        <div className="flex flex-wrap mt-36 justify-center relative z-10">
          <div className="md:-mt-20 w-full lg:w-4/12 px-4 text-center">
            {features
              .slice(0, Math.ceil(features.length / 2))
              .map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col mb-4 items-center text-center "
                >
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-black inline-flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-black">
                    {t(`${pageNamespace}.features.feature.${i}.title`)}
                  </h6>
                  <p className="mt-2 mb-4 text-black max-w-[70%]">
                    {t(`${pageNamespace}.features.feature.${i}.text`)}
                  </p>
                </div>
              ))}
          </div>
          <div className="w-full lg:w-4/12 px-4 text-center">
            <div className="mb-16 mt-0">
              <h2 className="text-5xl font-semibold text-black">
                {t(`${pageNamespace}.features.title`)}
              </h2>
            </div>
          </div>
          <div className="md:-mt-20 w-full lg:w-4/12 px-4 text-center">
            {features
              .slice(Math.ceil(features.length / 2))
              .map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-black inline-flex items-center justify-center">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-black">
                    {t(`${pageNamespace}.features.feature.${i}.title`)}
                  </h6>
                  <p className="mt-2 mb-4 text-black max-w-[70%]">
                    {t(`${pageNamespace}.features.feature.${i}.text`)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Features.propTypes = {
  featureData: PropTypes.shape({
    feature: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.elementType.isRequired,
      })
    ).isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  pageNamespace: PropTypes.string.isRequired,
};

export default Features;
