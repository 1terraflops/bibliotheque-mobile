import { cn } from "@/utils/cn";
import { Skeleton } from "moti/skeleton";
import { FC, ReactNode } from "react";
import { Text, TextProps, useColorScheme } from "react-native";

interface TypographyProps extends TextProps {
  children?: ReactNode;
  className?: string;
  hideSkeleton?: boolean;
  skeletonWidth?: number;
}

export const Typography: FC<TypographyProps> = ({
  children,
  className,
  hideSkeleton = false,
  skeletonWidth = 96,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  if (hideSkeleton && children == null) {
    return null;
  }

  return (
    <Skeleton
      colorMode={colorMode}
      width={children != null ? undefined : skeletonWidth}
      height={children != null ? undefined : 24}
    >
      {children != null ? (
        <Text
          {...props}
          className={cn(
            colorMode === "light" ? "text-dark-1" : "text-light-1",
            className,
          )}
        >
          {children ?? null}
        </Text>
      ) : null}
    </Skeleton>
  );
};
