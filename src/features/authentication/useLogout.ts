import { logout } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueriesData({ queryKey: ["user"] }, null);
      router.invalidate();
      navigate({
        to: "/login",
      });
    },
    onError: (err) => {
      console.error("error", err);
    },
  });

  return { mutate, isPending };
};
