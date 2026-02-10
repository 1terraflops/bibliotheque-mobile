import { ForgotPasswordForm } from "@/components/auth/forgot-password";
import { ScreenLayout } from "@/components/shared";
import { View } from "react-native";

export default function ForgotPassword() {
  return (
    <ScreenLayout backButton>
      <View className="flex-1 items-center">
        <ForgotPasswordForm />
      </View>
    </ScreenLayout>
  );
}
