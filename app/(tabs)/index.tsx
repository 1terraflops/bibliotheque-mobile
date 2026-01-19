import { supabase } from "@/api/supabase";
import { Button } from "@/components/shared";
import { cn } from "@/utils/cn";
import { Text, useColorScheme, View } from "react-native";

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
      <Button
        title="Logout"
        variant="text"
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
}
