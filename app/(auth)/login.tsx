import { LoginForm } from "@/components/auth/login";
import { PageLayout } from "@/components/shared";
import { View } from "react-native";

export default function Login() {
  return (
    <PageLayout backButton>
      <View className="flex-1 justify-center items-center">
        <LoginForm />
      </View>
    </PageLayout>
  );
}
