import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { productData } from "../../assets/";
import { fadeIn, textVariant } from "../../utils/motion";
import useCustomTranslation from "../../customTranslation";
import { Tooltip } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ProjectCard = ({
  index,
  title,
  description,
  icon_with_text,
  icon,
  link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[50%] cover">
          <img
            src={icon_with_text}
            alt={title}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover motion-safe:animate-pulse">
            <Tooltip
              className="bg-transparent"
              content="Find out more!"
              placement="top-start"
              animate={{
                mount: { scale: 1, x: 0 },
                unmount: { scale: 0, x: 0 },
              }}
            >
              <Link
                to={link}
                className=" white-blue-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={icon}
                  alt="logo"
                  className="w-1/2 h-1/2 object-contain"
                  loading="lazy"
                />
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className="mt-5 ">
          <h3 className="text-white font-bold text-[24px]">{title}</h3>
          {description.length > 310 ? (
            <p className="mt-2 text-secondary text-[14px] overflow-hidden max-h-[9em] relative">
              {description}
              <Link to={link} className="pl-3 absolute bottom-0 right-0 text-white font-medium bg-tertiary hover:text-blue-500">
              Continue reading
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-secondary text-[14px] overflow-hidden max-h-[9em]">
              {description}
            </p>
          )}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Products = () => {
  const { t } = useCustomTranslation();
  const description = t("products.product_descriptions", {
    returnObjects: true,
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("products.sub_title")}</p>
        <h2 className={styles.heroHeadText}>{t("products.title")}</h2>
      </motion.div>
      <div className="flex flex-wrap gap-4">
        {productData.map((product, index) => (
          <ProjectCard
            key={`product-${index}`}
            index={index}
            description={description[index].description}
            {...product}
          />
        ))}
      </div>
    </>
  );
};

const ProductsSection = SectionWrapper(Products, "products");
export default ProductsSection;

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon_with_text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
