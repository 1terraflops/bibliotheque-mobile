import { cn } from "@/utils/cn";
import { FC } from "react";
import { useColorScheme, View } from "react-native";
import { Typography } from "./typography";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View className="w-full gap-1">
      <Typography className="text-center text-lg font-inter-600">
        {progress}%
      </Typography>

      <View className="relative w-full h-2">
        <View
          className={cn(
            "absolute w-full h-2 rounded-md",
            isLightTheme ? "bg-light-5" : "bg-dark-5",
          )}
        />
        <View
          className={cn(
            "absolute h-2 rounded-md",
            isLightTheme ? "bg-dark-3" : "bg-light-3",
          )}
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
