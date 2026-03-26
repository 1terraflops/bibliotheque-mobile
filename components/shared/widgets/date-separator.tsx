import { Typography } from "@/components/shared";
import { cn } from "@/utils/cn";
import moment from "moment";
import { FC } from "react";
import { useColorScheme, View } from "react-native";

type DateSeparatorProps = {
  date: string;
};

export const DateSeparator: FC<DateSeparatorProps> = ({ date }) => {
  const isLightTheme = useColorScheme() === "light";
  const formattedDate = moment(date).format("MMMM DD");

  return (
    <View className="flex flex-row gap-2 items-center mt-4">
      <View className="h-px w-[35%] bg-dark-3" />
      <Typography
        className={cn(
          "text-sm font-inter-600 uppercase tracking-wider",
          isLightTheme ? "text-dark-5" : "text-light-5",
        )}
      >
        {formattedDate}
      </Typography>
      <View className="h-px w-[35%] bg-dark-3" />
    </View>
  );
};
