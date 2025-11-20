import { AvatarTabButton, TabButton } from "@/components";
import { cn } from "@/utils/cn";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Book, ChartColumnStacked, Newspaper } from "lucide-react-native";
import { useColorScheme } from "react-native";

const Layout = () => {
  const isLightTheme = useColorScheme() === "light";

  return (
    <Tabs>
      <TabSlot />
      <>
        <TabList
          className={
            "absolute gap-x-10 bottom-6 left-[10%] bg-dark h-[68px] px-8 rounded-full flex-row items-center justify-between gap-6 shadow " +
            cn(isLightTheme && "bg-coffeish")
          }
        >
          <TabTrigger asChild name="index" href="/(tabs)">
            <TabButton icon={Book}>Books</TabButton>
          </TabTrigger>

          <TabTrigger asChild name="activity" href="/(tabs)/activity">
            <TabButton icon={Newspaper}>Activity</TabButton>
          </TabTrigger>

          <TabTrigger asChild name="stats" href="/(tabs)/stats">
            <TabButton icon={ChartColumnStacked}>Stats</TabButton>
          </TabTrigger>
        </TabList>

        <TabList
          className={
            "absolute bottom-6 right-[10%] h-[64px] w-[64px] bg-dark rounded-full items-center justify-center shadow " +
            cn(isLightTheme && "bg-coffeish")
          }
        >
          <TabTrigger asChild name="profile" href="/(tabs)/profile">
            <AvatarTabButton
              src={{
                uri: "",
              }}
              fallback="Volodymyr Vovk"
            />
          </TabTrigger>
        </TabList>
      </>
    </Tabs>
  );
};

export default Layout;
