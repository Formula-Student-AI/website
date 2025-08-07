import { IoClose } from "react-icons/io5";

import NavLinks from "./NavLinks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-Out Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-xl" : "translate-x-full"
        } transition-shadow`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button onClick={onClose} aria-label="Close mobile menu">
            <IoClose
              className={`w-6 h-6 text-gray-800 transform transition-transform duration-500 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-6 space-y-4 text-base text-gray-800">
          <NavLinks onClick={onClose} />
        </nav>
      </div>
    </>
  );
}
