import { ForgotPasswordForm } from "@/components/auth/forgot-password";
import { PageLayout } from "@/components/shared";
import { View } from "react-native";

export default function ForgotPassword() {
  return (
    <PageLayout backButton>
      <View className="flex-1 items-center">
        <ForgotPasswordForm />
      </View>
    </PageLayout>
  );
}
