import { useOutsideClick } from "@/hooks/useOutsideClick";
import { EllipsisVertical } from "lucide-react";
import React, {
  createContext,
  useState,
  useContext,
  ComponentProps,
} from "react";
import { createPortal } from "react-dom";

interface MenusProps {
  children: React.ReactNode;
}

type MenusContextProps = {
  open: (id: number) => void;
  // open: React.Dispatch<React.SetStateAction<string>>;
  openId: number | null;
  close: () => void;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

const MenusContext = createContext<MenusContextProps>(null!);

export const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const close = () => setOpenId(null);

  // const open = setOpenId;
  const open = (id: number) => {
    setOpenId(id);
  };

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-w-[10px] items-center justify-end">{children}</div>
  );
};

const Toggle = ({ id }: { id: number }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // This is so you can open the context menu
    e.stopPropagation();

    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect!.width - rect!.x,
      y: rect!.y + rect!.height + 8,
    });

    if (openId === null || openId !== id) {
      open(id);
      return;
    }
    close();
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className="delay-50 translate-x-2 rounded-sm border-none bg-none p-1 transition-all hover:bg-gray-200 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-gray-700"
    >
      <EllipsisVertical />
    </button>
  );
};
const List = ({ id, children }: { id: number; children: React.ReactNode }) => {
  const { openId, close, position } = useContext(MenusContext);
  // const ref = useOutsideClick<HTMLUListElement>(close);
  const ref = useOutsideClick<HTMLUListElement>(close, false);
  if (id !== openId) return null;

  // if (id !== openId) return null;
  // right: ${(props) => props.position.x}px;
  // top: ${(props) => props.position.y}px;
  return createPortal(
    <ul
      className="fixed right-10 top-10 rounded-md bg-white shadow-md"
      ref={ref}
      style={{ right: position.x, top: position.y }}
    >
      {children}
    </ul>,
    document.body,
  );
};

type ButtonProps = Omit<ComponentProps<"button">, "onClick"> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, icon, onClick, ...props }: ButtonProps) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <button
        className="boder-0 delay-50 [&>svg]:delay-50 flex w-full items-center gap-4 bg-none px-6 py-3 text-sm transition-all hover:bg-gray-300 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 [&>svg]:transition-all"
        onClick={handleClick}
        {...props}
      >
        {icon}
        {children}
      </button>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
