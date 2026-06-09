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

  return (
    <View className="gap-y-4 mt-6">
      <View className="flex-row gap-x-4">
        <Avatar
          skeleton={isLoading}
          size="large"
          src={{ uri: profile?.avatar_url || "" }}
          fallback={profile?.full_name || profile?.username || ""}
        />

        <View className="gap-y-2 min-w-32 mt-2">
          <View className="flex-row gap-x-3 items-center">
            <Typography
              skeleton={isLoading}
              skeletonWidth={128}
              className="text-xl font-inter-500"
            >
              {profile?.full_name}
            </Typography>

            <Button
              variant="icon"
              iconLeft={SquarePen}
              iconSize={20}
              onPress={() => router.navigate("/(settings)/update-profile")}
            />
          </View>

          <Typography
            skeleton={isLoading}
            skeletonWidth={96}
            className="text-light-5 font-inter-500"
          >
            {profile?.username && `@${profile.username}`}
          </Typography>
        </View>
      </View>

      <View className="gap-y-2 ml-2">
        <Typography skeleton={isLoading} skeletonWidth={300}>
          {profile?.bio}
        </Typography>
      </View>
    </View>
  );
};
