import { colors } from "@/constants/colors";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react-native";
import { FC, ReactNode } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Spinner } from "./spinner";

type variant = "primary" | "secondary" | "icon" | "icon-filled" | "text";

const ButtonStyles = {
  light: {
    primary: "w-full py-[12px] rounded-[10px] bg-dark-1",
    secondary: "w-full py-[12px] rounded-[10px] border border-dark-1",
    icon: "",
    "icon-filled": "rounded-full p-1.5 bg-dark-1",
    text: "",
  },
  dark: {
    primary: "w-full py-[12px] rounded-[10px] bg-light-1",
    secondary: "w-full py-[12px] rounded-[10px] border border-light-1",
    icon: "",
    "icon-filled": "rounded-full p-1.5 bg-light-1",
    text: "",
  },
};

const TextButtonStyles = {
  light: {
    primary: "font-inter-500 text-[18px] text-light-1",
    secondary: "font-inter-500 text-[18px] text-dark-1",
    icon: "",
    "icon-filled": "",
    text: "font-inter-500 text-lg text-dark-1",
  },
  dark: {
    primary: "font-inter-500 text-[18px] text-dark-1",
    secondary: "font-inter-500 text-[18px] text-light-1",
    icon: "",
    "icon-filled": "",
    text: "font-inter-500 text-lg text-light-1",
  },
};

const IconColors = {
  light: {
    primary: colors["light-1"],
    secondary: colors["dark-1"],
    icon: colors["dark-1"],
    "icon-filled": colors["light-1"],
    text: "",
  },
  dark: {
    primary: colors["dark-1"],
    secondary: colors["light-1"],
    icon: colors["light-1"],
    "icon-filled": colors["dark-1"],
    text: "",
  },
};

const SpinnerColors = {
  light: {
    primary: colors["light-1"],
    secondary: colors["dark-1"],
    icon: colors["dark-1"],
    "icon-filled": colors["light-1"],
    text: colors["dark-1"],
  },
  dark: {
    primary: colors["dark-1"],
    secondary: colors["light-1"],
    icon: colors["light-1"],
    "icon-filled": colors["dark-1"],
    text: colors["light-1"],
  },
};

interface ButtonProps extends PressableProps {
  children?: ReactNode;
  variant?: variant;
  title?: string;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  iconSize?: number;
  loading?: boolean;
  destructive?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  title,
  iconLeft: IconLeft,
  iconRight: IconRight,
  loading = false,
  destructive = false,
  iconSize,
  className,
  disabled,
  ...props
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View className={cn("flex-row", className)}>
      <Pressable
        {...props}
        disabled={loading || disabled}
        className={cn(
          "flex-row justify-center gap-x-2",
          ButtonStyles[theme][variant],
          loading && "opacity-80",
          destructive && "bg-attention",
        )}
      >
        {!loading && variant !== "text" && IconLeft && (
          <IconLeft color={IconColors[theme][variant]} size={iconSize} />
        )}
        {!loading && variant !== "icon" && variant !== "icon-filled" && (
          <Text
            className={cn(
              TextButtonStyles[theme][variant],
              destructive && "text-light-1",
            )}
          >
            {children ?? title}
          </Text>
        )}
        {!loading && variant !== "text" && IconRight && (
          <IconRight color={IconColors[theme][variant]} />
        )}
        {loading && <Spinner size={22} color={SpinnerColors[theme][variant]} />}
      </Pressable>
    </View>
  );
};
