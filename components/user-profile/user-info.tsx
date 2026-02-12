import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
import { useSessionStore } from "@/store/session.store";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
import { Avatar, Button, Typography } from "../shared";

export const UserInfo: FC = () => {
  const id = useSessionStore().session?.user.id!;
  const { data: profile, isLoading } = useQuery(GetActiveUserQueryOptions(id));

  if (isLoading) {
    return null;
  }

  return (
    <View className="gap-y-6 mt-12">
      <View className="flex-row gap-x-8 items-center">
        <Avatar
          size="large"
          src={{ uri: profile?.avatar_url || "" }}
          fallback={profile?.full_name || profile?.username || ""}
        />

        <View className="gap-y-2 min-w-48">
          <View className="flex-row gap-x-4 items-center">
            <Typography className="text-xl font-inter-500">
              {profile?.full_name}
            </Typography>

            <Button variant="icon" iconLeft={SquarePen} iconSize={20} />
          </View>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Typography className="text-lg font-inter-500">51</Typography>
              <Typography className="text-light-3">Following</Typography>
            </View>

            <View className="items-center">
              <Typography className="text-lg font-inter-500">15</Typography>
              <Typography className="text-light-3">Followers</Typography>
            </View>
          </View>
        </View>
      </View>

      <View className="gap-y-2">
        <Typography className="text-light-5 font-inter-500">
          {profile?.username && `@${profile.username}`}
        </Typography>
        <Typography>{profile?.bio}</Typography>
      </View>
    </View>
  );
};
