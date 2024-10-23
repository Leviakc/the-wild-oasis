import { useRouter } from "@tanstack/react-router";

export function useMoveBack() {
  const { history } = useRouter();
  return () => history.back();
}
