import { TabButton } from "@/components";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Book, ChartColumnStacked, Newspaper } from "lucide-react-native";
import { FC } from "react";

const _Layout: FC = () => {
  return (
    <Tabs>
      <TabSlot />
      <TabList className="bg-dark h-[68px] mb-6 mx-20 px-8 rounded-full items-center">
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

      {/* {<TabList className="h-[64px] w-[64px] bg-dark rounded-full"></TabList>} */}
    </Tabs>
  );
};

export default _Layout;
