import { cn } from "@/utils/cn";
import * as Haptics from "expo-haptics";
import { TabTriggerSlotProps } from "expo-router/ui";
import { forwardRef } from "react";
import { ImageSourcePropType, Pressable, View } from "react-native";
import { Avatar } from "../shared";

interface TabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
  src: ImageSourcePropType;
  fallback: string;
}

export const AvatarTabButton = forwardRef<View, TabButtonProps>(
  ({ src, fallback, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        onPressIn={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <View
          className={cn(
            props.isFocused && "border-2 border-primary rounded-full",
          )}
        >
          <Avatar src={src} fallback={fallback} alt="User profile picture" />
        </View>
      </Pressable>
    );
  },
);

AvatarTabButton.displayName = "AvatarTabButton";
