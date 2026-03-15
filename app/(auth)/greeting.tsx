import { Button, ScreenLayout, Typography } from "@/components/shared";
import { router } from "expo-router";
import { View } from "react-native";

export default function Greeting() {
  return (
    <ScreenLayout>
      <View className="flex-1 items-center w-full gap-y-4 justify-center mt-auto mb-16">
        <Typography className="font-inter-600 text-6xl leading-normal">
          Hey!👋
        </Typography>

        <Typography className="font-nunito-sans text-xl text-center mt-4 opacity-90">
          {
            "It's great to have you here. \nLet's get to know each other better!"
          }
        </Typography>
      </View>

      <Button
        title="Continue"
        onPress={async () => router.replace("/(auth)/onboarding")}
        className="mb-8"
      />
    </ScreenLayout>
  );
}
