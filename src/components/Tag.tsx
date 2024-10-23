export const Tag = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: string;
}) => {
  return (
    <span
      className={`w-fit rounded-2xl px-3 py-1 text-sm font-semibold uppercase`}
      style={{
        color: `var(--color-${type}-700)`,
        background: `var(--color-${type}-100)`,
      }}
    >
      {children}
    </span>
  );
};
