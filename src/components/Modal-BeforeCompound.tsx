import { XIcon } from "lucide-react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onCloseModal: () => void;
}

export const Modal = ({ children, onCloseModal }: ModalProps) => {
  return createPortal(
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-[--backdrop-color] backdrop-blur-sm transition-all delay-500">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-10 py-8 shadow-lg transition-all delay-500">
        <button
          onClick={() => {
            onCloseModal();
            // we can also use optional chaining in function calls
            // onCloseModal?.();
          }}
          className="rounder-sm absolute right-5 top-3 translate-x-2 border-0 bg-none p-1 transition-all delay-500"
        >
          <XIcon />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
