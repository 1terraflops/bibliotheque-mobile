import { supabase } from "@/api/supabase";
import { cn } from "@/utils/cn";
import { Pressable, Text, useColorScheme, View } from "react-native";

export default function Index() {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-dark-2",
        isLightTheme && "bg-light-1",
      )}
    >
      <Text>Welcome Home!</Text>
      <Pressable onPress={() => supabase.auth.signOut()}>
        <Text className="font-roboto-mono">Log out</Text>
      </Pressable>
    </View>
  );
}
