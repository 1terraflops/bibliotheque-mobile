import { SignUpForm } from "@/components/auth/sign-up";
import { PageLayout } from "@/components/shared";
import { View } from "react-native";

export default function SignUp() {
  return (
    <PageLayout backButton>
      <View className="flex-1 items-center">
        <SignUpForm />
      </View>
    </PageLayout>
  );
}
