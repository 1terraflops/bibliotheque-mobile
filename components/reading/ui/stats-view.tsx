import { Typography } from "@/components/shared";
import { View } from "react-native";

export const StatsView = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Typography className="text-lg font-inter-500">
          Finish at least 2 sessions to view stats
        </Typography>
      </View>
    </View>
  );
};
