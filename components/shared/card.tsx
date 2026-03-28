import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
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
  return (
    <View className="flex-1 rounded-xl p-4 gap-2 bg-dark-3">
      <View className="gap-2 flex flex-row items-center">
        {Icon && <Button variant="icon" iconLeft={Icon} iconSize={22} />}
        <Typography className="text-light-2 font-inter-600 text-xl">
          {title}
        </Typography>
      </View>

      <Typography skeleton={isLoading} className="text-3xl mt-1 font-inter-600">
        {label}
      </Typography>
    </View>
  );
};
