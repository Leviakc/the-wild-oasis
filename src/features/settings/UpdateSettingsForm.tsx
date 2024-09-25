import { FormRow } from "@/components/FormRow";
import { Input } from "@/components/ui/input";
import { settingsQueryOptions } from "@/services/apiSettings";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUpdateSetting } from "./useUpdateSetting";

export const UpdateSettingsForm = () => {
  const { data } = useSuspenseQuery(settingsQueryOptions);
  const { mutate, isUpdating } = useUpdateSetting();

  function handleUpdate(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value, defaultValue, id } = e.target;
    if (!value || !id || defaultValue === value) return;

    mutate({ [id]: value });
    e.target.defaultValue = value;
  }

  return (
    <>
      <form>
        <FormRow label={"Minimum nights/booking"}>
          <Input
            type="number"
            id="minBookingLength"
            defaultValue={data.minBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e)}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="maxBookingLength"
            defaultValue={data.maxBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e)}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="maxGuestsPerBooking"
            defaultValue={data.maxGuestsPerBooking}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e)}
          />
        </FormRow>

        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfastPrice"
            defaultValue={data.breakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e)}
          />
        </FormRow>
      </form>
    </>
  );
};
