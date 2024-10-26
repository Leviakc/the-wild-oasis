import { queryOptions } from "@tanstack/react-query";
import { supabase } from "./supabase";

export const signup = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  // Save the current session before signing up a new user
  const { data: savedSessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (savedSessionData.session) {
    await supabase.auth.setSession(savedSessionData.session);
  }

  if (error) {
    console.error("error", error);
    throw new Error(error.message);
  }

  return data;
};

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
