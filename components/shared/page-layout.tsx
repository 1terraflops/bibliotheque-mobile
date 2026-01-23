import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FC, ReactNode } from "react";
import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./button";

interface PageLayoutProps {
  children?: ReactNode;
  backButton?: boolean;
}

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  backButton = false,
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
      {children}
    </SafeAreaView>
  );
};
