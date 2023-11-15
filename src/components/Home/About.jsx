import Accordion from "./accordion";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";
import useCustomTranslation from "../../customTranslation";

const About = () => {
  const { t } = useCustomTranslation();
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t("home.about.sub_title")}</p>
        <h2 className={styles.heroHeadText}>{t("home.about.title")}</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        {t("home.about.text")}
      </motion.p>
      <Accordion />
    </>
  );
};

const AboutSection = SectionWrapper(About, 'about');
export default AboutSection;
