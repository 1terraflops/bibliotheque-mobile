import { LoginForm } from "@/components/auth/login";
import { ScreenLayout } from "@/components/shared";
import { View } from "react-native";

export default function Login() {
  return (
    <ScreenLayout backButton>
      <View className="flex-1 justify-center items-center">
        <LoginForm />
      </View>
    </ScreenLayout>
  );
}
