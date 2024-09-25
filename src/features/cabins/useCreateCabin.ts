import { useToast } from "@/hooks/use-toast";
import { createCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

type Form = UseFormReturn<
  {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: FileList;
  },
  any,
  undefined
>;

export const useCreateCabin = (form?: Form, close?: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast({
        title: "New cabin successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      close?.();
      if (!form) return;
      console.log("Cabin created", form.getValues);
      form.reset();
    },
    onError: (err) => {
      toast({ title: err.message });
    },
  });

  return {
    mutate,
    isCreating,
  };
};
