import { LoginForm } from "@/components/auth";
import { cn } from "@/utils/cn";
import { useColorScheme, View } from "react-native";

export default function Login() {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "flex-1 justify-center items-center bg-dark-1",
        isLightTheme && "bg-light-1",
      )}
    >
      <LoginForm />
    </View>
  );
}
