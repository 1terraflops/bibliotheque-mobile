import { colors } from "@/constants/colors";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { ChartColumnStacked, House, Newspaper } from "lucide-react-native";
import { FC } from "react";

const _Layout: FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderRadius: 100,
          height: 70,
          marginBottom: 24,
          marginHorizontal: 65,
        },
        tabBarLabelStyle: {
          fontWeight: 600,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginTop: 7,
        },
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House color={color} size={26} />,
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <Newspaper color={color} />,
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => <ChartColumnStacked color={color} />,
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
