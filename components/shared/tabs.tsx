import { cn } from "@/utils/cn";
import * as Haptics from "expo-haptics";
import { FC, useEffect, useState } from "react";
import { LayoutRectangle, Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Typography } from "./typography";

export type TabsOptions = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: TabsOptions[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
};

export const Tabs: FC<TabsProps> = ({ tabs, activeTabId, onTabChange }) => {
  const [layouts, setLayouts] = useState<Record<string, LayoutRectangle>>({});
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {
    const layout = layouts[activeTabId];
    if (!layout) return;

    const config = { duration: 150, easing: Easing.inOut(Easing.ease) };

    translateX.value = withTiming(layout.x, config);
    indicatorWidth.value = withTiming(layout.width, config);
  }, [activeTabId, layouts]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <View>
      <View className="flex flex-row gap-4 items-center">
        {tabs.map((tab) => (
          <Pressable
            key={tab.value}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onTabChange(tab.value);
            }}
            android_ripple={null}
            onLayout={(e) => {
              const layout = e.nativeEvent.layout;
              setLayouts((prev) => ({
                ...prev,
                [tab.value]: layout,
              }));
            }}
          >
            <Typography
              className={cn(
                "text-3xl font-inter-700",
                tab.value !== activeTabId && "opacity-50",
              )}
            >
              {tab.label}
            </Typography>
          </Pressable>
        ))}
      </View>

      <Animated.View
        style={indicatorStyle}
        className="h-1 bg-light-1 rounded-[1px] mt-0.5"
      />
    </View>
  );
};
