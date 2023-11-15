import { useContext, useRef, useState, lazy, Suspense } from "react";
import { AlertContext } from "../../Alerts/AlertProvider";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ScrollToSection from "./ScrollSection";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import useCustomTranslation from "../../customTranslation";
const NewEarth = lazy(() => import("../canvas/Earth"));
import { productData } from "../../assets/index";

const Contact = () => {
  const { showAlert } = useContext(AlertContext);
  const handleShowAlert = () => {
    showAlert(
      'warning', 
      "There are missing fields that must be filled in before submitting.",
      5000
    );
  };
  const { t } = useCustomTranslation();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [emptyFields, setEmptyFields] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (optionLabel) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(optionLabel)) {
        return prevOptions.filter((label) => label !== optionLabel);
      } else {
        return [...prevOptions, optionLabel];
      }
    });
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    setEmptyFields({
      ...emptyFields,
      [name]: value.trim() === "", // Check if the value is empty (after trimming whitespace)
    });
  };
  const inputBorderStyle = (fieldName) =>
    emptyFields[fieldName] ? "border-red-500" : ""; // Add border-red-500 class when the field is empty

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["name", "phone", "email", "message"];
    const missingFields = requiredFields.filter((field) => !form[field]);

    const newEmptyFields = {};
    requiredFields.forEach((field) => {
      newEmptyFields[field] = !form[field];
    });
    setEmptyFields(newEmptyFields);

    if (missingFields.length > 0 || selectedOptions.length === 0) {
      handleShowAlert();
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: form.name,
      to_name: "Hivetech BDO",
      from_email: form.email,
      to_email: "hivetech@bdo.ro",
      message: form.message,
      selected_products: selectedOptions.join(", "), // Join selected options with comma
      contact_number: form.phone,
    };

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert(
            'success', 
            "Thank you. We will get back to you as soon as possible.",
            5000
          );

          setForm({
            name: "",
            phone: "",
            email: "",
            message: "",
          });
          setSelectedOptions([]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert(
            'error', 
            "Ahh, something went wrong. Please try again.",
            5000
          );
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <ScrollToSection />
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>{t("contact.sub_title")}</p>
        <h3 className={styles.sectionHeadText}>{t("contact.title")}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className={`flex flex-col ${inputBorderStyle("name")}`}>
            <span className="text-white font-medium">
              {t("contact.solution")}
            </span>
          </label>
          {productData.map((option, index) => (
            <label className="flex items-center" key={index}>
              <input
                name={option.title}
                type="checkbox"
                className="appearance-none checked:bg-blue-500"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
              />
              <span className="ml-2 text-white font-medium">
                {option.title}
              </span>
            </label>
          ))}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.name")}
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("contact.name_placeholder")}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${inputBorderStyle(
                "name"
              )}`}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.phone")}
            </span>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="07XXXXXXXX"
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${inputBorderStyle(
                "name"
              )}`}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.email")}
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("contact.email_placeholder")}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${inputBorderStyle(
                "name"
              )}`}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              {t("contact.message")}
            </span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={t("contact.message_placeholder")}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${inputBorderStyle(
                "name"
              )}`}
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? t("contact.submit_load") : t("contact.submit")}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[450px]"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <NewEarth />
        </Suspense>
      </motion.div>
    </div>
  );
};

const ContactSection = SectionWrapper(Contact, "contact");
export default ContactSection;