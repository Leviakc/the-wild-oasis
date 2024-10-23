interface ButtonTextProps {
  children: React.ReactNode;
  moveBack: () => void;
}

export const ButtonText = ({ children, moveBack }: ButtonTextProps) => {
  return (
    <button
      onClick={moveBack}
      className="rounded-sm border-none bg-none text-center font-medium text-[--color-brand-600] transition-all delay-200 hover:text-brand-700 active:text-brand-700"
    >
      {children}
    </button>
  );
};
