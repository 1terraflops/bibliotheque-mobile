import { Button, Typography } from "@/components/shared";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { useColorScheme, View } from "react-native";

type CardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  fullWidth?: boolean;
  loading?: boolean;
};

export const Card: FC<CardProps> = ({
  title,
  value,
  icon: Icon,
  fullWidth,
  loading = false,
}) => {
  const isLightTheme = useColorScheme() === "light";

  return (
    <View
      className={cn(
        "rounded-3xl p-5 gap-3",
        fullWidth ? "w-full" : "w-[48%]",
        isLightTheme ? "bg-primary/15" : "bg-primary/5",
      )}
    >
      <View
        className={cn(
          "w-10 h-10 rounded-full items-center justify-center",
          isLightTheme ? "bg-primary/40" : "bg-primary/25",
        )}
      >
        <Button variant="icon" iconLeft={Icon} />
      </View>
      <View>
        <Typography
          skeleton={loading}
          className="text-3xl font-inter-700 leading-tight"
        >
          {value ?? "—"}
        </Typography>
        <Typography
          className={cn(
            "text-sm font-inter-500",
            isLightTheme ? "text-gray-500" : "text-gray-400",
          )}
        >
          {title}
        </Typography>
      </View>
    </View>
  );
};
