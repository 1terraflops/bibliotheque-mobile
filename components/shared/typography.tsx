import { cn } from "@/utils/cn";
import { Skeleton } from "moti/skeleton";
import { FC, ReactNode } from "react";
import { Text, TextProps, useColorScheme } from "react-native";

interface TypographyProps extends TextProps {
  children?: ReactNode;
  className?: string;
  skeleton?: boolean;
  skeletonWidth?: number;
}

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  skeleton = false,
  skeletonWidth = 96,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  if (skeleton) {
    return <Skeleton colorMode={colorMode} width={skeletonWidth} height={24} />;
  }

  return (
    <Text
      {...props}
      className={cn(
        colorMode === "light" ? "text-dark-1" : "text-light-1",
        className,
      )}
    >
      {children}
    </Text>
  );
};
