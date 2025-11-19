import { Avatar } from "@/components";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-teal-500">Home</Text>
      <Avatar
        src={{ uri: "https://github.com/mrzachnugent.png" }}
        fallback="VV"
        alt="user's profile picture"
      />
    </View>
  );
}
