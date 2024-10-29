import { queryOptions } from "@tanstack/react-query";
import { supabase, supabaseUrl } from "./supabase";
import { defaultAvatar } from "@/constants";

export type UpdateUser = {
  id?: string;
  email?: string;
  fullName?: string;
  avatar?: FileList | string;
  oldAvatar?: string;
  password?: string;
};

export const signup = async ({
  fullName,
  email,
  password,
  avatar,
}: {
  fullName: string;
  email: string;
  password: string;
  avatar: FileList;
}) => {
  // Create new avatar name
  const newAvatarName =
    `avatar-${avatar[0].name}-${crypto.randomUUID()}`!.replaceAll("/", "-");

  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${newAvatarName}`;

  // Upload new avatar image
  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(newAvatarName, avatar?.[0] || defaultAvatar);

  if (uploadAvatarError) {
    console.log(uploadAvatarError);
    throw new Error("Avatar image could not be uploaded");
  }

  // Save the current session before signing up a new user
  const { data: savedSessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: avatarPath,
      },
    },
  });

  if (savedSessionData.session) {
    await supabase.auth.setSession(savedSessionData.session);
  }
  // Handle errors
  let authError = null;

  if (data.user && !data?.user?.identities?.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  }

  if (error) {
    console.error("error", error);
    authError = {
      name: error.name,
      message: error.message,
    };
  }

  if (authError) throw new Error(authError.message);
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

/**
 * Update user data
 */
export const updateCurrentUser = async (values: UpdateUser) => {
  const { oldAvatar, id, ...user } = values;
  // You can update just the password or the User but not both at the same time

  // .-Update password
  if (user.password) {
    const { data, error } = await supabase.auth.updateUser({
      password: user.password,
    });

    if (error) {
      console.error("error", error);
      throw new Error(error.message);
    }

    return data;
  }

  // .- Update fullName if avatar already exists
  if (typeof user.avatar === "string") {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        fullName: user.fullName,
      },
    });

    if (error) {
      console.log("error", error);
      throw new Error("Cabins could not be deleted");
    }
    return data;
  }

  // .- Update fullName and avatar
  const avatarName = oldAvatar?.split("/").at(-1);
  // this is for the compiler to know imageName is not undefined
  if (!avatarName) return;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .remove([avatarName]);

  if (storageError) {
    console.log(storageError);
    throw new Error("Cabin image could not be deleted");
  }

  // Create new avatar name
  const newAvatarName = `avatar-${id}-${crypto.randomUUID()}`!.replaceAll(
    "/",
    "-",
  );
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${newAvatarName}`;

  // Upload new avatar image
  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(newAvatarName, user.avatar?.[0] || defaultAvatar);

  if (uploadAvatarError) {
    console.log(uploadAvatarError);
    throw new Error("Avatar image could not be uploaded");
  }

  const { data: updateUser, error } = await supabase.auth.updateUser({
    data: {
      fullName: user.fullName,
      avatar: avatarPath,
    },
  });

  if (error) {
    console.log("error", error);
    throw new Error(error.message);
  }

  return updateUser;
};

export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

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
