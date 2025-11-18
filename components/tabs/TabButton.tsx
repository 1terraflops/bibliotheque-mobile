import { colors } from "@/constants/colors";
import * as Haptics from "expo-haptics";
import { TabTriggerSlotProps } from "expo-router/ui";
import { LucideIcon } from "lucide-react-native";
import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";

interface TabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
  icon: LucideIcon;
}

export const TabButton = forwardRef<View, TabButtonProps>(
  ({ icon: Icon, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        onPressIn={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <View className="items-center gap-0.5">
          <Icon
            size={25}
            stroke={props.isFocused ? colors.primary : colors.grey}
          />
          <Text
            className={`text-xs font-medium ${
              props.isFocused ? "text-primary" : "text-grey"
            }`}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    );
  }
);

TabButton.displayName = "TabButton";
