import { Button, ScreenLayout, Typography } from "@/components/shared";
import { BookCard } from "@/components/shared/widgets";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { View } from "react-native";

export const LoadingLibrary = () => {
  return (
    <ScreenLayout
      scrollable
      title="Library"
      rightButton={
        <Button
          variant="icon"
          iconLeft={Plus}
          iconSize={28}
          onPress={() => router.push("/add-book")}
        />
      }
    >
      <View className="gap-4 mt-6">
        <Typography skeleton />

        <View className="flex-row gap-6">
          <BookCard loading />
          <BookCard loading />
        </View>
      </View>

      <View className="gap-4 mt-6">
        <Typography skeleton />

        <View className="flex-row gap-6">
          <BookCard loading />
        </View>
      </View>

      <View className="gap-4 mt-6">
        <Typography skeleton />

        <View className="flex-row gap-6">
          <BookCard loading />
          <BookCard loading />
          <BookCard loading />
        </View>
      </View>
    </ScreenLayout>
  );
};
