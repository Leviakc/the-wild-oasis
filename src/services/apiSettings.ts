import { queryOptions } from "@tanstack/react-query";
import { supabase } from "./supabase";

export const settingsQueryOptions = queryOptions({
  queryKey: ["settings"],
  queryFn: () => getSettings(),
});

export interface SettingsI {
  id: number;
  breakfastPrice: number;
  created_at: string;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
}

// export type NewSettings = Omit<SettingsI, "id" | "created_at">;
export type NewSettings = {
  breakfastPrice?: number;
  maxBookingLength?: number;
  maxGuestsPerBooking?: number;
  minBookingLength?: number;
};

export async function getSettings(): Promise<SettingsI> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

export async function updateSetting(newSetting: NewSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1);

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
