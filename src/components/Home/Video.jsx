import { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useCustomTranslation from "../../customTranslation";

function ModalVideo() {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
  const { t } = useCustomTranslation();

  return (
    <div>
      {/* Video thumbnail */}
      <div>
        <div
          className="relative flex justify-start mt-8"
          data-aos="zoom-y-out"
          data-aos-delay="450"
        >
          <button
            className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <svg
              className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
              <path d="M10 17l6-5-6-5z" />
            </svg>
            <span className="ml-3 text-black">{t("home.hero.video")}</span>
          </button>
        </div>
      </div>
      {/* End: Video thumbnail */}

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
              <Dialog.Panel className="w-full h-96 aspect-video bg-black overflow-hidden">
                <iframe
                  ref={videoRef}
                  src="https://player.vimeo.com/video/726719921?h=f8c6f4efba"
                  width="100%"
                  height="100%"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Video"
                ></iframe>
              </Dialog.Panel>
            </div>
          </Transition.Child>
          {/* End: Modal dialog */}
        </Dialog>
      </Transition>
    </div>
  );
}

export default ModalVideo;
