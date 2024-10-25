import { queryOptions } from "@tanstack/react-query";
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

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }
};

export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }
  console.log("session", session);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }

  return data;
};

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });
