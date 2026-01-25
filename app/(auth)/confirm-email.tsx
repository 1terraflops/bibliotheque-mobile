import { supabase } from "@/api/supabase";
import { Button, PageLayout, Typography } from "@/components/shared";
import createSessionFromUrl from "@/utils/createSessionFromUrl";
import useCountdown from "@/utils/useCountdown";
import { useLinkingURL } from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect } from "react";
import { View } from "react-native";

export default function ConfirmEmail() {
  const { email, type } = useLocalSearchParams<{
    email: string;
    type?: string;
  }>();
  const { time, ended, reset } = useCountdown(59);
  const url = useLinkingURL();

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).catch((error) => {
        // Ignore AuthSessionMissingError - it's expected before email confirmation
        if (error?.message?.includes("Auth session missing")) {
          console.log("Waiting for email confirmation...");
        } else {
          console.error("Error creating session:", error);
        }
      });
    }
  }, [url]);

  const handleResend = async (email: string) => {
    if (!ended) return;

    reset();
    await supabase.auth.resend({
      type: "signup",
      email,
    });
  };

  return (
    <PageLayout backButton>
      <View className="flex-1 items-center w-full gap-y-4 justify-center mt-auto mb-16">
        <Button variant="icon" iconLeft={Send} iconSize={96} />
        <Typography className="font-inter-600 text-3xl">
          Check your Email
        </Typography>

        <Typography className="font-nunito-sans text-center mt-8 opacity-90">
          We sent a confirmation letter to a provided email address. Follow the
          link in the letter to continue.
        </Typography>
      </View>

      {type !== "password-reset" && (
        <Button
          variant="secondary"
          title={ended ? "Resend" : `Resend in 00:${time}`}
          onPress={async () => await handleResend(email)}
        />
      )}
    </PageLayout>
  );
}
