import { Tabs } from "expo-router";
import { FC } from "react";
import { ChartColumnStacked, House, Newspaper } from "lucide-react-native";

const _Layout: FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#D97126",
        tabBarStyle: {
          backgroundColor: "#282b28",
          borderRadius: 100,
          height: 70,
          marginBottom: 24,
          marginHorizontal: 60,
        },
        tabBarLabelStyle: {
          fontWeight: 600,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <Newspaper color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartColumnStacked color={color} />,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
