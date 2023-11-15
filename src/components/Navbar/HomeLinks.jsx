import useCustomTranslation from "../../customTranslation";
import PropTypes from "prop-types";

const HomeLinks = ({ active, setActive }) => {
  const { t } = useCustomTranslation();
  const navLinks = t("nav.navLinks", { returnObjects: true });
  return (
    <>
      {/* Normal navigation links (visible on larger screens) */}
      <ul className="list-none hidden sm:flex flex-row gap-10">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={`${
              active === link.title ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive(link.title)}
          >
            <a href={`#${link.id}`}>{link.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

HomeLinks.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default HomeLinks;
