import { LandingForm } from "@/components/auth/landing";
import { Button, PageLayout, Typography } from "@/components/shared";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Landing() {
  const router = useRouter();

  return (
    <PageLayout>
      <View className="w-full items-center mt-auto">
        <Typography className="font-nunito-sans-900 text-5xl mb-16 leading-[1.1]">
          Bookzzz
        </Typography>

        <LandingForm />

        <View className="gap-y-2 items-center mt-4">
          <Typography className="font-nunito-sans-500 text-xl text-light-7">
            or
          </Typography>

          <Button
            title="Login with Password"
            variant="text"
            onPress={() => router.navigate("/(auth)/login")}
          />
        </View>
      </View>

      <View className="items-end mt-auto">
        <Button title="I don't have an account" variant="secondary" />
      </View>
    </PageLayout>
  );
}
