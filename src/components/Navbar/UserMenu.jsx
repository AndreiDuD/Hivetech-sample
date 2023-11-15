import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ user, logout }) => {
  return (
    <>
      <Menu as="div" className="relative">
        <div className="flex items-center">
          <Menu.Button className="flex  items-center rounded-full bg-gray-800 text-sm">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={user.picture} alt="" loading="lazy"/>
            <div className="flex flex-col text-white font-normal ml-2 mr-2 max-w-[60px]">
              <div className="flex items-center justify-center">
                <span className="truncate ">{user.name}</span>
              </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="fixed z-10 mt-2 w-auto origin-top-right rounded-md bg-white">
            <Menu.Item>
              <Link
                to="/profile"
                className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 hover:text-white rounded-md"
              >
                Your Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <a
                className="flex px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white cursor-pointer rounded-md"
                onClick={() => {
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin,
                    },
                  });
                }}
              >
                Log out
              </a>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserMenu;
