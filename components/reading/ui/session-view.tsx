import { getSessionsInfiniteQueryOptions } from "@/api/reading-sessions/get-sessions.query";
import { Spinner, Typography } from "@/components/shared";
import { SESSION_STATUS } from "@/types/reading-sessions";
import { cn } from "@/utils/cn";
import { useInfiniteQuery } from "@tanstack/react-query";
import moment from "moment";
import { FC } from "react";
import { FlatList, useColorScheme, View } from "react-native";
import { SessionLog } from "./session-log";

type SessionViewProps = {
  isbn: string;
};

export const SessionView: FC<SessionViewProps> = ({ isbn }) => {
  const isLightTheme = useColorScheme() === "light";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      getSessionsInfiniteQueryOptions({
        isbn,
        take: 10,
      }),
    );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Spinner />
      </View>
    );
  }

  const sessions =
    data?.pages
      .flatMap((page) => page.data)
      .filter((session) => session.status === SESSION_STATUS.ENDED) ?? [];

  const highestPagesRead = Math.max(
    ...sessions.map((s) => s.pagesRead ?? 0),
    1,
  );
  const longestSession = Math.max(...sessions.map((s) => s.duration ?? 0), 1);
  const fastestSpeed = Math.max(...sessions.map((s) => s.readingSpeed ?? 0), 1);

  const fetchMoreSession = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const renderedDates = new Set<string>();

  return (
    <View className="flex-1">
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Typography className="text-lg font-inter-500">
              Your sessions will appear here
            </Typography>
          </View>
        }
        renderItem={({ item }) => {
          const date = moment(item.startedAt).format("MMMM DD");
          const showSeparator = !renderedDates.has(date);
          if (showSeparator) renderedDates.add(date);

          return (
            <View className="gap-2 mt-2">
              {showSeparator && (
                <View className="flex flex-row gap-2 items-center mt-4">
                  <View className="h-px w-[35%] bg-dark-3" />
                  <Typography
                    className={cn(
                      "text-sm font-inter-600 uppercase tracking-wider",
                      isLightTheme ? "text-dark-5" : "text-light-5",
                    )}
                  >
                    {date}
                  </Typography>
                  <View className="h-px w-[35%] bg-dark-3" />
                </View>
              )}

              <SessionLog
                session={item}
                highestPagesRead={highestPagesRead}
                longestSession={longestSession}
                fastestSpeed={fastestSpeed}
              />
            </View>
          );
        }}
        onEndReached={fetchMoreSession}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage && hasNextPage ? (
            <View className="items-center mt-4">
              <Spinner />
            </View>
          ) : null
        }
      />
    </View>
  );
};
