import { colors } from "@/constants/colors";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const CIRCLE_RADIUS = 25;
const SPEED = 1200;

type SpinnerProps = {
  size?: number;
  color?: string;
};

export const Spinner = ({ size = 32, color }: SpinnerProps) => {
  const isLightTheme = useColorScheme() === "light";

  const defaultColor = isLightTheme ? colors["dark-1"] : colors["light-1"];
  const strokeColor = color ?? defaultColor;
  const strokeWidth = 6;

  const radius = CIRCLE_RADIUS - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: SPEED,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedSvgStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const dashLength = circumference * 0.75;

  return (
    <AnimatedSvg
      width={size}
      height={size}
      viewBox={`0 0 ${CIRCLE_RADIUS * 2} ${CIRCLE_RADIUS * 2}`}
      style={animatedSvgStyle}
    >
      <AnimatedCircle
        cx={CIRCLE_RADIUS}
        cy={CIRCLE_RADIUS}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${dashLength} ${circumference}`}
      />
    </AnimatedSvg>
  );
};
