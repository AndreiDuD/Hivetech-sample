import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { productData } from "../../assets/index";
import { UserContext } from "../../App";
import useCustomTranslation from "../../customTranslation";
import AccessControl from "../../AccessControl";

export default function Solutions() {
  const { t } = useCustomTranslation();
  const [openMenu, setOpenMenu] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuItemClick = (link) => {
    navigate(link);
    window.scrollTo(0, 0);
  };
  const roles = user?.app_metadata?.roles || [];

  return (
    <React.Fragment>
    <AccessControl
          isAuthenticated={isAuthenticated}
          roles={roles}
          isLoaded={isLoaded}
          setIsLoaded={setIsLoaded}
          onAuthorized={setIsAuthorized}
        />
      <Menu open={openMenu} handler={setOpenMenu}>
        <MenuHandler>
          <button
            aria-label="Explore existing solutions"
            className="flex text-secondary hover:text-white duration-300 text-[18px] font-medium cursor-pointer mr-6 ml-9"
          >
           {t("nav.solutions")}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mt-1 w-5 transition-transform ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </button>
        </MenuHandler>
        <MenuList className="hidden grid overflow-visible">
          <ul className="flex w-full flex-col gap-1">
            {productData.map(({ title, color, link, icon }) => {
              // Check if the user is authorized and the menu item is not "Safe Send"
              if (isAuthorized || title !== "Safe Send") {
                return (
                  <MenuItem
                    key={title}
                    onClick={() => handleMenuItemClick(link)}
                    className="py-2 flex flex-wrap items-center hover:bg-gray-400"
                  >
                    <img
                      src={icon}
                      alt="logo"
                      className="h-8 w-8 mr-1 object-contain"
                      loading="lazy"
                    />
                    <Typography variant="h6" style={{ color }} className="mb-1">
                      {title}
                    </Typography>
                  </MenuItem>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}
