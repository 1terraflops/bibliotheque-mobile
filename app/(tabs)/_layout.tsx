import { Tabs } from "expo-router";
import { ChartColumnStacked, House, Newspaper } from "lucide-react-native";
import { Text } from "react-native";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 12, marginTop: 2 },
        tabBarStyle: {
          height: 75,
          borderRadius: 100,
          marginBottom: 12,
          marginHorizontal: 12,
          backgroundColor: "rgba(255, 224, 178, 0.55)",
          boxShadow: "0px 0px 4px lightgray",
        },
        tabBarItemStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-sm font-medium ${focused && "text-[#db563b]"}`}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <House
              size={28}
              stroke={focused ? "black" : "#363535"}
              fill="#db563b"
              fillOpacity={focused ? 0.4 : 0}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-sm font-medium ${focused && "text-teal-700"}`}
            >
              Activity
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Newspaper
              size={28}
              stroke={focused ? "black" : "#363535"}
              fill="teal"
              fillOpacity={focused ? 0.45 : 0}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-sm font-medium ${focused && "text-lime-600"}`}
            >
              Stats
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <ChartColumnStacked
              size={28}
              stroke={focused ? "black" : "#363535"}
              fill="green"
              fillOpacity={focused ? 0.25 : 0}
              className="bg-orange-300"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
