import { SignUpForm } from "@/components/auth/sign-up";
import { ScreenLayout } from "@/components/shared";
import { View } from "react-native";

export default function SignUp() {
  return (
    <ScreenLayout backButton>
      <View className="flex-1 items-center">
        <SignUpForm />
      </View>
    </ScreenLayout>
  );
}
