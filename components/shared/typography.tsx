import { cn } from "@/utils/cn";
import { FC, ReactNode } from "react";
import { Text, TextProps, useColorScheme } from "react-native";

interface TypographyProps extends TextProps {
  children?: ReactNode;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  const isLightTheme = useColorScheme() === "light";

  return (
    <Text
      {...props}
      className={cn(isLightTheme ? "text-dark-1" : "text-light-1", className)}
    >
      {children}
    </Text>
  );
};
