import { colors } from "@/constants/colors";
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react-native";
import { FC } from "react";

type IndicatorProps = {
  positive: boolean | null;
  flipped?: boolean;
};

export const Indicator: FC<IndicatorProps> = ({ positive, flipped }) => {
  if (positive === null) {
    return <ArrowDownUp color={colors.grey} size={32} />;
  }

  return positive ? (
    <ArrowUp color={flipped ? colors.error : colors.success} size={32} />
  ) : (
    <ArrowDown color={flipped ? colors.success : colors.error} size={32} />
  );
};
