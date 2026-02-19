import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FC, ReactNode } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./button";

interface ScreenLayoutProps {
  children?: ReactNode;
  backButton?: boolean;
  scrollable?: boolean;
}

export const ScreenLayout: FC<ScreenLayoutProps> = ({
  children,
  backButton = false,
  scrollable = false,
}) => {
  const router = useRouter();
  const isLightTheme = useColorScheme() === "light";

  return (
    <SafeAreaView
      className={cn(
        "w-full flex-1 px-6  bg-dark-1",
        isLightTheme && "bg-light-1",
      )}
    >
      {backButton && (
        <View className="pt-4">
          <Button
            iconSize={32}
            variant="icon"
            iconLeft={ChevronLeft}
            onPress={() => router.back()}
          />
        </View>
      )}

      {scrollable ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">{children}</View>
        </ScrollView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">{children}</View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};
