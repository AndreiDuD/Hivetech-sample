import React, { useContext } from "react";
import { UserContext } from "../../App";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logo, close } from "../../assets/index";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useCustomTranslation from "../../customTranslation";
import { productData } from "../../assets/index";

export default function Sidebar({ onCloseClick, isHomePage }) {
  const [open, setOpen] = React.useState(0);
  const [profileClicked, setProfileClicked] = React.useState(false);
  const [logoutClicked, setLogoutClicked] = React.useState(false);
  const { user, loginWithRedirect, logout, isAuthenticated } =
    useContext(UserContext);
  const { t } = useCustomTranslation();
  const navLinks = t("nav.navLinks", { returnObjects: true });
  const roles = user?.app_metadata?.roles || [];
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleProfileClick = () => {
    setProfileClicked(true);
    setTimeout(() => {
      setProfileClicked(false);
    }, 500); // Adjust the duration (in milliseconds) as needed
  };

  const handleLogoutClick = () => {
    setLogoutClicked(true);
    setTimeout(() => {
      setLogoutClicked(false);
    }, 500); // Adjust the duration (in milliseconds) as needed
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  const handleClickLink = () => {
    onCloseClick(); // Close the sidebar menu
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <Card className="fixed top-1 right-1 w-full max-w-[20rem] max-h-[90%] p-2 shadow-xl shadow-gray-900">
      <div className="flex">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="mb-2 flex items-center gap-2 p-4">
            <img src={logo} alt="brand" className="h-8 w-8" loading="lazy"/>
            <Typography variant="h5" color="gray">
              Hivetech
            </Typography>
          </div>
        </Link>

        <button className="fixed top-6 right-6" onClick={onCloseClick}>
          <img
            src={close}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            loading="lazy"
          />
        </button>
      </div>
      <List>
        {isHomePage && (
          <>
            {navLinks.map((link) => (
              <ListItem key={link.id}>
                <a href={`#${link.id}`}>{link.title}</a>
              </ListItem>
            ))}
          </>
        )}
        <a
          href="https://store.bdo.ro/"
          target="_blank" // Added target="_blank" to open the link in a new tab
          rel="noopener noreferrer"
        >
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Store
          </ListItem>
        </a>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography
                color="gray"
                className="mr-auto font-normal text-[18px]"
              >
                Solutions
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <div className="overflow-y-auto h-[20vh] ml-5 scrollbar scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-slate-500">
              {/* Scrollable container */}
              <List className="p-0">
                {productData.map((solution) => {
                  if (
                    roles.includes(import.meta.env.VITE_APP_PAGE_ACCESS) ||
                    solution.title !== "Safe Send"
                  ) {
                    return (
                      <ListItem key={solution.title}>
                        <Link
                          to={solution.link}
                          onClick={handleClickLink}
                          className="flex"
                        >
                          <ListItemPrefix>
                            <img
                              src={solution.icon}
                              alt="logo"
                              className="h-8 w-8 mr-1 object-contain"
                              loading="lazy"
                            />
                          </ListItemPrefix>
                          {solution.title}
                        </Link>
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </List>
            </div>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        ></Accordion>

        {isAuthenticated ? (
          <>
            <ListItem
              className={`${
                profileClicked ? "bg-blue-300 text-gray" : "text-blue-500"
              }`}
              onClick={handleProfileClick}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 text-blue-500" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem
              className={`${
                logoutClicked ? "bg-red-300 text-white" : "text-red-500"
              }`}
              onClick={handleLogoutClick}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </>
        ) : (
          <ListItem
            className={`${
              logoutClicked ? "bg-blue-300 text-white" : "text-blue-500"
            }`}
            onClick={loginWithRedirect}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log In
          </ListItem>
        )}
      </List>
    </Card>
  );
}
Sidebar.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  isHomePage: PropTypes.bool.isRequired,
};
