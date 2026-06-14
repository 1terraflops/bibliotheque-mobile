import { useSignOutMutation } from "@/api/auth/sign-out.mutation";
import { cn } from "@/utils/cn";
import { FC } from "react";
import { useColorScheme, View } from "react-native";
import { ModalProps } from "react-native-modalfy";
import { Button } from "../button";
import { Typography } from "../typography";

type ConfirmLogOutModalProps = ModalProps;

export const ConfirmLogOutModal: FC<ConfirmLogOutModalProps> = ({ modal }) => {
  const { closeModal } = modal;
  const isLightTheme = useColorScheme() === "light";

  const { mutateAsync: logOut, isPending } = useSignOutMutation();

  return (
    <View
      className={cn(
        "border w-[340px] rounded-[20px] p-6 pt-5",
        isLightTheme ? "bg-light-1 border-light-3" : "bg-dark-1 border-dark-3",
      )}
    >
      <Typography className="text-2xl font-inter-600 tracking-tight mb-2">
        Log Out?
      </Typography>

      <View className="flex-row gap-4 mt-6">
        <Button
          variant="secondary"
          title="Cancel"
          className="flex-1"
          onPress={() => closeModal("ConfirmLogOut")}
        />
        <Button
          destructive
          loading={isPending}
          title="Yes"
          className="flex-1"
          onPress={async () => {
            await logOut();
            closeModal();
          }}
        />
      </View>
    </View>
  );
};
