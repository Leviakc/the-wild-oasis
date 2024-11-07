type StatProps = {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color: string;
};
export const Stat = ({ icon, title, value, color }: StatProps) => {
  return (
    <div className="grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1 overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-[#18212f]">
      <div
        className="row-span-full flex aspect-[1] items-center justify-center rounded-full [&_svg]:h-8 [&_svg]:w-8"
        style={{
          backgroundColor: `var(--color-${color}-100)`,
          color: `var(--color-${color}-700)`,
        }}
        color={color}
      >
        {icon}
      </div>
      <h5 className="self-end text-xs font-semibold uppercase tracking-[0.4px] text-gray-500 dark:text-gray-400">
        {title}
      </h5>
      <p className="text-pretty text-lg font-medium leading-4">{value}</p>
    </div>
  );
};
