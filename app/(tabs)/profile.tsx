import { cn } from "@/utils/cn";
import { Text, useColorScheme, View } from "react-native";

export default function Profile() {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-darker",
        isLightTheme && "bg-light"
      )}
    >
      <Text className="text-white">Profile</Text>
    </View>
  );
}
