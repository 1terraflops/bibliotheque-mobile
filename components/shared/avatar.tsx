import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/getInitials";
import * as AvatarPrimitive from "@rn-primitives/avatar";
import { PlusCircle } from "lucide-react-native";
import { FC } from "react";
import { ImageSourcePropType, Text, View } from "react-native";
import { Button } from "./button";

type SizeOptions = "small" | "large";

const AVATAR_SIZES = {
  small: { avatarSize: 56, textSize: "text-xl" },
  large: { avatarSize: 90, textSize: "text-3xl" },
} as const;

interface AvatarProps {
  src: ImageSourcePropType;
  fallback: string;
  alt?: string;
  size?: SizeOptions;
  uploadNew?: boolean;
  onUploadPress?: () => void;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  fallback,
  alt,
  size = "small",
  uploadNew = false,
  onUploadPress,
}) => {
  const { avatarSize, textSize } = AVATAR_SIZES[size];

  return (
    <View className="relative">
      <AvatarPrimitive.Root
        className={cn(
          "rounded-full overflow-hidden",
          !fallback && uploadNew && "border-2 border-dashed",
        )}
        style={{
          width: avatarSize,
          height: avatarSize,
        }}
        alt={alt ?? fallback}
      >
        <AvatarPrimitive.Image className="w-full h-full" source={src} />
        <AvatarPrimitive.Fallback className={"h-full justify-center"}>
          {fallback ? (
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
          ) : (
            <View className="h-full justify-center items-center">
              <Button
                variant="icon"
                iconLeft={PlusCircle}
                iconSize={50}
                onPress={onUploadPress}
              />
            </View>
          )}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {uploadNew && fallback && (
        <View className="absolute bottom-[-2] right-[-2]">
          <Button
            variant="icon"
            iconLeft={PlusCircle}
            iconSize={28}
            onPress={onUploadPress}
          />
        </View>
      )}
    </View>
  );
};
