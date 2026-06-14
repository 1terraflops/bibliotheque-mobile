import { getSessionsChartQueryOptions } from "@/api/reading-sessions/get-sessions-chart.query";
import { getSessionsInfiniteQueryOptions } from "@/api/reading-sessions/get-sessions.query";
import { Card, Tabs, TabsOptions, Typography } from "@/components/shared";
import { UserBook } from "@/types/books";
import { cn } from "@/utils/cn";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BookCheck, Calendar, CalendarCheck, Gauge } from "lucide-react-native";
import moment from "moment";
import { Skeleton } from "moti/skeleton";
import { FC, useState } from "react";
import { useColorScheme, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

enum CHART_OPTION_TABS {
  PAGES = "PAGES",
  DURATION = "DURATION",
  SPEED = "SPEED",
}

type StatsViewProps = {
  book: UserBook;
};

export const StatsView: FC<StatsViewProps> = ({ book }) => {
  const [activeTab, setActiveTab] = useState(CHART_OPTION_TABS.PAGES);
  const isLightTheme = useColorScheme() === "light";

  const { data: sessionsChartData } = useQuery(
    getSessionsChartQueryOptions(book.book.id),
  );

  const { data, isLoading } = useInfiniteQuery(
    getSessionsInfiniteQueryOptions({
      isbn: book.book.isbn,
      take: 100,
    }),
  );

  const getActiveTabChartData = () => {
    switch (activeTab) {
      case CHART_OPTION_TABS.PAGES:
        return sessionsChartData?.pages;
      case CHART_OPTION_TABS.DURATION:
        return sessionsChartData?.durations;
      case CHART_OPTION_TABS.SPEED:
        return sessionsChartData?.speeds;
    }
  };

  const getChartColor = (opacity: number) => {
    const activeMetric = getActiveTabChartData();

    if (!activeMetric) return `rgba(255, 76, 26, ${opacity})`;

    return (activeMetric.data.at(-1) ?? 0) < activeMetric.avg
      ? `rgba(255, 45, 26, ${opacity})`
      : `rgba(26, 255, 146, ${opacity})`;
  };

  const sessionsCount = data?.pages.flatMap((page) => page.data).length ?? 0;

  const startedAt = moment(book.startedAt).format("DD MMM");
  const finishedAt = moment(book.finishedAt).format("DD MMM");

  const readIn = moment(book.finishedAt).diff(book.startedAt, "days");
  const daysLabel = readIn === 1 ? "day" : "days";

  const tabs: TabsOptions[] = [
    { label: "Pages", value: CHART_OPTION_TABS.PAGES },
    { label: "Duration", value: CHART_OPTION_TABS.DURATION },
    { label: "Speed", value: CHART_OPTION_TABS.SPEED },
  ];

  const activeData = getActiveTabChartData()?.data ?? [];

  const chartData = {
    labels: [],
    datasets: [
      {
        data: activeData.length > 0 ? activeData : [0],
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity: number) => getChartColor(opacity),
  };

  if (!isLoading && sessionsCount < 2) {
    return (
      <View className="flex-1 justify-center items-center">
        <Typography className="text-lg font-inter-500">
          Finish at least 2 sessions to view stats
        </Typography>
      </View>
    );
  }

  return (
    <View className="flex-1 mt-4 gap-4">
      {!book.finishedAt && (
        <View className="flex flex-row">
          <Card
            title="Started"
            label={startedAt}
            icon={Calendar}
            isLoading={!book.startedAt}
          />
        </View>
      )}

      {book.finishedAt && (
        <View className="flex flex-row">
          <Card
            title={`Read in ${readIn} ${daysLabel}`}
            label={`${startedAt} - ${finishedAt}`}
            icon={CalendarCheck}
            isLoading={!book.startedAt && !book.finishedAt}
          />
        </View>
      )}

      <View className="flex flex-row gap-4">
        <Card
          title="Sessions"
          label={sessionsCount}
          icon={BookCheck}
          isLoading={isLoading}
        />

        <Card
          title="Avg Speed"
          label={book.readingSpeed ?? "N/A"}
          icon={Gauge}
          isLoading={!book.readingSpeed}
        />
      </View>

      <View
        className={cn(
          "gap-4 rounded-xl px-4 pt-3 pb-0",
          isLightTheme ? "bg-light-3" : "bg-dark-3",
        )}
      >
        <Tabs
          size="small"
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={(tab) => setActiveTab(tab as CHART_OPTION_TABS)}
        />

        {activeData.length > 0 ? (
          <LineChart
            bezier
            data={chartData}
            width={330}
            height={135}
            chartConfig={chartConfig}
            formatYLabel={(value) => Math.round(+value).toString()}
            style={{ marginLeft: -40, marginBottom: 0 }}
          />
        ) : (
          <View className="pb-4">
            <Skeleton show width={280} height={135} radius={12} />
          </View>
        )}
      </View>
    </View>
  );
};
