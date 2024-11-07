import { useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/services/apiAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserMetadata } from "@supabase/supabase-js";
import { defaultAvatar } from "@/utils/constants";

export const UserAvatar = () => {
  const { data: user } = useSuspenseQuery(userQueryOptions());

  const { fullName = "", avatar = "" } = user?.user
    .user_metadata as UserMetadata;
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
      <Avatar>
        <AvatarImage src={avatar || defaultAvatar} />
        <AvatarFallback>{`Avatar of ${fullName}`}</AvatarFallback>
      </Avatar>
      <p>{fullName}</p>
    </div>
  );
};
