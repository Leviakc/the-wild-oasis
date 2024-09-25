import { Label } from "./ui/label";

interface FormRowProps {
  label?: string;
  children: React.ReactElement;
  error?: string;
}

export const FormRow = ({ label, error, children }: FormRowProps) => {
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

// const StyledFormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;
//
//   padding: 1.2rem 0;
//
//   &:first-child {
//     padding-top: 0;
//   }
//
//   &:last-child {
//     padding-bottom: 0;
//   }
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
//
//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;
//
// const Label = styled.label`
//   font-weight: 500;
// `;
//
// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;
//
// function FormRow({ label, error, children }) {
//   return (
//     <StyledFormRow>
//       {label && <Label htmlFor={children.props.id}>{label}</Label>}
//       {children}
//       {error && <Error>{error}</Error>}
//     </StyledFormRow>
//   );
// }
//
// export default FormRow;
//
