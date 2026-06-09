import { getReadingHeatmapQueryOptions } from "@/api/books/get-reading-heatmap.query";
import { useQuery } from "@tanstack/react-query";
import { useColorScheme, useWindowDimensions, View } from "react-native";
import { ContributionGraph } from "react-native-chart-kit";

export const ReadingHeatmapChart = () => {
  const isLightTheme = useColorScheme() === "light";
  const { width } = useWindowDimensions();

  const { data: heatmap } = useQuery(getReadingHeatmapQueryOptions());

  const chartConfig = {
    backgroundGradientFrom: isLightTheme ? "#d9c9be" : "#2f2a25",
    backgroundGradientTo: isLightTheme ? "#d9c9be" : "#2f2a25",
    color: (opacity = 1) =>
      isLightTheme
        ? `rgba(227, 121, 14, ${opacity})`
        : `rgba(247, 159, 69, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  };

  const today = new Date();
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
  const numDays = 105 + dayOfWeek + 1;

  const chartHeight = 16 * 7 + 70;

  return (
    <View style={{ width: width - 68, borderRadius: 24, overflow: "hidden" }}>
      <ContributionGraph
        values={heatmap?.heatmapData || []}
        endDate={today}
        numDays={numDays}
        width={width - 68 + 32}
        height={chartHeight}
        squareSize={16}
        chartConfig={chartConfig}
        style={{ borderRadius: 24, marginLeft: -6 }}
        tooltipDataAttrs={() => ({})}
      />
    </View>
  );
};
