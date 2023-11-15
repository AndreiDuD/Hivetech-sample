import PropTypes from "prop-types";
import Report from "./Report";
import { Link } from "react-router-dom";
import useCustomTranslation from "../../../customTranslation";

const About = ({ analyticsData, style, pageNamespace, demoLink }) => {
  const { t } = useCustomTranslation();

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img
          className="w-[400px] mx-auto my-4 object-contain"
          src={analyticsData.img}
          alt="/"
          loading="lazy"
        />
        <div className="flex flex-col justify-center">
          <p style={{ color: analyticsData.color }} className="font-bold">
            {t(`${pageNamespace}.analytics.intro`)}
          </p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-black">
            {t(`${pageNamespace}.analytics.title`)}
          </h1>
          {style === "AL" ? (
            <div className="text-black">
              <p style={{ color: analyticsData.color }} className="font-bold">
                {t(`${pageNamespace}.analytics.sub_headOne`)}
              </p>
              <p>{t(`${pageNamespace}.analytics.sub_textOne`)}</p>
              <p style={{ color: analyticsData.color }} className="font-bold">
                {t(`${pageNamespace}.analytics.sub_headTwo`)}
              </p>
              <p>{t(`${pageNamespace}.analytics.sub_textTwo`)}</p>
              <p style={{ color: analyticsData.color }} className="font-bold">
                {t(`${pageNamespace}.analytics.sub_headThree`)}
              </p>
              <p>{t(`${pageNamespace}.analytics.sub_textThree`)}</p>
            </div>
          ) : (
            <p className="text-black">{t(`${pageNamespace}.analytics.text`)}</p>
          )}

          <div className="flex justify-start gap-2">
            <Link
              to="/#contact"
              smooth='true'
              duration={500}
              spy='true'
              exact="true"
              className="flex bg-gray-300 w-[200px] my-14 rounded-md font-medium text-center justify-center"
            >
              <span className="ml-3 text-black mt-3">{t("buttons.start")}</span>
            </Link>

            <Report colorProperty={analyticsData} demoLink={demoLink} />
          </div>
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  analyticsData: PropTypes.shape({
    img: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.string.isRequired,
  pageNamespace: PropTypes.string.isRequired,
  demoLink: PropTypes.string,
};

export default About;
