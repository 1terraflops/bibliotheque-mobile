import { Tabs } from "expo-router";
import { House, Newspaper } from "lucide-react-native";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 12, marginTop: 2 },
        tabBarStyle: {
          height: 75,
          borderRadius: 100,
          marginBottom: 12,
          marginHorizontal: 12,
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
          tabBarIcon: ({ focused }) => (
            <House
              size={28}
              stroke={focused ? "black" : "#363535"}
              fill="orange"
              fillOpacity={focused ? 0.25 : 0}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Newspaper
              size={28}
              stroke={focused ? "black" : "#363535"}
              fill="orange"
              fillOpacity={focused ? 0.25 : 0}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
