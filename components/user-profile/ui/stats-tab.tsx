import { getUserReadingStatsQueryOptions } from "@/api/books/get-user-reading-stats.query";
import { Spinner, Typography } from "@/components/shared";
import { Card } from "@/components/shared/widgets";
import { formatTime } from "@/utils/formatTime";
import { useQuery } from "@tanstack/react-query";
import {
  BookMarked,
  BookOpen,
  Clock,
  Gauge,
  LayoutList,
  LucideIcon,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react-native";
import { FC } from "react";
import { useWindowDimensions, View } from "react-native";
import { ReadingHeatmapChart } from "./reading-heatmap-chart";

const TIME_RANGES: Record<string, string> = {
  morning: "between 6:00 and 12:00",
  afternoon: "between 12:00 and 18:00",
  evening: "between 18:00 and 00:00",
  night: "between 00:00 and 6:00",
};

const TIME_ICONS: Record<string, LucideIcon> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
};

export const StatsTab: FC = () => {
  const { height } = useWindowDimensions();
  const { data: readingStats, isLoading } = useQuery(
    getUserReadingStatsQueryOptions(),
  );

  if (isLoading) {
    return (
      <View
        style={{ minHeight: height * 0.6 }}
        className="justify-center items-center gap-2"
      >
        <Spinner />
      </View>
    );
  }

  if (!readingStats || readingStats.totalSessions < 2) {
    return (
      <View
        style={{ minHeight: height * 0.6 }}
        className="justify-center items-center gap-2"
      >
        <Typography className="text-xl font-inter-600">
          Stats are not available yet
        </Typography>

        <Typography className="text-xl text-center font-inter-400">
          Finish at least 2 reading sessions to see your stats here
        </Typography>
      </View>
    );
  }

  return (
    <View className="flex flex-row flex-wrap justify-between mt-6 mb-24 gap-y-4">
      <ReadingHeatmapChart />

      <Card
        fullWidth
        value={`You usually read at ${readingStats.mostCommonTimeOfTheDay}`}
        title={TIME_RANGES[readingStats.mostCommonTimeOfTheDay ?? "morning"]!}
        icon={TIME_ICONS[readingStats.mostCommonTimeOfTheDay] ?? Sun}
      />

      <Card
        title="Books Finished"
        icon={BookMarked}
        value={readingStats.booksRead}
      />
      <Card
        title="Total Pages Read"
        icon={BookOpen}
        value={readingStats.pagesRead}
      />

      <Card
        title="Total Sessions"
        icon={LayoutList}
        value={readingStats.totalSessions}
      />
      <Card
        title="Reading Speed"
        icon={Gauge}
        value={`${readingStats.avgReadingSpeed} p/hr`}
      />

      <Card
        title="Total Duration"
        icon={Clock}
        value={formatTime(readingStats.totalSessionDuration)}
      />
      <Card
        title="Longest Session"
        icon={Zap}
        value={formatTime(readingStats.longestSession)}
      />

      <Card
        title="Avg Duration"
        icon={Timer}
        value={formatTime(readingStats.avgSessionDuration)}
      />
      <Card
        title="Avg Pages"
        icon={TrendingUp}
        value={readingStats.avgPagesPerSession}
      />
    </View>
  );
};
