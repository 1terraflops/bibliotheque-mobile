import { ResetPasswordForm } from "@/components/auth/reset-password";
import { PageLayout } from "@/components/shared";
import { View } from "react-native";

export default function ResetPassword() {
  return (
    <PageLayout>
      <View className="flex-1 items-center">
        <ResetPasswordForm />
      </View>
    </PageLayout>
  );
}
