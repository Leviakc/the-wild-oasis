import { queryOptions } from "@tanstack/react-query";
import { supabase, supabaseUrl } from "./supabase";

export const cabinsQueryOptions = queryOptions({
  queryKey: ["cabins"],
  queryFn: () => getCabins(),
});

export type NewCabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string | File;
};

export type Cabin = Omit<NewCabin, "image"> & {
  id: number;
  createdAt: string;
  image: string;
};

export type EditCabin = Omit<NewCabin, "image"> & {
  createdAt: string;
  id: number;
  image: string | FileList;
  oldImage: string;
};

export const getCabins = async (): Promise<Cabin[]> => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("error", error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
};

export const createCabin = async (newCabin: NewCabin) => {
  if (typeof newCabin.image === "string") {
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin }])
      .select();

    if (error) {
      console.log("error", error);
      throw new Error("Cabin could not be created");
    }
    return data;
  }

  const imageName = `${crypto.randomUUID()}-${newCabin.image.name}`.replaceAll(
    "/",
    "-",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(imagePath);

  // Create cabin

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log("error", error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const typedData: Cabin = data as unknown as Cabin;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  console.log(typedData);

  // 3. Delete cabin if there is an error uploading image

  if (storageError) {
    console.log("error", storageError);
    await supabase.from("cabins").delete().eq("id", typedData.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
};

export const updateCabin = async (cabin: EditCabin) => {
  const { oldImage, ...newCabin } = cabin;

  if (typeof newCabin.image === "string") {
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin })
      .eq("id", newCabin.id);

    if (error) {
      console.log("error", error);
      throw new Error("Cabins could not be deleted");
    }
    return data;
  }

  // Delete image
  const imageName = oldImage.split("/").at(-1);
  if (!imageName) return;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);

  if (storageError) {
    console.log(storageError);
    throw new Error("Cabin image could not be deleted");
  }

  const newImageName =
    `${crypto.randomUUID()}-${newCabin.image[0].name}`.replaceAll("/", "-");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${newImageName}`;
  console.log(cabin.image);

  // Upload new image
  const { error } = await supabase.storage
    .from("cabin-images")
    .upload(newImageName, newCabin.image[0]);

  if (error) {
    console.log(error);
    throw new Error("Cabin image could not be uploaded");
  }

  // upload image path
  const { data, error: uploadImageError } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", newCabin.id);

  if (uploadImageError) {
    console.log(uploadImageError);
    throw new Error("Cabin image could not be deleted");
  }

  return data;
};

export const deleteCabin = async (cabin: Cabin) => {
  // TODO: check if exits image path in cabin table, if not, keep going
  // but if exits, don't delete image

  // NOTE: What the heck is this doing?
  // if (typeof cabin.image === "object") return;

  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabin.id);
  console.log("data", data, "error", error);

  if (error) {
    console.log("error", error);
    throw new Error("Cabins could not be deleted");
  }

  // Delete image
  const imageName = cabin.image.split("/").at(-1);

  if (!imageName) return;

  console.log(imageName);
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);

  if (storageError) {
    console.log(storageError);
    throw new Error("Cabin image could not be deleted");
  }

  return data;
};
