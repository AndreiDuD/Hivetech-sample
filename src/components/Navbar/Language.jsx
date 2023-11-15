import { useState, useEffect, useRef } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import useCustomTranslation from "../../customTranslation";
import ReactCountryFlag from "react-country-flag";

const Dropdown = () => {
  const { i18n } = useCustomTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const locales = {
    en: {
      title: "En",
      icon: <ReactCountryFlag countryCode="US" svg />,
    },
    ro: { title: "Ro", icon: <ReactCountryFlag countryCode="RO" svg /> },
  };
  const activeLanguage = i18n.language;
  const dropdownRef = useRef(null
    )
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="ml-4 relative flex flex-col items-center rounded-lg">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm w-full flex items-center justify-between font-bold rounded-lg tracking-wider border-transparent active:border-white duration-300 active:text-white" aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          className="option-icon h-6 w-10"
          data-v-37503e35=""
        >
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
            className="svg-path-class"
          ></path>
        </svg>
        {!isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
      </button>
      {isOpen && (
        <div className="bg-gray-800 absolute top-10 flex flex-col items-start rounded-lg p-1 w-[100px]">
          {Object.entries(locales).map(([key, value]) => (
            <div
              onClick={() => handleLanguageChange(key)}
              key={key}
              className={`flex w-full justify-between p-4 hover:bg-gray-500 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 ${
                activeLanguage === key ? "bg-gray-500" : ""
              }`}
            >
              <h3 className="font-bold">{value.title}</h3>
              <h3>{value.icon}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
