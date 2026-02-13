import { resendConfirmationEmailMutationOptions } from "@/api/auth/resend-confirmation-email.mutation";
import { sendMagicLinkMutationOptions } from "@/api/auth/send-magic-link.mutation";
import { Button, ScreenLayout, Typography } from "@/components/shared";
import createSessionFromUrl from "@/utils/createSessionFromUrl";
import useCountdown from "@/utils/useCountdown";
import { useMutation } from "@tanstack/react-query";
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

  const { mutate: sendMagicLink } = useMutation(sendMagicLinkMutationOptions());
  const { mutate: resendConfirmationEmail } = useMutation(
    resendConfirmationEmailMutationOptions(),
  );

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).catch((error) => {
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

    if (type === "magic-link") {
      await sendMagicLink({ email });
    }

    if (type === "sign-up") {
      await resendConfirmationEmail({ email });
    }
  };

  return (
    <ScreenLayout backButton>
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
    </ScreenLayout>
  );
}
