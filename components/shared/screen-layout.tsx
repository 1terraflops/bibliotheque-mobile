import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FC, ReactElement, ReactNode, useState } from "react";
import {
  Keyboard,
  RefreshControl,
  ScrollView,
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
  isRefreshing?: boolean;
  refresh?: () => void;
}

export const ScreenLayout: FC<ScreenLayoutProps> = ({
  children,
  backButton = false,
  scrollable = false,
  rightButton,
  title,
  isRefreshing = false,
  refresh,
}) => {
  const router = useRouter();
  const isLightTheme = useColorScheme() === "light";
  const [ready, setReady] = useState(false);

  const header =
    backButton || rightButton || title ? (
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
    ) : null;

  return (
    <SafeAreaView
      edges={["top"]}
      className={cn(
        "w-full flex-1 px-4 bg-background-dark",
        isLightTheme && "bg-background-light",
      )}
    >
      {scrollable ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            refresh ? (
              <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
            ) : undefined
          }
        >
          {header}

          <View className="flex-1">{children}</View>
        </ScrollView>
      ) : (
        <View
          className="flex-1"
          onStartShouldSetResponder={() => {
            Keyboard.dismiss();
            return false;
          }}
        >
          {header}

          {children}
        </View>
      )}
    </SafeAreaView>
  );
};
