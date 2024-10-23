interface DataItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

export const DataItem = ({ icon, label, children }: DataItemProps) => {
  return (
    <div className="flex items-center gap-4 px-0 py-2">
      <p className="flex items-center gap-2 font-medium [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-brand-600">
        {icon}
        <span>{label}</span>
      </p>
      {children}
    </div>
  );
};
