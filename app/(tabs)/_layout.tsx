import { Tabs } from "expo-router";
import { ChartColumnStacked, House, Newspaper } from "lucide-react-native";
import { Text, View } from "react-native";

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
              style={{ fontSize: 12, color: focused ? "#db563b" : "#363535" }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -15,
                    width: 121,
                    height: 75,
                    borderRadius: 100,
                    backgroundColor: "rgb(250, 215, 162)",
                  }}
                />
              )}
              <House
                size={28}
                stroke={focused ? "black" : "#363535"}
                fill="#db563b"
                fillOpacity={focused ? 0.4 : 0}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 12, color: focused ? "teal" : "#363535" }}>
              Activity
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -15,
                    width: 121,
                    height: 75,
                    borderRadius: 100,
                    backgroundColor: "rgb(250, 215, 162)",
                  }}
                />
              )}
              <Newspaper
                size={28}
                stroke={focused ? "black" : "#363535"}
                fill="teal"
                fillOpacity={focused ? 0.45 : 0}
              />
            </View>
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
              style={{ fontSize: 12, color: focused ? "green" : "#363535" }}
            >
              Stats
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -15,
                    width: 121,
                    height: 75,
                    borderRadius: 100,
                    backgroundColor: "rgb(250, 215, 162)",
                  }}
                />
              )}
              <ChartColumnStacked
                size={28}
                stroke={focused ? "black" : "#363535"}
                fill="green"
                fillOpacity={focused ? 0.25 : 0}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
