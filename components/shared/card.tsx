import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { useColorScheme, View } from "react-native";
import { Button } from "./button";
import { Typography } from "./typography";

type CardProps = {
  title: string;
  label: string | number;
  icon?: LucideIcon;
  isLoading?: boolean;
};

export const Card: FC<CardProps> = ({
  title,
  label,
  icon: Icon,
  isLoading,
}) => {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "flex-1 rounded-xl p-4 gap-2",
        isLightTheme ? "bg-light-3" : "bg-dark-3",
      )}
    >
      <View className="gap-2 flex flex-row items-center">
        {Icon && <Button variant="icon" iconLeft={Icon} iconSize={22} />}
        <Typography
          className={cn(
            "font-inter-600 text-xl",
            isLightTheme ? "text-dark-2" : "text-light-2",
          )}
        >
          {title}
        </Typography>
      </View>

      <Typography skeleton={isLoading} className="text-3xl mt-1 font-inter-600">
        {label}
      </Typography>
    </View>
  );
};
