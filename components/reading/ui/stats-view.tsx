import { getSessionsInfiniteQueryOptions } from "@/api/reading-sessions/get-sessions.query";
import { Card, Typography } from "@/components/shared";
import { UserBook } from "@/types/books";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BookCheck, Calendar, CalendarCheck, Gauge } from "lucide-react-native";
import moment from "moment";
import { FC } from "react";
import { View } from "react-native";

type StatsViewProps = {
  book: UserBook;
};

export const StatsView: FC<StatsViewProps> = ({ book }) => {
  const { data, isLoading } = useInfiniteQuery(
    getSessionsInfiniteQueryOptions({
      isbn: book.book.isbn,
      take: 100,
    }),
  );

  const sessionsCount = data?.pages.flatMap((page) => page.data).length ?? 0;

  const startedAt = moment(book.startedAt).format("DD MMM");
  const finishedAt = moment(book.finishedAt).format("DD MMM");

  const readIn = moment(book.finishedAt).diff(book.startedAt, "days");
  const daysLabel = readIn === 1 ? "day" : "days";

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
    <View className="flex-1 mt-6 gap-4">
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
    </View>
  );
};
