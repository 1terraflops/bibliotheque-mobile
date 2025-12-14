import { LoginForm } from "@/components/auth";
import { cn } from "@/utils/cn";
import { useColorScheme, View } from "react-native";

export default function Login() {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-darker",
        isLightTheme && "bg-light"
      )}
    >
      <LoginForm />
    </View>
  );
}
