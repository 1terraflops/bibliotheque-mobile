import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FC, ReactElement, ReactNode, useState } from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./button";
import { Typography } from "./typography";

interface ScreenLayoutProps {
  children?: ReactNode;
  backButton?: boolean;
  scrollable?: boolean;
  rightButton?: ReactElement;
  title?: string;
}

export const ScreenLayout: FC<ScreenLayoutProps> = ({
  children,
  backButton = false,
  scrollable = false,
  rightButton,
  title,
}) => {
  const router = useRouter();
  const isLightTheme = useColorScheme() === "light";
  const [ready, setReady] = useState(false);

  return (
    <SafeAreaView
      className={cn(
        "w-full flex-1 px-6  bg-dark-1",
        isLightTheme && "bg-light-1",
      )}
    >
      {(backButton || rightButton || title) && (
        <View
          className="flex-row items-center justify-between pt-4"
          onLayout={() => setReady(true)}
          style={{ opacity: ready ? 1 : 0 }}
        >
          <View className="flex-1 flex-row gap-x-2 items-center justify-start">
            {backButton && (
              <Button
                iconSize={32}
                variant="icon"
                iconLeft={ChevronLeft}
                onPress={() => router.back()}
              />
            )}

            <Typography className="text-4xl font-inter-700">{title}</Typography>
          </View>

          <View className="flex-1 items-end">{rightButton}</View>
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
