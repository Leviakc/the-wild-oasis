import { supabase } from "./supabase";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // NOTE: check lession 389 about auth not expiring (auth lesson)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }

  return data;
};
