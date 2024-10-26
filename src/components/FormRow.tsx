import { Label } from "./ui/label";

interface FormRowProps {
  label?: string;
  children: React.ReactElement;
  error?: string;
}

export const FormRow = ({ label, children }: FormRowProps) => {
  return (
    <div className="grid grid-cols-[20rem_1fr_1.2fr] items-center gap-6 px-0 py-3 first:pt-0 last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-3">
      {label && (
        <Label htmlFor={children.props.id} className="font-medium">
          {label}
        </Label>
      )}
      {children}
      {/* {error && <Error>{error}</Error>} */}
    </div>
  );
};
