import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
import { Avatar, Button, Typography } from "@/components/shared";
import { useSessionStore } from "@/store/session.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

export const UserInfo: FC = () => {
  const router = useRouter();

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

        <View className="gap-y-3 min-w-32">
          <View className="flex-row gap-x-3 items-center">
            <Typography skeletonWidth={128} className="text-xl font-inter-500">
              {profile?.full_name}
            </Typography>

            <Button
              variant="icon"
              iconLeft={SquarePen}
              iconSize={20}
              onPress={() => router.navigate("/(settings)/update-profile")}
            />
          </View>

          <View className="flex-row gap-x-12">
            <View className="items-center gap-y-1">
              <Typography
                skeletonWidth={32}
                className="text-lg font-inter-500"
              ></Typography>
              <Typography className="text-light-3">Following</Typography>
            </View>

            <View className="items-center gap-y-1">
              <Typography
                skeletonWidth={32}
                className="text-lg font-inter-500"
              ></Typography>
              <Typography className="text-light-3">Followers</Typography>
            </View>
          </View>
        </View>
      </View>

      <View className="gap-y-2">
        <Typography skeletonWidth={96} className="text-light-5 font-inter-500">
          {profile?.username && `@${profile.username}`}
        </Typography>
        <Typography skeletonWidth={300}>{profile?.bio}</Typography>
      </View>
    </View>
  );
};
