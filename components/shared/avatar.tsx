import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/getInitials";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import { FC } from "react";
import { ImageSourcePropType, Text, View } from "react-native";

type SizeOptions = "small" | "large";

const AVATAR_SIZES = {
  small: { avatarSize: 56, textSize: "text-xl" },
  large: { avatarSize: 80, textSize: "text-3xl" },
} as const;

interface AvatarProps {
  src: ImageSourcePropType;
  fallback: string;
  alt?: string;
  size?: SizeOptions;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  fallback,
  alt,
  size = "small",
}) => {
  const { avatarSize, textSize } = AVATAR_SIZES[size];

  return (
    <AvatarPrimitive.Root
      className="rounded-full overflow-hidden"
      style={{
        width: avatarSize,
        height: avatarSize,
      }}
      alt={alt ?? fallback}
    >
      <AvatarPrimitive.Image className="w-full h-full" source={src} />
      <AvatarPrimitive.Fallback className="h-full justify-center">
        <View className="h-full justify-center items-center bg-coffee">
          <Text
            className={cn(
              "font-semibold uppercase tracking-[1.5px] text-bear",
              textSize,
            )}
          >
            {getInitials(fallback)}
          </Text>
        </View>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
