import * as AvatarPrimitive from "@rn-primitives/avatar";
import { FC } from "react";
import { ImageSourcePropType, Text } from "react-native";

interface AvatarProps {
  src: ImageSourcePropType;
  fallback: string;
  alt?: string;
  size?: number;
}

export const Avatar: FC<AvatarProps> = ({ src, fallback, alt }) => {
  return (
    <AvatarPrimitive.Root
      className="w-24 h-24 rounded-full overflow-hidden"
      alt={alt ?? ""}
    >
      <AvatarPrimitive.Image className="w-full h-full" source={src} />
      <AvatarPrimitive.Fallback className="justify-center align-center">
        <Text>{fallback}</Text>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
