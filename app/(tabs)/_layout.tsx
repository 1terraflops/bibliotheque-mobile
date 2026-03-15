import { GetActiveUserQueryOptions } from "@/api/users/get-active-user-profile.query";
import { AvatarTabButton, TabButton } from "@/components/tabs";
import { useSessionStore } from "@/store/session.store";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import {
  ChartColumnStacked,
  LibraryBig,
  SquareActivity,
} from "lucide-react-native";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

const Layout = () => {
  const isLightTheme = useColorScheme() === "light";

  const id = useSessionStore().session?.user.id!;
  const { data: user, isLoading } = useQuery(GetActiveUserQueryOptions(id));
  const setUser = useSessionStore().setUser;

  useEffect(() => {
    if (!isLoading && user) {
      setUser(user);
    }
  }, [user, setUser, isLoading]);

  return (
    <Tabs>
      <TabSlot />
      <>
        <TabList
          className={
            "absolute gap-x-10 bottom-6 left-[10%] h-[68px] px-8 rounded-full flex-row items-center justify-between gap-6 shadow " +
            cn(isLightTheme ? "bg-background-light-2" : "bg-background-dark-2")
          }
        >
          <TabTrigger asChild name="index" href="/(tabs)">
            <TabButton icon={LibraryBig}>Library</TabButton>
          </TabTrigger>

          <TabTrigger asChild name="activity" href="/(tabs)/activity">
            <TabButton icon={SquareActivity}>Activity</TabButton>
          </TabTrigger>

          <TabTrigger asChild name="stats" href="/(tabs)/stats">
            <TabButton icon={ChartColumnStacked}>Stats</TabButton>
          </TabTrigger>
        </TabList>

        <TabList
          className={
            "absolute bottom-6 right-[10%] h-[64px] w-[64px] rounded-full items-center justify-center shadow " +
            cn(isLightTheme ? "bg-background-light-2" : "bg-background-dark-2")
          }
        >
          <TabTrigger asChild name="profile" href="/(tabs)/profile">
            <AvatarTabButton
              src={{
                uri: user?.avatar_url ?? "",
              }}
              fallback={user?.full_name || user?.username || ""}
            />
          </TabTrigger>
        </TabList>
      </>
    </Tabs>
  );
};

export default Layout;
