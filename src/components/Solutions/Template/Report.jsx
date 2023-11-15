import PropTypes from "prop-types";
import { useEffect, useState, useRef, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "../../../App";
import LoginDialog from "./LoginDialog";
import useCustomTranslation from "../../../customTranslation";
import { differenceInDays, parseISO } from "date-fns";

function Report({ colorProperty, demoLink }) {
  const { t } = useCustomTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const { isAuthenticated, user } = useContext(UserContext);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [demoExpired, setDemoExpired] = useState(false);
  const [hasRoles, setHasRoles] = useState(false);
  const [reportUrl, setReportUrl] = useState("");
  const videoRef = useRef(null);
  const buttonStyle = {
    backgroundColor: colorProperty.color,
  };

  const checkForRoles = () => {
    if (user?.app_metadata?.roles?.length >= 1) {
      setHasRoles(true);
    } else {
      setHasRoles(false);
    }
  };

  const checkIfExpiredTrial = () => {
    if (isAuthenticated && user?.app_metadata?.created_at) {
      // Parse the created_at date to a Date object
      const createdAtDate = parseISO(user.app_metadata.created_at);
      // Get the current date
      const currentDate = new Date();
      // Calculate the difference in days between the current date and the created_at date
      const difference = differenceInDays(currentDate, createdAtDate);
      // Set the demoExpired state based on the difference and role status
      if (difference >= 7) {
        setDemoExpired(true);
        checkForRoles();
      } else {
        setDemoExpired(false);
        setHasRoles(false);
      }
    }
  };

  useEffect(() => {
    // Check the demo status when the component mounts or when the user data changes
    checkIfExpiredTrial();
  });

  const handleDemoClick = async () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      window.scrollTo(0, 0);
    } else {
      // If the user is logged in and their demo period has not expired, open the modal
      if (!demoExpired) {
        setReportUrl(demoLink);
        setModalOpen(true);
      } else {
        // If the user has roles, open the modal
        if (hasRoles) {
          setReportUrl(demoLink);
          setModalOpen(true);
        }
      }
    }
  };

  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  return (
    <div>
      <div>
        <div
          className="relative flex justify-start mt-8 my-8"
          data-aos="zoom-y-out"
          data-aos-delay="450"
        >
          {demoExpired && !hasRoles ? (
            <button
              disabled
              className="cursor-not-allowed w-[200px] h-12 rounded-md font-medium my-6 mx-auto py-3 bg-gray-500"
            >
              <span className="ml-3 text-black">
                {t("buttons.demoExpired")}
              </span>
            </button>
          ) : (
            <button
              style={buttonStyle}
              className="w-[200px] h-12 rounded-md font-medium my-6 mx-auto py-3"
              onClick={() => {
                handleDemoClick();
              }}
            >
              <span className="ml-3 text-black">{t("buttons.demo")}</span>
            </button>
          )}
        </div>
      </div>

      {showLoginDialog ? (
        <LoginDialog onCancel={handleCloseDialog} />
      ) : (
        <Transition show={modalOpen} as={Fragment}>
          <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>
            {/* Modal backdrop */}
            <Transition.Child
              className="fixed inset-0 z-[99999] bg-black bg-opacity-75 transition-opacity"
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-out duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              aria-hidden="true"
            />
            {/* End: Modal backdrop */}

            {/* Modal dialog */}
            <Transition.Child
              className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ttransition ease-out duration-200"
              leaveFrom="oopacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="max-w-6xl mx-auto h-full flex items-center">
                <Dialog.Panel className="w-full h-[70%] aspect-video bg-black overflow-hidden">
                  <iframe
                    title="Hivetech@DRPICV - Hive"
                    width="100%"
                    height="100%"
                    src={reportUrl}
                    allowFullScreen={true}
                  ></iframe>
                </Dialog.Panel>
              </div>
            </Transition.Child>
            {/* End: Modal dialog */}
          </Dialog>
        </Transition>
      )}
    </div>
  );
}

Report.propTypes = {
  colorProperty: PropTypes.shape({
    color: PropTypes.string.isRequired,
  }).isRequired,
  demoLink: PropTypes.string,
};

export default Report;
