import { Typography } from "@/components/shared";
import { View } from "react-native";

export const SessionView = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Typography className="text-lg font-inter-500">
          Your sessions will appear here
        </Typography>
      </View>
    </View>
  );
};
