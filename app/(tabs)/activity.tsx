import { cn } from "@/utils/cn";
import { Text, useColorScheme, View } from "react-native";

export default function Activity() {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-dark-2",
        isLightTheme && "bg-light-1",
      )}
    >
      <Text className="text-white">Activity</Text>
    </View>
  );
}
