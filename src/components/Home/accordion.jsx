import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import useCustomTranslation from "../../customTranslation";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function AboutAccordion() {
  const { t } = useCustomTranslation();
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
  const accordionData = t("home.about.accordion", { returnObjects: true });

  return (
    <Fragment>
      <div className="mt-5">
        {accordionData.map((item) => (
          <motion.div key={item.id} variants={fadeIn("top", "", 0.2, 3)}>
            <Accordion
              key={item.id}
              open={open === item.id}
              animate={customAnimation}
              icon={<Icon id={item.id} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(item.id)}
                className={`border-b-0 transition-colors ${
                  open === item.id
                    ? "text-blue-500 hover:!text-blue-700"
                    : "hover:!text-blue-400"
                } text-left`}
              >
                {item.title}
              </AccordionHeader>
              <AccordionBody className="text-gray-400">
                {item.content}
              </AccordionBody>
            </Accordion>
          </motion.div>
        ))}
      </div>
    </Fragment>
  );
}
Icon.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.number.isRequired,
};
