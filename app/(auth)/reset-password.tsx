import { ResetPasswordForm } from "@/components/auth/reset-password";
import { ScreenLayout } from "@/components/shared";
import { View } from "react-native";

export default function ResetPassword() {
  return (
    <ScreenLayout>
      <View className="flex-1 items-center">
        <ResetPasswordForm />
      </View>
    </ScreenLayout>
  );
}
