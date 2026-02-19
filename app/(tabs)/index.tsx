import { Button, ScreenLayout } from "@/components/shared";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";

export default function Index() {
  return (
    <ScreenLayout
      title="Library"
      rightButton={
        <Button
          variant="icon"
          iconLeft={Plus}
          iconSize={28}
          onPress={() => router.push("/add-book")}
        />
      }
    ></ScreenLayout>
  );
}
