import { FC, Fragment, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, G, Svg } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Ring = {
  progress: number;
  color: string;
  trackColor?: string;
};

type ActivityRingsProps = {
  rings: Ring[];
  size?: number;
  strokeWidth?: number;
  gap?: number;
};

type AnimatedRingProps = {
  cx: number;
  cy: number;
  radius: number;
  strokeWidth: number;
  color: string;
  trackColor: string;
  progress: number;
};

const AnimatedRing: FC<AnimatedRingProps> = ({
  cx,
  cy,
  radius,
  strokeWidth,
  color,
  trackColor,
  progress,
}) => {
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - Math.min(animatedProgress.value, 1)),
  }));

  return (
    <Fragment>
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <AnimatedCircle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        animatedProps={animatedProps}
        strokeLinecap="round"
      />
    </Fragment>
  );
};

export const ActivityRingsChart: FC<ActivityRingsProps> = ({
  rings,
  size = 100,
  strokeWidth = 8,
  gap = 4,
}) => {
  const center = size / 2;

  return (
    <Svg width={size} height={size}>
      <G transform={`rotate(-90, ${center}, ${center})`}>
        {rings.map((ring, index) => {
          const radius = center - strokeWidth / 2 - index * (strokeWidth + gap);

          return (
            <AnimatedRing
              key={index}
              cx={center}
              cy={center}
              radius={radius}
              strokeWidth={strokeWidth}
              color={ring.color}
              trackColor={ring.trackColor ?? "rgba(120,120,120,0.3)"}
              progress={ring.progress}
            />
          );
        })}
      </G>
    </Svg>
  );
};
