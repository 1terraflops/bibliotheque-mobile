import { getInitials } from "@/utils/getInitials";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import { FC } from "react";
import { ImageSourcePropType, Text, View } from "react-native";

interface AvatarProps {
  src: ImageSourcePropType;
  fallback: string;
  alt?: string;
  size?: number;
}

export const Avatar: FC<AvatarProps> = ({ src, fallback, alt, size = 80 }) => {
  return (
    <AvatarPrimitive.Root
      className="rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
      }}
      alt={alt ?? ""}
    >
      <AvatarPrimitive.Image className="w-full h-full" source={src} />
      <AvatarPrimitive.Fallback className="h-full justify-center">
        <View className="h-full justify-center items-center bg-coffee">
          <Text className="text-xl font-semibold uppercase tracking-[1.5px] text-bear">
            {getInitials(fallback)}
          </Text>
        </View>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
